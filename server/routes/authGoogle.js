const express = require('express');
const passport = require('passport');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Initialize the Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route to initiate Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google authentication callback
router.post('/google/callback', async (req, res) => {
    const token = req.body.token; // Extract the token from the request body

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    try {
        // Verify the token and get user data
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: payload.sub });

        // If the user doesn't exist, create a new user
        if (!user) {
            user = new User({
                googleId: payload.sub,
                email: payload.email,
                userName: payload.given_name, // Use the given name as the username
                picture: payload.picture, // Optional: Store user's profile picture
            });
            await user.save(); // Save the new user to the database
        }

        // Generate a JWT token to return to the client
        const jwtToken = jwt.sign({ id: user._id, email: user.email, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Include userID in the response
        return res.json({ success: true, token: jwtToken, username: user.userName, userID: user._id }); // Return the JWT token, username, and userID
    } catch (error) {
        console.error('Error during token verification:', error);
        return res.status(400).json({ success: false, message: 'Invalid token' });
    }
});

module.exports = router;
