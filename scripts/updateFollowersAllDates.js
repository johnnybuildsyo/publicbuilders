import 'dotenv/config'; // Load environment variables from .env.local
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_ENTRIES = 90;

// Helper function to get all JSON files in a directory, sorted by date
function getSortedFilesByDate(dir, ext) {
  const files = fs.readdirSync(dir).filter(file => file.endsWith(ext));
  return files
    .map(file => ({
      file,
      date: file.match(/(\d{4}-\d{2}-\d{2})/)?.[1], // Extract date from filename
    }))
    .filter(item => item.date) // Keep only files with valid dates
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort ascending by date
    .map(item => item.file);
}

// Main function to process builders
async function main() {
  try {
    // Paths for builders.json and the followers directory
    const buildersFilePath = path.resolve(__dirname, '../app/_data/builders.json');
    const followersDirPath = path.resolve(__dirname, '../secretsauce/data/followers/');

    // Get all sorted JSON files in the followers directory
    const followerFiles = getSortedFilesByDate(followersDirPath, '.json');
    if (followerFiles.length === 0) {
      console.error('No valid followers files found.');
      return;
    }

    console.log(`Processing follower files: ${followerFiles.join(', ')}`);

    // Load data from builders.json
    const buildersData = fs.readFileSync(buildersFilePath, 'utf-8');
    const builders = JSON.parse(buildersData);

    // Process each followers file in chronological order
    for (const followerFile of followerFiles) {
      const followersFilePath = path.resolve(followersDirPath, followerFile);

      // Extract the date from the filename
      const dateMatch = followerFile.match(/(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) {
        console.error(`Invalid followers file name format for ${followerFile}. Date not found.`);
        continue;
      }
      const date = dateMatch[1];

      // Load data from the current followers file
      const followersData = JSON.parse(fs.readFileSync(followersFilePath, 'utf-8'));

      // Update the builders with the data from this file
      builders.forEach(builder => {
        const slug = slugify(builder.name, { lower: true, strict: true });

        const followerInfo = followersData[slug];
        if (followerInfo) {
          // Update Twitter data
          if (followerInfo.twitterFollowers !== null && builder.twitter) {
            builder.twitter.followerGrowth = builder.twitter.followerGrowth || [];

            const existingEntryIndex = builder.twitter.followerGrowth.findIndex(entry => entry.date === date);
            if (existingEntryIndex !== -1) {
              builder.twitter.followerGrowth[existingEntryIndex].count = followerInfo.twitterFollowers;
            } else {
              builder.twitter.followerGrowth.push({ date, count: followerInfo.twitterFollowers });
            }

            builder.twitter.followerGrowth.sort((a, b) => new Date(a.date) - new Date(b.date));
            if (builder.twitter.followerGrowth.length > MAX_ENTRIES) {
              builder.twitter.followerGrowth = builder.twitter.followerGrowth.slice(-MAX_ENTRIES);
            }

            const latestEntry = builder.twitter.followerGrowth[builder.twitter.followerGrowth.length - 1];
            builder.twitter.followers = latestEntry.count;
          }

          // Update Bluesky data
          if (builder.bluesky && followerInfo.blueskyFollowers !== null) {
            builder.bluesky.followerGrowth = builder.bluesky.followerGrowth || [];

            const existingEntryIndex = builder.bluesky.followerGrowth.findIndex(entry => entry.date === date);
            if (existingEntryIndex !== -1) {
              builder.bluesky.followerGrowth[existingEntryIndex].count = followerInfo.blueskyFollowers;
            } else {
              builder.bluesky.followerGrowth.push({ date, count: followerInfo.blueskyFollowers });
            }

            builder.bluesky.followerGrowth.sort((a, b) => new Date(a.date) - new Date(b.date));
            if (builder.bluesky.followerGrowth.length > MAX_ENTRIES) {
              builder.bluesky.followerGrowth = builder.bluesky.followerGrowth.slice(-MAX_ENTRIES);
            }

            const latestEntry = builder.bluesky.followerGrowth[builder.bluesky.followerGrowth.length - 1];
            builder.bluesky.followers = latestEntry.count;
          }
        }
      });
    }

    // Write the updated builders array back to builders.json
    fs.writeFileSync(buildersFilePath, JSON.stringify(builders, null, 2), 'utf-8');
    console.log('builders.json has been updated with all follower data.');
  } catch (error) {
    console.error('Error processing builders:', error);
  }
}

// Run the main function
main();
