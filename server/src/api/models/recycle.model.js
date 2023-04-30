const mongoose = require('mongoose');

const recycleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    headOffice: {
      type: String,
      required: true,
    },
    startedYear: {
      type: String,
      required: true,
    },
    imageUrl: {
        type: String,
    },
  },
  {
    timestamps: true,
    collection: 'recycling_centers',
  },
);

module.exports = mongoose.model('RecyclingCenter', recycleSchema);
