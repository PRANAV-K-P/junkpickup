const Pincode = require('../models/pinModal');

module.exports = {
  addPincode: async (pin) => {
    const pincode = await Pincode.create({
      pin,
    });
    if (pincode) {
      return pincode;
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
  checkPincode: async (pin) => {
    const validPincode = await Pincode.findOne({ pin });
    if (validPincode) {
      return validPincode;
    }
    return false;
  },
};
