const RecyclingCenter = require('../models/recycle.model');

module.exports = {
  addCenters: async (imageName, centersData) => {
    if (centersData && imageName) {
      const { name, city, pincode, headOffice, startedYear } = centersData;
      const recycle = await RecyclingCenter.create({
        name,
        image: imageName,
        city,
        pincode,
        headOffice,
        startedYear,
      });
      if (recycle) {
        return recycle;
      }
      return false;
    }
  },
  deleteCenters: async (centerId) => {
    let response = await RecyclingCenter.deleteOne({ _id: centerId });
    if (response) {
      return response;
    }
    return false;
  },
  updateCenters: async (centerId, centerData) => {
    let response = await RecyclingCenter.findOneAndUpdate(
      { _id: centerId },
      {
        name: centerData.name,
        city: centerData.city,
        pincode: centerData.pincode,
        headOffice: centerData.headOffice,
        startedYear: centerData.startedYear,
      },
      {
        new: true,
        fields: {
          name: 1,
          city: 1,
          pincode: 1,
          headOffice: 1,
          startedYear: 1,
        },
      },
    );
    if (response) {
      return response;
    }
    return false;
  },
  getCenters: async () => {
    const response = await RecyclingCenter.find();
    if (response) {
      return response;
    }
    return false;
  },
  getSingleCenter: async (centerId) => {
    let response = await RecyclingCenter.findOne({ _id: centerId });
    if (response) {
      return response;
    }
    return false;
  },
  searchInCenters: async (key) => {
    let response = await RecyclingCenter.find({
      $or: [
        { name: { $regex: key, $options: 'i' } },
        { city: { $regex: key, $options: 'i' } },
        { pincode: { $regex: key, $options: 'i' } },
        { headOffice: { $regex: key, $options: 'i' } },
      ],
    });
    if (response) {
      return response;
    }
    return false;
  },
};
