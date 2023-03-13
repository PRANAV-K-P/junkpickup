const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add the user email address'],
      unique: [true, 'Email address already taken'],
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'],
    },
  },
  {
    collection: 'admin',
  },
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
