const express = require('express');
const router = express.Router();

const controller = require('../controllers/message.controller');
const validateAdminToken = require('../middleware/validateAdminToken');
const validateUserToken = require('../middleware/validateUserToken');

router.post('/admin', validateAdminToken, controller.createMessage);

router.get('/admin/:id', validateAdminToken, controller.getMessages)

router.post('/user', validateUserToken, controller.createMessage); 

router.get('/user/:id', validateUserToken, controller.getMessages); 


module.exports = router;