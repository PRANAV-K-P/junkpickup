const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        itemId: { type: String },
        name: { type: String },
        description: { type: String },
      },
    ],
    deliveryDetails: {
      addressId: { type: String },
      name: { type: String },
      address: { type: String },
      pincode: { type: String },
      city: { type: String },
      mobile: { type: String },
      email: { type: String },
    },
    date: {
      type: Date,
      required: true,
    },
    time: { type: String },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Booking', bookingSchema);
