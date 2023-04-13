const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    res.status(200).json({ user: userExist, auth: accessToken });
  } else {
    res.status(401);
    throw new Error('Email or password is not valid');
  }
});

// @desc Get single user data
// @route GET /api/users/profile
// @access private
const getSingleUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userData = await userService.userExist(email);
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(401);
    throw new Error('Unauthorized user');
  }
});

// @desc get all users
// @route GET /api/admin/users
// @access private
const getAllusers = asyncHandler(async (req, res) => {
  const allUsers = await userService.getAllusers();
  if (allUsers) {
    res.status(200).json(allUsers);
  } else {
    res.status(401);
    throw new Error('Users data not found');
  }
});

// @desc manage the users's access
// @route PUT /api/admin/users/:id
// @access private
const manageUserAccess = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const userData = await userService.manageUserAccess(userId);
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(400);
    throw new Error('User data not found');
  }
});

// @desc update the user's address
// @route PUT /api/users/address/:id
// @access private
const addAddress = asyncHandler(async (req, res) => {
  // const {name, address, pincode, city, mobile, email} = req.body;
  const userId = req.params.id;
  const user = await userService.addAddress(userId,req.body);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid data to add address');
  }
});

// @desc update the user's address
// @route PUT /api/users/address
// @access private
const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.query.id;
  const user = await userService.updateAddress(userId,req.body);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid data to update address');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getSingleUser,
  getAllusers,
  manageUserAccess,
  addAddress,
  updateAddress
};
