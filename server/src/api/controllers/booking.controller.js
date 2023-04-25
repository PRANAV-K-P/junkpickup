const asyncHandler = require('express-async-handler');
const bookingService = require("../services/booking");

const createOrder = asyncHandler(async (req, res) => {
    const {userId, products, deliveryDetails, date, status } = req.body;
    if( !userId || products.length === 0 || Object.keys(deliveryDetails) === 0 || !date || !status ) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const dateObj = new Date(date);
    const booking = await bookingService.createOrder(userId, products, deliveryDetails, dateObj, status);
    if (booking) {
        res.status(201).json(booking);
      } else {
        res.status(400);
        throw new Error('Booking data is not valid');
      }
})

module.exports = { createOrder };