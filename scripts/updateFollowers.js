import 'dotenv/config'; // Load environment variables from .env.local
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get the most recent file in a directory
function getMostRecentFile(dir, ext) {
  const files = fs.readdirSync(dir)
    .filter(file => file.endsWith(ext))
    .map(file => ({
      file,
      time: fs.statSync(path.join(dir, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  return files.length > 0 ? path.join(dir, files[0].file) : null;
}

// Main function to process builders
async function main() {
  try {
    // Paths for builders.json and the followers directory
    const buildersFilePath = path.resolve(__dirname, '../app/_data/builders.json');
    const followersDirPath = path.resolve(__dirname, '../secretsauce/data/followers/');
    
    // Get the most recent followers file
    const recentFollowersFile = getMostRecentFile(followersDirPath, '.json');
    if (!recentFollowersFile) {
      console.error('No followers file found.');
      return;
    }

    console.log(`Using followers file: ${recentFollowersFile}`);

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
    const followersData = JSON.parse(fs.readFileSync(recentFollowersFile, 'utf-8'));

    // Update the builders with the latest followers data
    builders.forEach(builder => {
      const slug = builder.name.toLowerCase().replace(/\s+/g, '-');
      const followerInfo = followersData[slug];

      if (followerInfo) {
        if (followerInfo.twitterFollowers !== null) {
          builder.twitter.followers = followerInfo.twitterFollowers;

          // Ensure followerGrowth exists and update it
          builder.twitter.followerGrowth = builder.twitter.followerGrowth || [];
          const alreadyLogged = builder.twitter.followerGrowth.some(entry => entry.date === date);

          if (!alreadyLogged) {
            builder.twitter.followerGrowth.push({
              date,
              count: followerInfo.twitterFollowers,
            });
          }

          if (builder.twitter.followerGrowth.length > 11) {
            builder.twitter.followerGrowth = builder.twitter.followerGrowth.slice(-7);
          }

          console.log(`Updated Twitter followers for ${builder.name}: ${followerInfo.twitterFollowers}`);
        }

        if (builder.bluesky && followerInfo.blueskyFollowers !== null) {
          builder.bluesky.followers = followerInfo.blueskyFollowers;

          // Ensure followerGrowth exists and update it
          builder.bluesky.followerGrowth = builder.bluesky.followerGrowth || [];
          const alreadyLogged = builder.bluesky.followerGrowth.some(entry => entry.date === date);

          if (!alreadyLogged) {
            builder.bluesky.followerGrowth.push({
              date,
              count: followerInfo.blueskyFollowers,
            });
          }

          if (builder.bluesky.followerGrowth.length > 11) {
            builder.bluesky.followerGrowth = builder.bluesky.followerGrowth.slice(-7);
          }

          console.log(`Updated Bluesky followers for ${builder.name}: ${followerInfo.blueskyFollowers}`);
        }
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
