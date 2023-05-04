const asyncHandler = require('express-async-handler');
const pincodeService = require('../services/pincode');

// @desc Add pin numbers
// @route POST /api/pincode
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
// @route POST /api/pincode/pickup-availability
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

// @desc get all pincodes
// @route GET /api/pincode
// @access private
const getPincodes = asyncHandler(async (req, res) => {
  const pincode = await pincodeService.getPincodes();
  if(pincode) {
    res.status(200).json(pincode);
  } else {
    res.status(404);
    throw new Error("Pincodes not found");
  }
})

// @desc delete pincode
// @route DELETE /api/pincode/:id
// @access public
const deletePincode = asyncHandler(async (req, res) => {
  const pinId = req.params.id;
  if(!pinId) {
    res.status(400);
    throw new Error("PinId is mandatory");
  }
  const pin = await pincodeService.deletePincode(pinId);
  if(pin) {
    res.status(200).json(pin);
  } else{
    res.status(404);
    throw new Error("Pincode not found");
  }
})

module.exports = { pickupAvailability, addPincode, getPincodes, deletePincode };
