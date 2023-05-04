const Banner = require('../models/banner.model');
const crypto = require('crypto');

module.exports = {
  addBanner: async (imageName) => {
    if (imageName) {
      const customName = 'Banner ' + crypto.randomUUID();
      const response = await Banner.create({
        name: customName,
        image: imageName,
      });
      if (response) {
        return response;
      }
      return false;
    }
  },
  getBanner: async () => {
    const response = await Banner.find();
    if (response) {
      return response;
    }
    return false;
  },
  getSingleBanner: async (bannerId) => {
    let response = await Banner.findOne({ _id: bannerId });
    if (response) {
      return response;
    }
    return false;
  },
  deleteBanner: async (bannerId) => {
    let response = await Banner.deleteOne({ _id: bannerId });
    if (response) {
      return response;
    }
    return false;
  },
};
