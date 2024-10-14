// server.js
const session = require('express-session');
const express = require('express');
const passport = require('passport');
const connectToDatabase = require('./config/database.js');
const authRoutes = require('./routes/authRoutes');
const { serializeUser, deserializeUser } = require('./controllers/authController'); // Import the functions

require('dotenv').config();
require('./strategies/googleStrategy'); // Google OAuth strategy

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport configuration
passport.serializeUser(serializeUser); // Use the serializeUser from the controller
passport.deserializeUser(deserializeUser); // Use the deserializeUser from the controller

// Set up session
app.use(session({
    secret: 'kPKSnpJhBl', // strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

  // Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use('/', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
