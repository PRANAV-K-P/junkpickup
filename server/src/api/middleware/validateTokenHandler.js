const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  console.log('Reached validateToken middleware');
  const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log('req.headers.authorization: ', authHeader);
  if (authHeader && authHeader.startsWith('Bearer')) {
    console.log('auth and bearer present');
    const [, token] = authHeader.split(' ');
    // token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
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

module.exports = validateToken;
