const express = require('express');
const router = express.Router();

const controller = require('../controllers/dateTime.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.put('/', validateAdminToken, controller.updateTimeStatus);

router.get('/admin/:id', validateAdminToken, controller.getAllTimeAdmin);

router.get('/users/:id', controller.getAllTimeUser);

module.exports = router;