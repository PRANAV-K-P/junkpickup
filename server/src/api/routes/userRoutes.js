const express = require('express');
const {
  registerUser,
  loginUser,
  getSingleUser,
} = require('../controllers/user');
const { pickupAvailability } = require('../controllers/pincode');
const { getAllTime } = require("../controllers/dateTime")
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post('/pickup-availability', pickupAvailability);

router.get('/profile', validateToken, getSingleUser);

router.get('/dates/:id', validateToken, getAllTime);

module.exports = router;
