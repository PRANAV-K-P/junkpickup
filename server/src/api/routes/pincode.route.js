const express = require('express');
const router = express.Router();

const controller = require('../controllers/pincode.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.delete('/:id', validateAdminToken, controller.deletePincode);

router.post('/', validateAdminToken, controller.addPincode);

router.post('/pickup-availabilities', controller.pickupAvailability);

router.get('/', validateAdminToken, controller.getPincodes);


module.exports = router;