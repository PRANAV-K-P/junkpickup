const Booking = require("../models/booking.model");

module.exports = {
    createOrder: async (userId, items, addressData, dateObj, time) => {
        const booking = await Booking.create({
            userId,
            products: items,
            deliveryDetails: addressData,
            date: dateObj,
            time,
            status: "confirm"
        })
        if(booking) {
            return booking;
        }
        return false;
    }
}