const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const session = require('express-session');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const connectDB = require('./db'); // Import MongoDB connection function
const User = require('./models/User'); // Import User model

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

// Set up file upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onlywellwomen@gmail.com', // Replace with your email
    pass: 'hjcf lamy btpr xauv', // Replace with your email password
  },
});

// Function to send OTP email
const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your Account Confirmation OTP',
    text: `Your OTP for account confirmation is: ${otp}. It is valid for 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Function to generate OTP
const generateOTP = () => {
  return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digits: true });
};

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

app.get('/otp', (req, res) => {
  res.sendFile(path.join(__dirname, 'otp.html'));
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
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already in use.");
    }

    // Generate OTP and store in session
    const otp = generateOTP();
    req.session.otp = otp;
    req.session.email = email;
    req.session.password = password;

    // Send OTP to user's email
    sendOTPEmail(email, otp);

    res.status(200).send("OTP sent to your email. Please enter it to confirm your account.");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("An error occurred. Please try again.");
  }
});

// OTP Verification Route
app.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;

  if (req.session.otp !== otp) {
    return res.status(400).send("Invalid OTP. Please try again.");
  }

  try {
    // OTP matches, hash the password and save the user
    const hashedPassword = await bcrypt.hash(req.session.password, 10);

    const user = new User({
      firstName: req.session.firstName,
      email: req.session.email,
      password: hashedPassword,
    });

    await user.save();

    // Clear session data
    req.session.destroy();

    res.status(200).send("Account confirmed and created successfully.");
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).send("An error occurred. Please try again.");
  }
});

// API Routes
app.get('/api/birth', (req, res) => res.json({ message: "Fetch Birth Articles API" }));
app.get('/api/health', (req, res) => res.json({ message: "Fetch Health Articles API" }));
app.get('/api/pregnancy', (req, res) => res.json({ message: "Fetch Pregnancy Articles API" }));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});