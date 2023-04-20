const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const adminService = require('../services/admin');
const userService = require('../services/user');

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
            role: 'admin',
            email: admin.email,
            id: admin._id,
          },
        },
        process.env.ACCESS_TOKEN_ADMIN_SECRET,
        {
          expiresIn: '59m',
        },
      );
      res.status(200).json({
        admin: { _id: admin._id, email: admin.email },
        auth: accessToken,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc get all users
// @route GET /api/admin/users
// @access private
const getAllusers = asyncHandler(async (req, res) => {
  const allUsers = await adminService.getAllusers();
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
  const userData = await adminService.manageUserAccess(userId);
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(400);
    throw new Error('User data not found');
  }
});

module.exports = { loginAdmin, getAllusers, manageUserAccess };
