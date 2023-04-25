const Booking = require("../models/booking.model");

module.exports = {
    createOrder: async (userId, products, deliveryDetails, dateObj, status) => {
        const booking = await Booking.create({
            userId,
            products,
            deliveryDetails,
            date: dateObj,
            status
        })
        if(booking) {
            return booking;
        }
        return false;
    }
}