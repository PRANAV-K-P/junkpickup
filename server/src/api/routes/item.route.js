const express = require('express');
const router = express.Router();

const controller = require('../controllers/item.controller');
const validateAdminToken = require('../middleware/validateAdminToken');
const validateUserToken = require('../middleware/validateUserToken');


router.post('/', validateAdminToken, controller.addItems);

router.delete('/:id', validateAdminToken, controller.deleteItem);

router.get('/admin/', validateAdminToken, controller.getAdminItems);

router.get('/',validateUserToken, controller.getItems);

module.exports = router;
