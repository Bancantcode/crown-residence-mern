// server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();

const app = express();

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    },
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passport');

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/authGoogle', require('./routes/authGoogle')); // Use the router here
app.use('/profile', require('./routes/profile'));
app.use('/', require('./routes/propertyRoutes'));
app.use('/', require('./routes/bookingRoutes'));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
