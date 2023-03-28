const express = require('express');
const {
  registerUser,
  loginUser,
  getSingleUser,
  pickupAvailability

} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);
router.post('/pickup-availability',pickupAvailability);
router.get('/profile', validateToken, getSingleUser);

module.exports = router;
