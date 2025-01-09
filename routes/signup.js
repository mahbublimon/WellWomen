const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Import User model

const router = express.Router();

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'onlywellwomen@gmail.com',
        pass: 'hjcf lamy btpr xauv'
    }
});

// Handle Signup Route
router.post('/signup', async (req, res) => {
    const { fullName, email, password, nidPassport, terms, privacy, dataProcessing } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            nidPassport,
            terms,
            privacy,
            dataProcessing
        });

        // Save to database
        await newUser.save();

        // Send welcome email
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Welcome to WellWomen!',
            text: `Hello ${fullName},\n\nThank you for signing up at WellWomen. Your account has been successfully created!`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Respond with success
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;