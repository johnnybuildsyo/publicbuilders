/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const axios = require('axios');

// Configure S3 Client with AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to fetch profile image from Twitter
async function fetchTwitterProfileImage(twitterUsername) {
  try {
    const imageUrl = `https://unavatar.io/twitter/${twitterUsername}`;
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error(`Failed to fetch image for ${twitterUsername}:`, error.message);
    return null;
  }
}

// Function to upload image to S3
async function uploadToS3(buffer, filename) {
  const bucketName = process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('S3_BUCKET_NAME is not defined in the environment variables.');
  }

  const params = {
    Bucket: bucketName,
    Key: `profile-pics/${filename}`,
    Body: buffer,
    ContentType: 'image/jpeg',
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/profile-pics/${filename}`;
}

// Main function to process builders
async function main() {
  try {
    // Adjusted path to builders.json
    const buildersFilePath = path.resolve(__dirname, '../app/_data/builders.json');
    const buildersData = fs.readFileSync(buildersFilePath, 'utf-8');
    const builders = JSON.parse(buildersData);

    // Process each builder
    for (const builder of builders) {
      // Check if the image field is missing or empty
      if (!builder.image || builder.image.trim() === '') {
        // Extract Twitter username
        if (!builder.twitter) {
          console.warn(`No Twitter URL for ${builder.name}, skipping.`);
          continue;
        }
        const twitterUsername = builder.twitter.split('https://twitter.com/')[1];
        if (!twitterUsername) {
          console.warn(`Invalid Twitter URL for ${builder.name}, skipping.`);
          continue;
        }

        console.log(`Processing ${builder.name} (${twitterUsername})`);

        // Fetch Twitter profile image
        const imageBuffer = await fetchTwitterProfileImage(twitterUsername);
        if (!imageBuffer) {
          console.warn(`Could not fetch image for ${builder.name}, skipping.`);
          continue;
        }

        // Upload image to S3
        const filename = `${twitterUsername}.jpg`;
        const imageUrl = await uploadToS3(imageBuffer, filename);

        // Update builder's image field
        builder.image = imageUrl;
        console.log(`Updated image for ${builder.name}: ${imageUrl}`);
      }
    }

    // Write the updated builders array back to builders.json
    fs.writeFileSync(buildersFilePath, JSON.stringify(builders, null, 2), 'utf-8');
    console.log('builders.json has been updated with new image URLs.');
  } catch (error) {
    console.error('Error processing builders:', error);
  }
}

// Run the main function
main();
