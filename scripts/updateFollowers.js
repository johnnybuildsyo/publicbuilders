import 'dotenv/config'; // Load environment variables from .env.local
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get the most recent file in a directory based on date in filename
function getMostRecentFileByDate(dir, ext) {
  const files = fs.readdirSync(dir).filter(file => file.endsWith(ext));
  if (files.length === 0) {
    return null;
  }

  // Extract the date from the filenames and sort by the most recent date
  const sortedFiles = files
    .map(file => ({
      file,
      date: file.match(/(\d{4}-\d{2}-\d{2})/)?.[1], // Extract date from filename
    }))
    .filter(item => item.date) // Keep only files with valid dates
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort descending by date

  return sortedFiles.length > 0 ? sortedFiles[0].file : null;
}

const MAX_ENTRIES = 30;

// Main function to process builders
async function main() {
  try {
    // Paths for builders.json and the followers directory
    const buildersFilePath = path.resolve(__dirname, '../app/_data/builders.json');
    const followersDirPath = path.resolve(__dirname, '../secretsauce/data/followers/');

    // Get the most recent JSON file by date
    const recentFollowersFile = getMostRecentFileByDate(followersDirPath, '.json');
    if (!recentFollowersFile) {
      console.error('No valid followers file found.');
      return;
    }

    const followersFilePath = path.resolve(followersDirPath, recentFollowersFile);
    console.log(`Using followers file: ${followersFilePath}`);

    // Extract the date from the filename (e.g., "2024-11-21.json" => "2024-11-21")
    const dateMatch = recentFollowersFile.match(/(\d{4}-\d{2}-\d{2})/);
    if (!dateMatch) {
      console.error('Invalid followers file name format. Date not found.');
      return;
    }
    const date = dateMatch[1];

    // Load data from builders.json
    const buildersData = fs.readFileSync(buildersFilePath, 'utf-8');
    const builders = JSON.parse(buildersData);

    // Load data from the most recent followers file
    const followersData = JSON.parse(fs.readFileSync(followersFilePath, 'utf-8'));

    // Update the builders with the latest followers data
    builders.forEach(builder => {
      // Use slugify to generate the slug
      const slug = slugify(builder.name, { lower: true, strict: true });
      console.log(`Processing builder: ${builder.name}, slug: ${slug}`);
      const followerInfo = followersData[slug];

      if (followerInfo) {
        // Update Twitter data
        if (followerInfo.twitterFollowers !== null && builder.twitter) {
          // Ensure followerGrowth exists
          builder.twitter.followerGrowth = builder.twitter.followerGrowth || [];

          // Find if an entry with the same date exists
          const existingEntryIndex = builder.twitter.followerGrowth.findIndex(entry => entry.date === date);

          if (existingEntryIndex !== -1) {
            // Update the existing entry
            builder.twitter.followerGrowth[existingEntryIndex].count = followerInfo.twitterFollowers;
            console.log(`Updated Twitter follower growth entry for ${builder.name} on ${date}`);
          } else {
            // Add a new entry
            builder.twitter.followerGrowth.push({
              date,
              count: followerInfo.twitterFollowers,
            });
            console.log(`Added new Twitter follower growth entry for ${builder.name} on ${date}`);
          }

          // Sort the followerGrowth array by date
          builder.twitter.followerGrowth.sort((a, b) => new Date(a.date) - new Date(b.date));

          // Limit the array size to the last 30 entries
          if (builder.twitter.followerGrowth.length > MAX_ENTRIES) {
            builder.twitter.followerGrowth = builder.twitter.followerGrowth.slice(-MAX_ENTRIES);
          }

          // Update the followers count to the most recent count
          const latestEntry = builder.twitter.followerGrowth[builder.twitter.followerGrowth.length - 1];
          builder.twitter.followers = latestEntry.count;

          console.log(`Set Twitter followers for ${builder.name} to ${builder.twitter.followers}`);
        }

        // Update Bluesky data
        if (builder.bluesky && followerInfo.blueskyFollowers !== null) {
          // Ensure followerGrowth exists
          builder.bluesky.followerGrowth = builder.bluesky.followerGrowth || [];

          // Find if an entry with the same date exists
          const existingEntryIndex = builder.bluesky.followerGrowth.findIndex(entry => entry.date === date);

          if (existingEntryIndex !== -1) {
            // Update the existing entry
            builder.bluesky.followerGrowth[existingEntryIndex].count = followerInfo.blueskyFollowers;
            console.log(`Updated Bluesky follower growth entry for ${builder.name} on ${date}`);
          } else {
            // Add a new entry
            builder.bluesky.followerGrowth.push({
              date,
              count: followerInfo.blueskyFollowers,
            });
            console.log(`Added new Bluesky follower growth entry for ${builder.name} on ${date}`);
          }

          // Sort the followerGrowth array by date
          builder.bluesky.followerGrowth.sort((a, b) => new Date(a.date) - new Date(b.date));

          // Limit the array size to the last 7 entries
          if (builder.bluesky.followerGrowth.length > MAX_ENTRIES) {
            builder.bluesky.followerGrowth = builder.bluesky.followerGrowth.slice(-MAX_ENTRIES);
          }

          // Update the followers count to the most recent count
          const latestEntry = builder.bluesky.followerGrowth[builder.bluesky.followerGrowth.length - 1];
          builder.bluesky.followers = latestEntry.count;

          console.log(`Set Bluesky followers for ${builder.name} to ${builder.bluesky.followers}`);
        }
      } else {
        console.warn(`No follower data found for builder: ${builder.name}, slug: ${slug}`);
      }
    });

    // Write the updated builders array back to builders.json
    fs.writeFileSync(buildersFilePath, JSON.stringify(builders, null, 2), 'utf-8');
    console.log('builders.json has been updated with the latest followers and follower growth.');
  } catch (error) {
    console.error('Error processing builders:', error);
  }
}

// Run the main function
main();
