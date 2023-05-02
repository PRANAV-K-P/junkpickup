const Conversation = require('../models/conversation.model');

module.exports = {
  createConversation: async (senderId, receiverId) => {
    const members = [senderId, receiverId];
    const savedConversation = await Conversation.create({ members });
    if (savedConversation) {
      return savedConversation;
    }
    return false;
  },
  getConversation: async (memberId) => {
    const conversation = await Conversation.find({
      members: { $in: [memberId] },
    });
    if (conversation.length !== 0) {
      return conversation;
    }
    return false;
  },
  getSingleConversation: async (memberId) => {
    const conversation = await Conversation.findOne({
      members: { $in: [memberId] },
    });
    if (conversation) {
      return conversation;
    }
    return false;
  },
};
