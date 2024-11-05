/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
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
  const imageUrl = `https://unavatar.io/twitter/${twitterUsername}`;
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

// Function to upload image to S3
async function uploadToS3(buffer, filename) {
  const bucketName = process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("S3_BUCKET_NAME is not defined in the environment variables.");
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

// Main function to fetch and upload image
async function main(twitterUsername) {
  try {
    console.log(`Fetching profile image for Twitter user: ${twitterUsername}`);
    const imageBuffer = await fetchTwitterProfileImage(twitterUsername);

    const filename = `${twitterUsername}.jpg`;
    console.log(`Uploading ${filename} to S3...`);
    const imageUrl = await uploadToS3(imageBuffer, filename);

    console.log(`Image uploaded successfully: ${imageUrl}`);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching or uploading image:', error);
  }
}

// Run the main function
const twitterUsername = process.argv[2];
if (!twitterUsername) {
  console.error('Please provide a Twitter username.');
  process.exit(1);
}
main(twitterUsername);
