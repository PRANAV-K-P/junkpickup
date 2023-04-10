const express = require('express');
const { loginAdmin } = require('../controllers/admin');
const { addPincode } = require('../controllers/pincode');
const validateAdminToken = require('../middleware/validateAdminToken');
const { updateTimeStatus } = require('../controllers/dateTime');
const { getAllTime } = require('../controllers/dateTime');

const router = express.Router();

router.post('/login', loginAdmin);

router.post('/pin-codes', validateAdminToken, addPincode);

router.put('/dates', validateAdminToken, updateTimeStatus);

router.get('/dates/:id', validateAdminToken, getAllTime);

module.exports = router;
