const asyncHandler = require('express-async-handler');
const bookingService = require('../services/booking');

// @desc create a booking
// @route POST /api/bookings
// @access private
const createOrder = asyncHandler(async (req, res) => {
  const { userId, items, addressData, date, time } = req.body;
  if (
    !userId ||
    items.length === 0 ||
    Object.keys(addressData) === 0 ||
    !date ||
    !time
  ) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + parseInt(1));
  dateObj.setUTCHours(0, 0, 0, 0);
  const booking = await bookingService.createOrder(
    userId,
    items,
    addressData,
    dateObj,
    time
  );
  if (booking) {
    res.status(201).json(booking);
  } else {
    res.status(400);
    throw new Error('Booking data is not valid');
  }
});

// @desc get all bookings based on Id
// @route GET /api/bookings
// @access private
const getBookings = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  if(!userId) {
    res.status(400);
    throw new Error('User id not present');
  }
  let bookings = await bookingService.getBookings(userId);
  if(bookings) {
    res.status(200).json(bookings);
  } else {
    res.status(400);
    throw new Error('Booking data is not available');
  }
})

// @desc get single booking
// @route GET /api/bookings/:id
// @access private
const getSingleBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;
  if(!bookingId) {
    res.status(400);
    throw new Error('Booking id not present');
  }
  let data = await bookingService.getSingleBooking(bookingId);
  if(data) {
    res.status(200).json(data);
  } else {
    res.status(400);
    throw new Error('Booking data is not available');
  }
})

// @desc get all bookings
// @route GET /api/bookings/admin
// @access private
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.getAllBookings();
  if(bookings) {
    res.status(200).json(bookings);
  } else {
    res.status(404);
    throw new Error("Bookings not found");
  }
})

module.exports = { createOrder, getBookings, getSingleBooking, getAllBookings };
