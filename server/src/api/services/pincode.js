const Pincode = require('../models/pin.model');

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
  getPincodes: async () => {
    const pincodes = await Pincode.find();
    if(pincodes) {
      return pincodes;
    }
    return false;
  },
  deletePincode: async (pinId) => {
    const response = await Pincode.deleteOne({ _id: pinId});
    if(response) {
      return response;
    }
    return false;
  }
};
