const Item = require('../models/item.model');

module.exports = {
  addItems: async (itemData) => {
    if (itemData) {
      const { name, description } = itemData;
      const item = await Item.create({
        name,
        description,
      });
      return item;
    }
    return false;
  },
  itemExist: async (name) => {
    const itemAvailable = await Item.findOne({ name });
    if (itemAvailable) {
      return itemAvailable;
    }
    return false;
  },
  getItems: async () => {
    const allItems = await Item.find({}, { name: 1 });
    if (allItems) {
      return allItems;
    }
    return false;
  },
};
