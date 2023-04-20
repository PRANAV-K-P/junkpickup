const express = require('express');
const router = express.Router();

const controller = require('../controllers/pincode.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.post('/', validateAdminToken, controller.addPincode);

router.post('/pickup-availabilities', controller.pickupAvailability);

module.exports = router;