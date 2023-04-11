const express = require('express');
const {
  registerUser,
  loginUser,
  getSingleUser,
} = require('../controllers/user');
const { pickupAvailability } = require('../controllers/pincode');
const { getAllTimeUser } = require('../controllers/dateTime');
const { getItems } = require('../controllers/item');
const validateUserToken = require('../middleware/validateUserToken');

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.post('/pickup-availabilities', pickupAvailability);

router.get('/profiles/:id', validateUserToken, getSingleUser);

router.get('/dates/:id', getAllTimeUser);

router.get('/items', getItems);

module.exports = router;
