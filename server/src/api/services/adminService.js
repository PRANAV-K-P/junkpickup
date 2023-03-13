const Admin = require('../models/adminModel');

module.exports = {
  adminExit: async (email) => {
    const adminAvailable = await Admin.findOne({ email });
    if (adminAvailable) {
      return adminAvailable;
    }
    return false;
  },
};
