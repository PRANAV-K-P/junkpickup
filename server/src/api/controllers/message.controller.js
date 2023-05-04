const asyncHandler = require('express-async-handler');
const messageService = require('../services/message');

// @desc create a message
// @route POST /api/messages
// @access private
const createMessage = asyncHandler(async (req, res) => {
  const { conversationId, sender, text } = req.body;
  if (!conversationId || !sender || !text) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const message = await messageService.createMessage(
    conversationId,
    sender,
    text,
  );
  if (message) {
    res.status(201).json(message);
  } else {
    res.status(500);
    throw new Error('Servver error occured while creating message');
  }
});

// @desc get messages
// @route GET /api/messages/:id
// @access private
const getMessages = asyncHandler(async (req, res) => {
  const conversationId = req.params.id;
  if (!conversationId) {
    res.status(400);
    throw new Error('Invalid conversationId');
  }
  const messages = await messageService.getMessages(conversationId);
  if (messages) {
    res.status(200).json(messages);
  } else {
    res.status(404);
    throw new Error('messages not found');
  }
});

module.exports = { createMessage, getMessages };
