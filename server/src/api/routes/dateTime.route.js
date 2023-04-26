const express = require('express');
const router = express.Router();

const controller = require('../controllers/dateTime.controller');
const validateAdminToken = require('../middleware/validateAdminToken');
const validateUserToken = require('../middleware/validateUserToken');

router.put('/', validateAdminToken, controller.updateTimeStatus);

router.get('/admin/:id', validateAdminToken, controller.getAllTimeAdmin);

router.get('/users/:id', validateUserToken, controller.getAllTimeUser);

router.put('/bookings', validateUserToken, controller.updateIsBooked);

module.exports = router;