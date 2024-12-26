const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (e.g., CSS, images, JS) from the root directory
app.use(express.static(__dirname));

// Routes for pages
app.get('/', (req, res) => {
    res.render('home'); // Render `home.ejs`
});

app.get('/about', (req, res) => {
    res.render('about'); // Render `about.ejs`
});

app.get('/services', (req, res) => {
    res.render('services'); // Render `services.ejs`
});

// Add routes for other pages (e.g., contact, faq, review)
app.get('/faq', (req, res) => {
    res.render('faq'); // Render `faq.ejs`
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});