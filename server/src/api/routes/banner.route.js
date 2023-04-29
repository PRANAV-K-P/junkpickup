const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const controller = require('../controllers/banner.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.route('/')

  .post(validateAdminToken, upload.single('image'), controller.addBanner)

  .get(validateAdminToken, controller.getBanner);

router.route('/:id')

  .delete(validateAdminToken, controller.deleteBanner)

  .get(controller.getOneBanner);

module.exports = router;
