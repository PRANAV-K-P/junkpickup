const express = require('express');
const {
  registerUser,
  loginUser,
  getSingleUser,
} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/profile', validateToken, getSingleUser);

module.exports = router;
