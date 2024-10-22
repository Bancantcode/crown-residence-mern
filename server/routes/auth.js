const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
    const { userName, email, password } = req.body;
    
    if (!userName || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { userName: emailOrUsername }],
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email/username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email/username or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('Authorization', `Bearer ${token}`).json({ token, username: user.userName }); // Include username in response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
