const express = require('express');
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS) from the root directory
app.use(express.static(path.join(__dirname)));

// Define routes to serve specific HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html')); // Serve home.html
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html')); // Serve about.html
});

// Add more routes as needed for other HTML files
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});