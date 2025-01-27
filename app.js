const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const session = require('express-session');
const nodemailer = require('nodemailer');
const connectDB = require('./db'); // MongoDB connection function
const User = require('./models/User'); // User model

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
    saveUninitialized: true
  })
);

// Set up file upload storage (for user signup)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Nodemailer Transporter Setup (for welcome email)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onlywellwomen@gmail.com', // Replace with your email
    pass: 'hjcf lamy btpr xauv' // Replace with your email password
  }
});

// Function to send a welcome email
const sendWelcomeEmail = (email, fullName) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Welcome to WellWomen!',
    text: `Hello ${fullName},\n\nThank you for signing up at WellWomen. Your account has been successfully created!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
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
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'dashboard.html')); // Only allow if logged in
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
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

// Signup Route
app.post('/signup', upload.single('nidPassport'), async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already in use.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      nidPassport: req.file ? req.file.filename : null, // Save uploaded file if exists
      terms: req.body.terms === 'on',
      privacy: req.body.privacy === 'on',
      dataProcessing: req.body.dataProcessing === 'on'
    });

    // Save the user to the database
    await user.save();

    // Send welcome email
    sendWelcomeEmail(email, fullName);

    // Return success message
    res.status(200).json({ message: "Registration successful. You can now login." });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("An error occurred. Please try again.");
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please create an account." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password. Please try again." });
    }

    // If everything is correct, save user session and send success message
    req.session.user = user; // Store user in session
    res.status(200).json({ message: "Login successful!" });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
});

// Logout Route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred while logging out." });
    }
    res.status(200).json({ message: "Logout successful!" });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});