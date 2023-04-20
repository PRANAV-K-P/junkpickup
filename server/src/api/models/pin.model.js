const mongoose = require('mongoose');

const pinSchema = mongoose.Schema(
  {
    pin: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'pin_numbers',
  },
);

module.exports = mongoose.model('Pincode', pinSchema);
