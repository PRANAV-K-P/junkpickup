const express = require('express');
const { loginAdmin } = require('../controllers/admin');
const { addPincode } = require('../controllers/pincode');
const validateAdminToken = require('../middleware/validateAdminToken');
const { addDateTime } = require('../controllers/dateTime');

const router = express.Router();

router.post('/login', loginAdmin);

router.post('/pin-codes', validateAdminToken, addPincode);

router.post('/dates', validateAdminToken, addDateTime);

module.exports = router;
