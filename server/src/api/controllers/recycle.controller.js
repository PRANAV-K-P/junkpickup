const asyncHandler = require('express-async-handler');
const recycleService = require('../services/recycle');
const crypto = require('crypto');
const s3 = require('../utils/s3bucket');
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const bucketName = process.env.BUCKET_NAME2;

// @desc add recycling centers
// @route POST /api/recycling-centers
// @access private
const addCenters = asyncHandler(async (req, res) => {
  const { name, city, pincode, headOffice, startedYear } = req.body;
  if (!name || !city || !pincode || !headOffice || !startedYear) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex');
  const imageName = randomImageName();

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);

  const recycle = await recycleService.addCenters(imageName, req.body);
  if (recycle) {
    res.status(201).json(recycle);
  } else {
    res.status(400);
    throw new Error('Recyling center data is not valid');
  }
  // res.status(200).json("success recycle")
});

// @desc get all recycling centers
// @route GET /api/recycling-centers
// @access private
const getCenters = asyncHandler(async (req, res) => {
  const recycle = await recycleService.getCenters();
  if (recycle) {
    for (let element of recycle) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: element.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      element.imageUrl = url;
    }

    res.status(200).json(recycle);
  } else {
    res.status(404);
    throw new Error('Recycling centers not found');
  }
});

// @desc delete a  recycling center
// @route POST /api/recycling-centers/:id
// @access private
const deleteCenters = asyncHandler(async (req, res) => {
  const centerId = req.params.id;
  const recycle = await recycleService.getSingleCenter(centerId);
  if (recycle) {
    const params = {
      Bucket: bucketName,
      Key: recycle.image,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    const response = await recycleService.deleteCenters(centerId);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500);
      throw new Error('deletion failed');
    }
  } else {
    res.status(401);
    throw new Error('Recyle center not found');
  }
});

// @desc update a  recycling center
// @route PUT /api/recycling-centers/:id
// @access private
const updateCenters = asyncHandler(async (req, res) => {
  const centerId = req.params.id;
  const { name, city, pincode, headOffice, startedYear, imageName } = req.body;
  if (!name || !city || !pincode || !headOffice || !startedYear) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  if (req.file) {
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);
  }
  const response = await recycleService.updateCenters(centerId, req.body);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(500);
    throw new Error('recycling centers data invalid');
  }
});

// @desc get single recycle center
// @route GET /api/recycling-centers/:id
// @access private
const getSingleCenter = asyncHandler(async (req, res) => {
  const centerId = req.params.id;
  const recycle = await recycleService.getSingleCenter(centerId);
  if (recycle) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: recycle.image,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    recycle.imageUrl = url;
    res.status(200).json(recycle);
  } else {
    res.status(404);
    throw new Error('Recycling center not found');
  }
});

// @desc search recycling centers
// @route GET /api/recycling-centers/search/:id
// @access public
const searchInCenters = asyncHandler(async (req, res) => {
  const key = req.params.id;
  const search = await recycleService.searchInCenters(key);
  if (search) {
    for (let element of search) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: element.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      element.imageUrl = url;
    }
    res.status(200).json(search);
  } else {
    res.status(404);
    throw new Error('Recycling centers not found');
  }
});

module.exports = {
  addCenters,
  deleteCenters,
  updateCenters,
  getCenters,
  getSingleCenter,
  searchInCenters,
};
