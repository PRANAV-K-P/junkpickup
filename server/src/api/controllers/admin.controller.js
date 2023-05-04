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

// @desc get single User
// @route GET /api/admin/users/:id
// @access private
const AdminGetUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400);
    throw new Error('Invalid userId');
  }
  const userData = await adminService.AdminGetUser(userId);
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(404);
    throw new Error('User data not found');
  }
});

// @desc search all Users
// @route GET /api/admin/users/search/:id
// @access private
const searchInUsers = asyncHandler(async (req, res) => {
  const key = req.params.id;
  const search = await adminService.searchInUsers(key);
  if (search) {
    res.status(200).json(search);
  } else {
    res.status(404);
    throw new Error('User Data not found');
  }
});

// @desc to get the count of Users
// @route GET /api/admin/users/count
// @access private
const getUserCount = asyncHandler(async (req, res) => {
  let count = await adminService.getUserCount();
  if (count) {
    res.status(200).json({ users: count });
  } else {
    res.status(404);
    throw new Error('Users not found');
  }
});

module.exports = {
  loginAdmin,
  getAllusers,
  manageUserAccess,
  AdminGetUser,
  searchInUsers,
  getUserCount,
};
