const Item = require('../models/item.model');

module.exports = {
  addItems: async (itemData) => {
    if (itemData) {
      const { itemId, name, description } = itemData;
      const item = await Item.create({
        itemId,
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
    const allItems = await Item.find({}, { itemId: 1, name: 1 });
    if (allItems) {
      return allItems;
    }
    return false;
  },
  getAllItems: async () => {
    const allItems = await Item.find();
    if (allItems) {
      return allItems;
    }
    return false;
  },
  deleteItem: async (itemId) => {
    const response = await Item.deleteOne({ _id: itemId });
    if(response) {
      return response;
    }
    return false;
  }
};
