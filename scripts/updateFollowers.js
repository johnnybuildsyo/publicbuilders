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
          console.log(`Updated Twitter followers for ${builder.name}: ${followerInfo.twitterFollowers}`);
        }

        if (builder.bluesky && followerInfo.blueskyFollowers !== null) {
          builder.bluesky.followers = followerInfo.blueskyFollowers;
          console.log(`Updated Bluesky followers for ${builder.name}: ${followerInfo.blueskyFollowers}`);
        }
      }
    });

    // Write the updated builders array back to builders.json
    fs.writeFileSync(buildersFilePath, JSON.stringify(builders, null, 2), 'utf-8');
    console.log('builders.json has been updated with the latest followers.');
  } catch (error) {
    console.error('Error processing builders:', error);
  }
}

// Run the main function
main();
