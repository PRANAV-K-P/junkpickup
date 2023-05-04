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
  getAllBookings: async () => {
    const response = await Booking.find();
    if (response) {
      return response;
    }
    return false;
  },
  searchInBookings: async (key) => {
    let response = await Booking.find({
      $or: [
        { time: { $regex: key, $options: 'i' } },
        { status: { $regex: key, $options: 'i' } },
        { 'products.name': { $regex: key, $options: 'i' } },
        { 'deliveryDetails.name': { $regex: key, $options: 'i' } },
      ],
    });
    if (response) {
      return response;
    }
    return false;
  },
  userSearchInBookings: async (key, userId) => {
    let response = await Booking.find({
      userId: userId,
      $or: [
        { time: { $regex: key, $options: 'i' } },
        { status: { $regex: key, $options: 'i' } },
        { 'products.name': { $regex: key, $options: 'i' } },
        { 'deliveryDetails.name': { $regex: key, $options: 'i' } },
        { 'deliveryDetails.address': { $regex: key, $options: 'i' } },
        { 'deliveryDetails.mobile': { $regex: key, $options: 'i' } },
        { 'deliveryDetails.city': { $regex: key, $options: 'i' } },
        { 'deliveryDetails.pincode': { $regex: key, $options: 'i' } },
        { 'deliveryDetails.email': { $regex: key, $options: 'i' } },
      ],
    });
    if (response) {
      return response;
    }
    return false;
  },
  getBookingCount: async () => {
    let count = await Booking.countDocuments();
    if (count) {
      return count;
    }
    return false;
  },
};
