const express = require('express');
const { loginAdmin } = require('../controllers/admin');
const { addPincode } = require('../controllers/pincode');
const validateToken = require('../middleware/validateTokenHandler');
const { addDateTime } = require('../controllers/dateTime');

const router = express.Router();

router.post('/login', loginAdmin);

router.post('/pin-codes', validateToken, addPincode);

router.post('/date', validateToken, addDateTime);

module.exports = router;
