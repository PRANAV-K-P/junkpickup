const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  if (!firstname || !lastname || !email || !phone || !password) {
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
  const userExist = await userService.userExist(email);
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          firstname: userExist.firstname,
          lastname: userExist.lastname,
          email: userExist.email,
          id: userExist._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      },
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error('Email or password is not valid');
  }
});

// @desc Get single user data
// @route GET /api/users/profile
// @access private
const getSingleUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, getSingleUser };
