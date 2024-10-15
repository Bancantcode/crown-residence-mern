const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify token
const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'];

    if (token) {
        // Extract token if it's in the format "Bearer <token>"
        token = token.split(' ')[1];
    } else {
        token = req.query.token;
    }

    if (!token) {
        return res.status(403).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Profile route
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'Welcome to the profile page', user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});

module.exports = router;
