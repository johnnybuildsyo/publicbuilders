import 'dotenv/config'; // Load environment variables from .env.local
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main function to process builders
async function main() {
  try {
    // Adjusted path to builders.json
    const buildersFilePath = path.resolve(__dirname, '../app/_data/builders.json');
    const buildersData = fs.readFileSync(buildersFilePath, 'utf-8');
    const builders = JSON.parse(buildersData);

    // Process each builder
    for (const builder of builders) {
      // Check if the created field is missing
      if (!builder.created) {
        // Add a created timestamp if missing
        builder.created = new Date().toISOString();
        console.log(`Added created timestamp for ${builder.name}: ${builder.created}`);
      }
    }

    // Write the updated builders array back to builders.json
    fs.writeFileSync(buildersFilePath, JSON.stringify(builders, null, 2), 'utf-8');
    console.log('builders.json has been updated with created timestamps.');
  } catch (error) {
    console.error('Error processing builders:', error);
  }
}

// Run the main function
main();
