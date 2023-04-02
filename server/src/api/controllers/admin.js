const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const adminService = require('../services/admin');

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
        // {
        //   expiresIn: '59m',
        // },
      );
      res.status(200).json({ admin, auth: accessToken });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

module.exports = { loginAdmin };
