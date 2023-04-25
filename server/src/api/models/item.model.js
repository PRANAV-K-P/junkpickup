const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'items',
  },
);

module.exports = mongoose.model('Item', itemSchema);