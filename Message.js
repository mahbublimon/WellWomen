const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isTyping: { type: Boolean, default: false }
});

module.exports = mongoose.model("Message", messageSchema);