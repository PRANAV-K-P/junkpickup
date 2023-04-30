const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const controller = require('../controllers/recycle.controller');
const validateAdminToken = require('../middleware/validateAdminToken');

router.route('/')

  .post(validateAdminToken, upload.single('image'), controller.addCenters)

  .get(validateAdminToken, controller.getCenters);

router.route('/:id')
  .delete(validateAdminToken, controller.deleteCenters)

  .put(validateAdminToken, upload.single('image'), controller.updateCenters)

router.get('/data/:id',validateAdminToken, controller.getSingleCenter);

router.get('/details', controller.getCenters);

router.get('/search/:id', controller.searchInCenters);


module.exports = router;
