const asyncHandler = require('express-async-handler');
const pincodeService = require('../services/pincode');

// @desc Add pin numbers
// @route POST /api/admin/add-Pincode
// @access private
const addPincode = asyncHandler(async (req, res) => {
  const { pin } = req.body;
  if (!pin) {
    res.status(400);
    throw new Error('Pincode is mandatory');
  }
  const pinExist = await pincodeService.pinExist(pin);
  if (pinExist) {
    res.status(400);
    throw new Error('Pin code already created');
  }
  const pincode = await pincodeService.addPincode(pin);
  if (pincode) {
    res.status(201).json({ pincode: pincode.pin });
  } else {
    res.status(400);
    throw new Error('pincode data is not valid');
  }
});

// @desc POST check pincode availability
// @route POST /api/users/pickup-availability
// @access public
const pickupAvailability = asyncHandler(async (req, res) => {
  const { pin } = req.body;
  if (!pin) {
    res.status(400);
    throw new Error('Pincode is mandatory !!');
  }
  const validPincode = await pincodeService.checkPincode(pin);
  if (validPincode) {
    res.status(200).json({ isValid: true, pin: validPincode.pin });
  } else {
    res.status(200).json({
      isValid: false,
      pin,
      message: 'Our service is not available to this pincode !',
    });
  }
});

module.exports = { pickupAvailability, addPincode };
