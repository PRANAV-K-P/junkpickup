const asyncHandler = require('express-async-handler');
const itemService = require('../services/item');

// @desc create an item
// @route POST /api/admin/items
// @access private
const addItems = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const itemExist = await itemService.itemExist(name);
  if (itemExist) {
    res.status(400);
    throw new Error('Item already created');
  }
  const item = await itemService.addItems(req.body);
  if (item) {
    res.status(201).json({ name: item.name, description: item.description });
  } else {
    res.status(400);
    throw new Error('Item is not valid');
  }
});

// @desc get all items
// @route GET /api/admin/items
// @access public
const getItems = asyncHandler(async (req, res) => {
  const allItems = await itemService.getItems();
  if (allItems) {
    res.status(200).json(allItems);
  } else {
    res.status(404);
    throw new Error('Items not found');
  }
});

module.exports = { addItems, getItems };
