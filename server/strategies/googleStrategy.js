const passport = require('passport'); // Make sure passport is imported
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Correctly import the GoogleStrategy
const GoogleUser = require('../models/googleUser'); // Ensure this is correct

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
  // Log profile to check its contents
  console.log(profile);

  const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
  if (!email) {
    return done(new Error('No email found in Google profile'));
  }

  try {
    let googleUser = await GoogleUser.findOne({ googleId: profile.id });
    if (!googleUser) {
      googleUser = new GoogleUser({
        googleId: profile.id,
        email,
      });
      await googleUser.save();
    }
    return done(null, googleUser);
  } catch (error) {
    return done(error);
  }
}));
