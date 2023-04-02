const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = {
  userExist: async (email) => {
    const userAvailable = await User.findOne({ _id: sfjsd });
    if (userAvailable) {
      return userAvailable;
    }
    return false;
  },
  registerUser: async (userData) => {
    if (userData) {
      const { name, email, phone, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });
      return user;
    }
    return false;
  },
};
