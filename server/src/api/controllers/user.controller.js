const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userService = require('../services/user');

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const userExist = await userService.userExist(email);
  if (userExist) {
    res.status(400);
    throw new Error('User already registered');
  }
  const user = await userService.registerUser(req.body);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory !');
  }
  const response = await userService.userExist(email);
  const userExist = response.userAvailable;
  if (response?.block) {
    res.status(401);
    throw new Error("Account suspended, Can't login");
  } else if (
    userExist &&
    (await bcrypt.compare(password, userExist.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          role: 'user',
          email: userExist.email,
          id: userExist._id,
        },
      },
      process.env.ACCESS_TOKEN_USER_SECRET,
      {
        expiresIn: '59m',
      },
    );
    res.status(200).json({
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
      auth: accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Email or password is not valid');
  }
});

// @desc Get single user data
// @route GET /api/users/profiles/:id
// @access private
const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const userData = await userService.getSingleUser(userId);
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(401);
    throw new Error('Unauthorized user');
  }
});

// @desc update the user's address
// @route PUT /api/users/address/:id
// @access private
const addAddress = asyncHandler(async (req, res) => {
  const { name, address, pincode, city, mobile, email } = req.body;
  if (!name || !address || !pincode || !city || !mobile || !email) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const userId = req.params.id;
  const addressData = req.body;
  addressData.addressId = crypto.randomUUID();
  const user = await userService.addAddress(userId, addressData);
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid data to add address');
  }
});

// @desc update the user's address
// @route PUT /api/users/address
// @access private
const updateAddress = asyncHandler(async (req, res) => {
  const { addressId, name, address, pincode, city, mobile, email } = req.body;
  if (
    !addressId ||
    !name ||
    !address ||
    !pincode ||
    !city ||
    !mobile ||
    !email
  ) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const userId = req.query.userId;
  const user = await userService.updateAddress(userId, req.body);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid data to update address');
  }
});

// @desc update single user data
// @route PUT /api/users/profiles/:id
// @access private
const updateSingleUser = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const userId = req.params.id;
  const userData = await userService.updateSingleUser(userId, req.body);
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(401);
    throw new Error('Unauthorized user');
  }
});

// @desc get single addresses
// @route GET /api/users/addresses
// @access private
const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const address = await userService.getAddresses(userId);
  if (address) {
    res.status(200).json(address);
  } else {
    res.status(401);
    throw new Error('Address not present');
  }
});

// @desc a single address
// @route GET /api/users/address-data
// @access private
const getSingleAddres = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const addressId = req.query.addressId;
  let address = await userService.getSingleAddres(userId, addressId);
  if (address) {
    address = address.toObject();
    delete address._id;
    res.status(200).json(address);
  } else {
    res.status(401);
    throw new Error('Address not present');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getSingleUser,
  addAddress,
  updateAddress,
  updateSingleUser,
  getAddresses,
  getSingleAddres,
};
