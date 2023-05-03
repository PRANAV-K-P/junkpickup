const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateAdminToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bpickj')) {
    const [, token] = authHeader.split(' ');
    // token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_ADMIN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized 98989');
      }
      if (decoded.user.role !== 'admin') {
        res.status(401);
        throw new Error('User is not authorized   hhhhh');
      }
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
