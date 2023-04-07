const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateUserToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    const [, token] = authHeader.split(' ');
    // token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_USER_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
      }
      if (decoded.user.role !== 'user') {
        res.status(401);
        throw new Error('User is not authorized');
      }
      if (decoded.user.id !== req.params.userId && decoded.user.id !== req.body.userId) {
        res.status(401);
        throw new Error('User is not authorized to access this resource');
      }
      console.log(req.body.userId);
      console.log(decoded.user,"-- decoded.user");
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

module.exports = validateUserToken;
