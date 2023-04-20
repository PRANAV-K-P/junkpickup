const bcrypt = require('bcrypt');
const User = require('../models/user.model');

module.exports = {
  userExist: async (email) => {
    const userAvailable = await User.findOne({ email });
    let response = {};
    if (userAvailable) {
      response.userAvailable = userAvailable;
      if (userAvailable.blocked) {
        response.block = true;
      } else {
        response.block = false;
      }
      return response;
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
  addAddress: async (userId, addressData) => {
    let updated = await User.updateOne(
      { _id: userId },
      { $push: { addresses: addressData } },
    );
    if (updated) {
      return updated;
    }
    return false;
  },
  updateAddress: async (userId, addressData) => {
    console.log(userId);
    let response = await User.updateOne(
      { _id: userId, 'addresses._id': addressData.id },
      {
        $set: {
          'addresses.$.name': addressData.name,
          'addresses.$.address': addressData.address,
          'addresses.$.pincode': addressData.pincode,
          'addresses.$.city': addressData.city,
          'addresses.$.mobile': addressData.mobile,
          'addresses.$.email': addressData.email,
        },
      },
    );
    if (response) {
      console.log(response);
      return response;
    }
    return false;
  },
  getSingleUser: async (userId) => {
    let response = await User.findOne(
      { _id: userId },
      { name: 1, email: 1, phone: 1 },
    );
    console.log(response);
    if (response) {
      return response;
    }
    return false;
  },
  updateSingleUser: async (userId, userData) => {
    let response = await User.findOneAndUpdate(
      { _id: userId },
      { name: userData.name, email: userData.email, phone: userData.phone },
      {
        new: true,
        fields: {
          name: 1,
          email: 1,
          phone: 1,
        },
      },
    );
    if (response) {
      return response;
    }
    return false;
  },
  getAddresses: async (userId) => {
    console.log(userId);
    let response = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: '$addresses',
      },
      {
        $project: {
          name: '$addresses.name',
          address: '$addresses.address',
          pincode: '$addresses.pincode',
          city: '$addresses.city',
          mobile: '$addresses.mobile',
          email: '$addresses.email',
        },
      },
    ]);
    console.log(response, '-- response');
    if (response) {
      return response;
    }
    return false;
  },
};
