const Admin = require('../models/adminModel');
const Pincode = require('../models/pinModal');

module.exports = {
  adminExit: async (email) => {
    const adminAvailable = await Admin.findOne({ email });
    if (adminAvailable) {
      return adminAvailable;
    }
    return false;
  },
  pinExist: async (pin) => {
    const pinAvailable = await Pincode.findOne({ pin });
    if (pinAvailable) {
      return pinAvailable;
    }
    return false;
  },
  addPincode: async (pin) => {
    const pincode = await Pincode.create({
      pin,
    });
    if (pincode) {
      return pincode;
    }
    return false;
  },
};
