const Admin = require('../models/admin.model');
const User = require('../models/user.model');

module.exports = {
  adminExit: async (email) => {
    const adminAvailable = await Admin.findOne({ email });
    if (adminAvailable) {
      return adminAvailable;
    }
    return false;
  },
  getAllusers: async () => {
    const allUsers = await User.find({}, { name: 1, email: 1, blocked: 1 });
    if (allUsers) {
      return allUsers;
    }
    return false;
  },
  manageUserAccess: async (userId) => {
    let userData = await User.findOne({ _id: userId });
    const response = await User.updateOne(
      { _id: userId },
      { $set: { blocked: !userData.blocked } },
    );
    if (response) {
      return response;
    }
    return false;
  },
  AdminGetUser: async (userId) => {
    let userData = await User.findOne(
      { _id: userId },
      { name: 1, email: 1, phone: 1 },
    );
    if (userData) {
      return userData;
    }
    return false;
  },
  searchInUsers: async (key) => {
    let response = await User.find({
      $or: [
        { name: { $regex: key, $options: 'i' } },
        { email: { $regex: key, $options: 'i' } },
      ],
    });
    if (response) {
      return response;
    }
    return false;
  },
  getUserCount: async () => {
    let count = await User.countDocuments();
    if (count) {
      return count;
    }
    return false;
  },
};
