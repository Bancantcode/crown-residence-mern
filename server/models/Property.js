const mongoose = require('mongoose');

// Define Review Schema
const reviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  content: { type: String, required: true },
});

// Define Property Schema
const propertySchema = new mongoose.Schema({
  location: {
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
  },
  propertyName: { type: String, required: true },  // e.g., Paradise Escape
  host: { type: String, required: true },  // e.g., Vladimir Borja
  features: {
    bedrooms: { type: Number, required: true },  // e.g., 6 bedrooms
    baths: { type: Number, required: true },  // e.g., 6 baths
    beds: { type: Number, required: true },  // e.g., 6 beds
    guests: { type: Number, required: true },  // e.g., 12 guests
  },
  description: {
    overview: { type: String, required: true },  // General property overview
    detailed: { type: String, required: true },  // Detailed description
  },
  imagePaths: [{ type: String, required: true }],  // Array of image paths for the property
  reviews: [reviewSchema],  // Array of reviews for the property
  pricePerNight: { type: Number, required: true },  // Price per night for the property
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create and export the Property model
const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
