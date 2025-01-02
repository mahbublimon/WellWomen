const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Set up file upload storage
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

// API Routes for Articles
app.get('/api/birth', (req, res) => {
    res.json({ message: "Fetch Birth Articles API" });
});

app.get('/api/health', (req, res) => {
    res.json({ message: "Fetch Health Articles API" });
});

app.get('/api/pregnancy', (req, res) => {
    res.json({ message: "Fetch Pregnancy Articles API" });
});

// Signup Route
app.post('/signup', upload.single('nidPassport'), async (req, res) => {
    const { firstName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email is already in use.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to the database
        const user = new User({
            firstName,
            email,
            password: hashedPassword,
            nidPassport: req.file ? req.file.path : null,
        });
        await user.save();

        res.status(200).send("Account created successfully.");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("An error occurred. Please try again.");
    }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});