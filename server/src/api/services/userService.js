const bcrypt = require("bcrypt");
const User = require("../models/userModel");

module.exports = {
  userExist: async (email) => {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      return userAvailable;
    } else {
      return false;
    }
  },
  registerUser: async (userData) => {
    if (userData) {
      const { firstname, lastname, email, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
      return user;
    }
  },
};
