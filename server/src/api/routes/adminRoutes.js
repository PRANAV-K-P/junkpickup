const express = require('express');
const { loginAdmin } = require('../controllers/admin');
const { addPincode } = require('../controllers/pincode');
const validateAdminToken = require('../middleware/validateAdminToken');
const { updateTimeStatus, getAllTimeAdmin } = require('../controllers/dateTime');
const { addItems } = require('../controllers/item');
const { getAllusers, manageUserAccess } = require('../controllers/user');

const router = express.Router();

router.post('/login', loginAdmin);

router.post('/pin-codes', validateAdminToken, addPincode);

router.put('/dates', validateAdminToken, updateTimeStatus);

router.get('/dates/:id', validateAdminToken, getAllTimeAdmin);

router.post('/items', validateAdminToken, addItems);

router.get('/users', getAllusers);

router.put('/users/:id', manageUserAccess);



module.exports = router;
