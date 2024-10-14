const bcrypt = require('bcrypt');
const TraditionalUser = require('../models/traditionalUser');
const GoogleUser = require('../models/googleUser');
const { validateRegistrationData } = require('../utils/validator');
const passport = require('passport');

/**
 * Registers a traditional user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const registerTraditionalUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  const { error } = validateRegistrationData(username, email, password);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if user already exists
  try {
    const existingUser = await TraditionalUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new TraditionalUser({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering traditional user:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

/**
 * Logs in a traditional user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const loginTraditionalUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  try {
    const existingUser = await TraditionalUser.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Successful login
    req.login(existingUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in user' });
      }
      return res.status(200).json({ message: 'Login successful', user: existingUser });
    });
  } catch (error) {
    console.error('Error logging in traditional user:', error);
    return res.status(500).json({ message: 'Error logging in user' });
  }
};

/**
 * Registers a Google user.
 * @param {Object} profile - The Google user profile.
 * @returns {Object} - The registered or existing Google user.
 */
const registerGoogleUser = async (profile) => {
  const { id: googleId, _json } = profile;

  // Check for email directly from _json
  const email = _json.email;

  if (!email) {
    throw new Error('No email found in Google profile');
  }

  let googleUser = await GoogleUser.findOne({ googleId });
  if (!googleUser) {
    googleUser = new GoogleUser({
      googleId,
      email: email
    });
    await googleUser.save();
  }
  return googleUser;
};

/**
 * Logs in a Google user.
 * @param {Object} profile - The Google user profile.
 * @returns {Object} - The logged-in Google user.
 */
const loginGoogleUser = async (profile) => {
  try {
    // Check if the user already exists
    let googleUser = await GoogleUser.findOne({ googleId: profile.id });
    if (!googleUser) {
      // If user does not exist, register them
      googleUser = await registerGoogleUser(profile);
    }
    return googleUser;
  } catch (error) {
    console.error('Error logging in Google user:', error);
    throw new Error('Error logging in Google user');
  }
};

/**
 * Serialize user into session.
 * @param {Object} user - The user object.
 * @param {Function} done - The callback function.
 */
const serializeUser = (user, done) => {
  console.log('Serializing user:', user);
  // Serialize based on user type (traditional or Google)
  done(null, user._id); // Use user._id to serialize
};

/**
 * Deserialize user from session.
 * @param {String} id - The user ID.
 * @param {Function} done - The callback function.
 */
const deserializeUser = async (id, done) => {
  console.log('Deserializing user ID:', id);
  try {
    let user = await GoogleUser.findById(id);
    if (!user) {
      user = await TraditionalUser.findById(id);
    }
    console.log('Deserialized user:', user);
    done(null, user); // Pass the user to the done callback
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error);
  }
};

// Export all functions
module.exports = {
  registerTraditionalUser,
  loginTraditionalUser,
  registerGoogleUser,
  loginGoogleUser,
  serializeUser,
  deserializeUser
};
