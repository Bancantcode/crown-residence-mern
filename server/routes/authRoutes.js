const express = require('express');
const passport = require('passport'); // Import passport here
const router = express.Router();
const { 
  registerTraditionalUser, 
  loginTraditionalUser, 
  loginGoogleUser 
} = require('../controllers/authController');

// Route for traditional user registration
router.post('/register', registerTraditionalUser);

// Route for traditional user login
router.post('/login', loginTraditionalUser);

// Google authentication route (Step 1: Redirect to Google)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route (Step 2: Google redirects here after login)
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    try {
      // User authenticated via Google, handle further login logic
      const googleUser = await loginGoogleUser(req.user);
      // Redirect after successful login (adjust according to your needs)
      res.redirect('/dashboard'); // Redirect user to dashboard or desired page
    } catch (error) {
      console.error('Error logging in Google user:', error);
      res.redirect('/'); // On error, redirect to the home page or error page
    }
  }
);

// Export the router
module.exports = router;
