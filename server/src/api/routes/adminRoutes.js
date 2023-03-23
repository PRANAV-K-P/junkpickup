const express = require('express');
const { loginAdmin, addPincode } = require('../controllers/adminController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/add-Pincode', validateToken, addPincode);

module.exports = router;
