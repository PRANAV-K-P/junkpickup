const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const adminService = require('../services/adminService');

// @desc Login admin
// @route POST /api/admin/login
// @access public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory !');
  }
  const admin = await adminService.adminExit(email);
  if (admin) {
    if (password === admin.password) {
      const accessToken = jwt.sign(
        {
          user: {
            firstname: admin.firstname,
            lastname: admin.lastname,
            email: admin.email,
            id: admin._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1m',
        },
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc Add pin numbers 
// @route POST /api/admin/add-Pincode
// @access private

const addPincode = asyncHandler(async (req, res) => {
  const { pin } = req.body;
  if(!pin) {
    res.status(400);
    throw new Error('Pincode is mandatory');
  }
  const pinExist = await adminService.pinExist(pin);
  if (pinExist) {
    res.status(400);
    throw new Error('Pin code already created');
  }
  const pincode = await adminService.addPincode(pin);
  if (pincode) {
    res.status(201).json({ pincode: pincode.pin });
  } else {
    res.status(400);
    throw new Error('pincode data is not valid');
  }
  // res.json({message: "got the pin, going to add the pincode to db", pin: pin})
})

module.exports = { loginAdmin, addPincode };
