const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = {
  userExist: async (email) => {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return userAvailable;
    }
    return false;
  },
  registerUser: async (userData) => {
    if (userData) {
      const { firstname, lastname, email, phone, password } = userData;
      console.log('user phone - ', phone);
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstname,
        lastname,
        email,
        phone,
        password: hashedPassword,
      });
      return user;
    }
    return false;
  },
};
