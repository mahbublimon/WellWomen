const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const db = require('./db'); // Assume db is correctly configured

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files like CSS, JS, and images
app.use(express.static(path.join(__dirname)));

// Set up file upload storage using Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// General Routes for Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

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
    res.sendFile(`${__dirname}/dashboard.html`);
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

// Dashboard and User Profile Routes
app.get('/user-profile', (req, res) => {
    res.json(userData); // Send user data to frontend
});

// Signup Route
app.post('/signup', upload.single('nidPassport'), async (req, res) => {
    const { firstName, email, password, confirmPassword, terms, privacy, dataProcessing } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    // Check if the email is already in use
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).send("Email is already in use.");
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle file upload (NID/Passport)
        const filePath = req.file ? req.file.path : null;

        // Save user data to database
        const [result] = await db.query('INSERT INTO users (first_name, email, password, nid_passport) VALUES (?, ?, ?, ?)', 
            [firstName, email, hashedPassword, filePath]);

        res.status(200).send("Account created successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// Subscription Handling (Example)
app.post('/subscription', (req, res) => {
    const { subscriptionType, paymentMethod } = req.body;
    userData.subscription = {
        type: subscriptionType,
        paymentMethod,
        validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 10),
    };

    fs.writeFileSync('./user.json', JSON.stringify(userData, null, 4));
    res.json({ message: 'Subscription updated successfully' });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});