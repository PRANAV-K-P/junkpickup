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
      const { name, email, phone, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        blocked: false,
      });
      return user;
    }
    return false;
  },
  getAllusers: async () => {
    const allUsers = await User.find({}, { name: 1, email: 1 });
    if (allUsers) {
      return allUsers;
    }
    return false;
  },
  manageUserAccess: async (userId) => {
    let userData = await User.findOne({ _id: userId });
    const response = await User.updateOne(
      { _id: userId },
      { $set: { blocked: !userData.blocked } },
    );
    if (response) {
      return response;
    }
    return false;
  },
};
