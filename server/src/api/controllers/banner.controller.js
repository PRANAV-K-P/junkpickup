const asyncHandler = require('express-async-handler');
const bannerService = require('../services/banner');
const crypto = require('crypto');
const s3 = require('../utils/s3bucket');
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const bucketName = process.env.BUCKET_NAME1;

// @desc add banner
// @route POST /api/banners
// @access private
const addBanner = asyncHandler(async (req, res) => {
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

  const banner = await bannerService.addBanner(imageName);
  if (banner) {
    res.status(200).json(banner);
  } else {
    res.status(401);
    throw new Error('Banner data invalid');
  }
});

// @desc get banner
// @route GET /api/banners
// @access private
const getBanner = asyncHandler(async (req, res) => {
  const banners = await bannerService.getBanner();
  if (banners) {
    for (let element of banners) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: element.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      element.imageUrl = url;
    }

    res.status(200).json(banners);
  } else {
    res.status(401);
    throw new Error('Banners not found');
  }
});

// @desc delete banner
// @route DELETE /api/banners/:id
// @access private
const deleteBanner = asyncHandler(async (req, res) => {
  const bannerId = req.params.id;
  const banner = await bannerService.getSingleBanner(bannerId);
  if (banner) {
    const params = {
      Bucket: bucketName,
      Key: banner.image,
    };
    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    let response = await bannerService.deleteBanner(bannerId);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(500);
      throw new Error('deletion failed');
    }
  } else {
    res.status(401);
    throw new Error('Banner not found');
  }
});

module.exports = { addBanner, getBanner, deleteBanner };
