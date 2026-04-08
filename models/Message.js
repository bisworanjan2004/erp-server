const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  type: { type: String, enum: ["Announcement", "Message"], required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Used if type is Message
  targetRole: { type: String, enum: ["All", "Admin", "Teacher", "Staff"] }, // Used if type is Announcement
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
