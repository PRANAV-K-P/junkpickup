const express = require('express');
const { loginAdmin, addPincode } = require('../controllers/adminController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/pin-codes', validateToken, addPincode);

module.exports = router;
