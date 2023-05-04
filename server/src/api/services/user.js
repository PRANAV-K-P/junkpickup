const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const asyncHandler = require('express-async-handler');
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
    let response = await User.updateOne(
      { _id: userId, 'addresses.addressId': addressData.addressId },
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
      return response;
    }
    return false;
  },
  getSingleUser: async (userId) => {
    let response = await User.findOne(
      { _id: userId },
      { name: 1, email: 1, phone: 1 },
    );
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
    let response = await User.aggregate([
      {
        $match: { _id: new ObjectId(userId) },
      },
      {
        $unwind: '$addresses',
      },
      {
        $project: {
          _id: 0,
          addressId: '$addresses.addressId',
          name: '$addresses.name',
          address: '$addresses.address',
          pincode: '$addresses.pincode',
          city: '$addresses.city',
          mobile: '$addresses.mobile',
          email: '$addresses.email',
        },
      },
    ]);
    if (response) {
      return response;
    }
    return false;
  },
  getSingleAddres: async (userId, addressId) => {
    let response = await User.findOne(
      { _id: userId },
      {
        addresses: { $elemMatch: { addressId: addressId } },
      },
    );
    if (response) {
      response = response.addresses?.[0];
      return response;
    }
    return false;
  },
};
