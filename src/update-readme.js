const fs = require('fs');
const path = require('path');

// Path to your README.md
const readmePath = path.join(__dirname, 'README.md');

// Read the current README content
fs.readFile(readmePath, 'utf8', (err, data) => {
  if (err) throw err;

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Replace the placeholder with the current year
  const updatedData = data.replace(/{{CURRENT_YEAR}}/g, currentYear);

  // Write the updated content back to the README
  fs.writeFile(readmePath, updatedData, 'utf8', (err) => {
    if (err) throw err;
    console.log('README.md updated with the current year!');
  });
});
