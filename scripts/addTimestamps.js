/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

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
