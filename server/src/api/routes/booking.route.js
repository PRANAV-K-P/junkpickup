const express = require('express');
const router = express.Router();

const controller = require('../controllers/booking.controller');
const validateUserToken = require('../middleware/validateUserToken');

router.route('/')

  .post(validateUserToken, controller.createOrder)

  .get(validateUserToken, controller.getBookings);

router.get('/:id', validateUserToken, controller.getSingleBooking);

module.exports = router;
