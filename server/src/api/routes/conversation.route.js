const express = require('express');
const router = express.Router();

const controller = require('../controllers/conversation.controller');
const validateAdminToken = require('../middleware/validateAdminToken');
const validateUserToken = require('../middleware/validateUserToken');

router.get('/admin/:id', validateAdminToken, controller.AdminGetConversation);

router.post('/', validateUserToken, controller.createConversation);

router.get('/user/:id', validateUserToken, controller.getSingleConversation) 

module.exports = router;