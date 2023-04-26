const asyncHandler = require('express-async-handler');
const bookingService = require('../services/booking');

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

module.exports = { createOrder };
