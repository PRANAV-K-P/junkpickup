const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the full name'],
    },
    email: {
      type: String,
      required: [true, 'Please add the user email address'],
      unique: [true, 'Email address already taken'],
    },
    phone: {
      type: String,
    },
    addresses: [
      {
        addressId: {type: String},
        name: {type: String},
        address: {type: String},
        pincode: {type: String},
        city: {type: String},
        mobile: {type: String},
        email: {type: String},
      }
    ],
    password: {
      type: String,
    },
    blocked: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
