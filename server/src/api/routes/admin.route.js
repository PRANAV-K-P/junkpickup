const express = require('express');
const router = express.Router();

const controller = require('../controllers/admin.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.post('/login', controller.loginAdmin);

router.get('/users', validateAdminToken, controller.getAllusers);

router.put('/users/:id', validateAdminToken, controller.manageUserAccess);

router.get('/users/:id', validateAdminToken, controller.AdminGetUser);

router.get('/users/search/:id', validateAdminToken, controller.searchInUsers);

router.get('/user-count', validateAdminToken, controller.getUserCount);

module.exports = router;
