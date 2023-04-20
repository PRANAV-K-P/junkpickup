const express = require('express');
const router = express.Router();

const controller = require('../controllers/item.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.get('/', controller.getItems);

router.post('/', validateAdminToken, controller.addItems);

module.exports = router;
