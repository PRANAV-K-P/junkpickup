const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const itemService = require('../services/item');

// @desc create an item
// @route POST /api/items
// @access private
const addItems = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const ItemData = req.body;
  ItemData.itemId = crypto.randomUUID();
  const itemExist = await itemService.itemExist(name);
  if (itemExist) {
    res.status(400);
    throw new Error('Item already created');
  }
  const item = await itemService.addItems(ItemData);
  if (item) {
    res.status(201).json({ name: item.name, description: item.description });
  } else {
    res.status(400);
    throw new Error('Item is not valid');
  }
});

// @desc get all items
// @route GET /api/items
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

// @desc get all items admin
// @route GET /api/items/admin
// @access private
const getAdminItems = asyncHandler(async (req, res) => {
  const allItems = await itemService.getAllItems();
  if (allItems) {
    res.status(200).json(allItems);
  } else {
    res.status(404);
    throw new Error('Items not found');
  }
});

// @desc delete items
// @route DELETE   /api/items/:id
// @access private
const deleteItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;
  if(!itemId) {
    res.status(400);
    throw new Error("ItemId is mandatory ")
  }
  const item = await itemService.deleteItem(itemId);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404);
    throw new Error('Items not found');
  }
});

module.exports = { addItems, getItems, getAdminItems, deleteItem };
