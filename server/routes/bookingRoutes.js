// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');

// Helper function to calculate the total cost of the booking
const calculateTotalCost = (startDate, endDate, pricePerNight) => {
  const diffInMs = new Date(endDate) - new Date(startDate);
  const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  const totalCost = nights * pricePerNight;
  const taxesAndFees = totalCost * 0.05; // Assuming 5% for taxes and fees
  return totalCost + taxesAndFees;
};

// POST /bookings - Create a new booking
router.post('/bookings', async (req, res) => {
  const { userId, propertyId, startDate, endDate } = req.body;

  if (!userId || !propertyId || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: 'End date must be after start date.' });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const totalCost = calculateTotalCost(startDate, endDate, property.pricePerNight || 0);
    if (totalCost <= 0) return res.status(400).json({ message: 'Invalid booking cost.' });

    const newBooking = new Booking({
      userId,
      propertyId,
      startDate,
      endDate,
      totalCost,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully.', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET /bookings - Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name')
      .populate('propertyId', 'propertyName');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET /bookings/user/:userId - Get all bookings for a specific user
router.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const userBookings = await Booking.find({ userId }).populate('propertyId', 'propertyName location');
    res.status(200).json(userBookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET /bookings/property/:propertyId/dates - Get all booked dates for a property
router.get('/bookings/property/:propertyId/dates', async (req, res) => {
  const { propertyId } = req.params;

  try {
    const bookings = await Booking.find({ propertyId }).select('startDate endDate -_id');
    const bookedDates = bookings.map(booking => ({
      startDate: booking.startDate,
      endDate: booking.endDate,
    }));
    res.status(200).json(bookedDates);
  } catch (error) {
    console.error('Error fetching booked dates:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
