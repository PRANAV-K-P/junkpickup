const asyncHandler = require('express-async-handler');
const conversationService = require('../services/conversation');

// @desc create a conversation
// @route POST /api/conversations
// @access private
const createConversation = asyncHandler(async (req, res) => {
  const receiverId = process.env.RECEIVER_ID;
  const { senderId } = req.body;
  if (!senderId) {
    res.status(400);
    throw new Error('Invalid senderId and receiverId');
  }
  const conversationExist = await conversationService.getConversation(senderId);
  if (conversationExist) {
    res.status(400);
    throw new Error('Conversation already created');
  }
  const conversation = await conversationService.createConversation(
    senderId,
    receiverId,
  );
  if (conversation) {
    res.status(201).json(conversation);
  } else {
    res.status(500);
    throw new Error('Servver error occured while creating conversation');
  }
});

// @desc get conversations
// @route GET /api/conversations/admin/:id
// @access private
const AdminGetConversation = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400);
    throw new Error('Invalid UserId');
  }
  const conversation = await conversationService.getConversation(userId);
  if (conversation) {
    res.status(200).json(conversation);
  } else {
    res.status(404);
    throw new Error('Conversations not found');
  }
});

// @desc get single conversation
// @route GET /api/conversations/user/:id
// @access private
const getSingleConversation = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400);
    throw new Error('Invalid UserId');
  }
  const conversation = await conversationService.getSingleConversation(userId);
  if (conversation) {
    res.status(200).json(conversation);
  } else {
    res.status(404);
    throw new Error('Conversation not found');
  }
});

module.exports = {
  createConversation,
  AdminGetConversation,
  getSingleConversation,
};
