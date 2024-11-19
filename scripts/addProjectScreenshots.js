import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure S3 Client with AWS SDK v3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload screenshot to S3
async function uploadToS3(buffer, filename) {
  const bucketName = process.env.S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('S3_BUCKET_NAME is not defined in the environment variables.');
  }

  const params = {
    Bucket: bucketName,
    Key: `project-screenshots/${filename}`,
    Body: buffer,
    ContentType: 'image/png',
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/project-screenshots/${filename}`;
}

// Main function to process builders
async function main() {
  const buildersFilePath = path.resolve(__dirname, '../app/_data/builders.json');
  const buildersData = fs.readFileSync(buildersFilePath, 'utf-8');
  const builders = JSON.parse(buildersData);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    for (const builder of builders) {
      const currentProject = builder.currentProject;

      // Skip if no current project link or image already exists
      if (!currentProject?.link) {
        console.log(`Skipping ${builder.name}: No project link found.`);
        continue;
      }

      if (currentProject.image) {
        console.log(`Skipping ${builder.name}: Project image already exists.`);
        continue;
      }

      console.log(`Processing ${builder.name}'s project: ${currentProject.link}`);

      try {
        // Navigate to the project's link and take a screenshot
        await page.goto(currentProject.link, { timeout: 20000 });
        const screenshotBuffer = await page.screenshot();

        // Generate a unique filename based on the builder's name
        const sanitizedBuilderName = builder.name.replace(/\s+/g, '_').toLowerCase();
        const filename = `${sanitizedBuilderName}_project_screenshot.png`;

        // Upload the screenshot to S3
        const imageUrl = await uploadToS3(screenshotBuffer, filename);

        // Update builder's currentProject.image field
        currentProject.image = imageUrl;
        console.log(`Updated image for ${builder.name}: ${imageUrl}`);
      } catch (error) {
        console.error(`Failed to process ${builder.name}'s project:`, error.message);
      }
    }

    // Write the updated builders array back to builders.json
    fs.writeFileSync(buildersFilePath, JSON.stringify(builders, null, 2), 'utf-8');
    console.log('builders.json has been updated with new project image URLs.');
  } catch (error) {
    console.error('Error processing builders:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the main function
main();
