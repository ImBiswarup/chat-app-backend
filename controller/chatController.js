const Message = require('../models/messages');

const getChatHistory = async () => {
  return await Message.find().sort({ timestamp: -1 }).limit(50).lean();
};

const saveMessage = async (username, message) => {
  const message = new Message({ username, message });
  await message.save();
  return message;
};

module.exports = {
  getChatHistory,
  saveMessage
};
