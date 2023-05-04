const Message = require('../models/message.model');

module.exports = {
  createMessage: async (conversationId, sender, text) => {
    let message = await Message.create({
      conversationId,
      sender,
      text,
    });
    if (message) {
      return message;
    }
    return false;
  },
  getMessages: async (conversationId) => {
    let messages = await Message.find({ conversationId });
    if (messages) {
      return messages;
    }
    return false;
  },
};
