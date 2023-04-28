const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const validateUserToken = require('../middleware/validateUserToken');

router.post('/signup', controller.registerUser);

router.post('/login', controller.loginUser);

router.put('/addresses/:id', validateUserToken, controller.addAddress);  

router.route('/profiles/:id')

  .get(validateUserToken, controller.getSingleUser)

  .put(validateUserToken, controller.updateSingleUser);

router.route('/addresses')

  .put(validateUserToken, controller.updateAddress)  

  .get(validateUserToken, controller.getAddresses);   

router.get("/address-data", validateUserToken, controller.getSingleAddres); 

module.exports = router;
