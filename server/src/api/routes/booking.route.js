const express = require('express');
const router = express.Router();

const controller = require('../controllers/booking.controller');
const validateUserToken = require('../middleware/validateUserToken');
const validateAdminToken = require('../middleware/validateAdminToken');

router.get('/admin', validateAdminToken, controller.getAllBookings);

router.route('/')

  .post(validateUserToken, controller.createOrder)
  
  .get(validateUserToken, controller.getBookings);
  
router.get('/:id', validateUserToken, controller.getSingleBooking);
  

module.exports = router;
