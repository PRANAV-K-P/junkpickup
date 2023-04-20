const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateAdminToken = asyncHandler(async (req, res, next) => {
  console.log("start");
  const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("auth header ",authHeader);
  if (authHeader && authHeader.startsWith('Bpickj')) {
    console.log("one");
    const [, token] = authHeader.split(' ');
    // token = authHeader.split(' ')[1];
    console.log("two");
    console.log("token -",token);
    jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN_SECRET, (err, decoded) => {
      if (err) {
        console.log("Err err err");
        res.status(401);
        throw new Error('User is not authorized');
      }
      if (decoded.user.role !== 'admin') {
        console.log("err err");
        res.status(401);
        throw new Error('User is not authorized');
      }
      console.log("No error");
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(400);
      throw new Error('User is not authorized or token is missing');
    }
  } else {
    res.status(400);
    throw new Error('User is not authorized or token is missing');
  }
});

module.exports = validateAdminToken;
