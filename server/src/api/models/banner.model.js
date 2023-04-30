const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'banners',
  },
);

module.exports = mongoose.model('Banner', bannerSchema);
