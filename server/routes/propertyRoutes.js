const express = require('express');
const router = express.Router();
const Property = require('../models/Property'); // Assuming the Property model is stored in the models folder

// Route to add a new property
router.post('/properties', async (req, res) => {
  try {
    const { location, propertyName, host, features, description, imagePaths, reviews, pricePerNight } = req.body;

    // Check if pricePerNight is provided
    if (pricePerNight === undefined || pricePerNight === null) {
      return res.status(400).json({ message: 'pricePerNight is required.' });
    }

    // Create new property
    const newProperty = new Property({
      location,
      propertyName,
      host,
      features,
      description,
      imagePaths,
      pricePerNight, // Make sure pricePerNight is included here
      reviews
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add property', error: error.message });
  }
});

// Route to get all properties
router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve properties', error: error.message });
  }
});

// Route to get a single property by ID
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve property', error: error.message });
  }
});

// Route to update a property by ID
router.put('/properties/:id', async (req, res) => {
  try {
    const updatedData = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update property', error: error.message });
  }
});

// Route to delete a property by ID
router.delete('/properties/:id', async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete property', error: error.message });
  }
});

module.exports = router;
