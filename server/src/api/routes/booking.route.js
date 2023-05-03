const express = require('express');
const router = express.Router();

const controller = require('../controllers/booking.controller');
const validateUserToken = require('../middleware/validateUserToken');
const validateAdminToken = require('../middleware/validateAdminToken');

router.get('/admin', validateAdminToken, controller.getAllBookings);

router.route('/')

  .post(validateUserToken, controller.createOrder)
  
  .get(validateUserToken, controller.getBookings);
  
router.get('/user/:id', validateUserToken, controller.getSingleBooking);

router.get('/admin/:id', validateAdminToken, controller.getSingleBooking);

router.get('/admin/search/:id', validateAdminToken, controller.searchInBookings);

router.get('/user/search/:id', validateUserToken, controller.userSearchInBookings);

router.get('/count', validateAdminToken, controller.getBookingCount);


  
module.exports = router;
