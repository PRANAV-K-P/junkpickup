const Booking = require('../models/booking.model');

module.exports = {
  createOrder: async (userId, items, addressData, dateObj, time) => {
    const booking = await Booking.create({
      userId,
      products: items,
      deliveryDetails: addressData,
      date: dateObj,
      time,
      status: 'confirm',
    });
    if (booking) {
      return booking;
    }
    return false;
  },
  getBookings: async (userId) => {
    const response = await Booking.find(
      { userId },
      { userId: 1, date: 1, time: 1, status: 1 },
    );
    if (response) {
      return response;
    }
    return false;
  },
  getSingleBooking: async (bookingId) => {
    const response = await Booking.findOne({ _id: bookingId });
    if (response) {
      return response;
    }
    return false;
  },
};
