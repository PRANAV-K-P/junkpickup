const asyncHandler = require('express-async-handler');
const bannerService = require('../services/banner');
const crypto = require('crypto');

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

// const multer = require('multer')

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// @desc add banner
// @route POST /api/banners
// @access private
const addBanner = asyncHandler(async (req, res) => {
  const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex');
  const imageName = randomImageName();
  req.file.buffer;

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
  res.status(200).json({Hammer: 'bannerId'})
  const banner = await bannerService.getSingleBanner(bannerId);
  if(banner) {
    const params = {
      Bucket: bucketName,
      Key: banner.image,
    }
    const command = new DeleteObjectCommand(params);
    await s3.send(command)

    let response = await bannerService.deleteBanner(bannerId);
    if (response) {
      res.status(200).json(banner);

    } else {
      res.status(500);
    throw new Error('deletion failed');
    }
  } else {
    res.status(401);
    throw new Error('Banner not found');
  }
});

// @desc get single banner
// @route GET /api/banners/:id
// @access private
const getOneBanner = asyncHandler(async (req, res) => {
  const bannerName = req.params.id;
  const banner = await bannerService.getOneBanner(bannerName);
  if (banner) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: banner.image,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      banner.imageUrl = url;
    res.status(200).json(banner);
  } else {
    res.status(401);
    throw new Error('Banners not found');
  }
});

module.exports = { addBanner, getBanner, deleteBanner, getOneBanner };
