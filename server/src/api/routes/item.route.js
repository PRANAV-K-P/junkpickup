const express = require('express');
const router = express.Router();

const controller = require('../controllers/item.controller');
const validateAdminToken = require('../middleware/validateAdminToken');
const validateUserToken = require('../middleware/validateUserToken');

router.get('/',validateUserToken, controller.getItems);

router.post('/', validateAdminToken, controller.addItems);

module.exports = router;
