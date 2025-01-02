// server.ts
import express from 'express';
import path from 'path';

const app = express();

// Serve static files (index.html, app.js, styles.css, etc.)
app.use(express.static(path.join(__dirname, 'dist')));

// Set up a route for the index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(8080, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:8080');
});
