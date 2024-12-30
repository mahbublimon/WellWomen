const express = require('express');
const path = require('path');
const app = express();

// Serve static files like CSS, JS, and images
app.use(express.static(path.join(__dirname)));

// Route for home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Define routes for other pages
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/advice', (req, res) => {
    res.sendFile(path.join(__dirname, 'advice.html'));
});

app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname, 'articles.html'));
});

app.get('/calculators', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculators.html'));
});

app.get('/careers', (req, res) => {
    res.sendFile(path.join(__dirname, 'careers.html'));
});

app.get('/community', (req, res) => {
    res.sendFile(path.join(__dirname, 'community.html'));
});

app.get('/consultation', (req, res) => {
    res.sendFile(path.join(__dirname, 'consultation.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/due-date-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'due-date-calculator.html'));
});

app.get('/faq', (req, res) => {
    res.sendFile(path.join(__dirname, 'faq.html'));
});

app.get('/fitness', (req, res) => {
    res.sendFile(path.join(__dirname, 'fitness.html'));
});

app.get('/footer', (req, res) => {
    res.sendFile(path.join(__dirname, 'footer.html'));
});

app.get('/guides', (req, res) => {
    res.sendFile(path.join(__dirname, 'guides.html'));
});

app.get('/hcg-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'hcg-calculator.html'));
});

app.get('/implantation-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'implantation-calculator.html'));
});

app.get('/ivf-due-date-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'ivf-due-date-calculator.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/navbar', (req, res) => {
    res.sendFile(path.join(__dirname, 'navbar.html'));
});

app.get('/nutrition', (req, res) => {
    res.sendFile(path.join(__dirname, 'nutrition.html'));
});

app.get('/ovulation-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'ovulation-calculator.html'));
});

app.get('/period-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'period-calculator.html'));
});

app.get('/pregnancy-test-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'pregnancy-test-calculator.html'));
});

app.get('/review', (req, res) => {
    res.sendFile(path.join(__dirname, 'review.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/subscription', (req, res) => {
    res.sendFile(path.join(__dirname, 'subscription.html'));
});

app.get('/termscondition', (req, res) => {
    res.sendFile(path.join(__dirname, 'termscondition.html'));
});

app.get('/ultrasound-due-date-calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'ultrasound-due-date-calculator.html'));
});

app.get('/videos', (req, res) => {
    res.sendFile(path.join(__dirname, 'videos.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});