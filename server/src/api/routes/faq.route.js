const express = require('express');
const router = express.Router();

const controller = require('../controllers/faq.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.post('/', validateAdminToken, controller.createFaq);  

router.get('/admin', validateAdminToken, controller.getFaq);  

router.delete('/:id', validateAdminToken, controller.deleteFaq);  

router.get('/data/:id', validateAdminToken, controller.getSingleFaq); 

router.put('/:id', validateAdminToken, controller.updateFaq); 

router.get('/user', controller.UserGetFaq); 

module.exports = router;