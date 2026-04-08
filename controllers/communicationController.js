const Message = require("../models/Message");

exports.getInbox = async (req, res) => {
  try {
    const messages = await Message.find({
      type: "Message",
      recipients: req.user._id,
    })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Message.find({
      type: "Announcement",
      $or: [{ targetRole: "All" }, { targetRole: req.user.role }],
    })
      .populate("sender", "name email")
      .sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
      sender: req.user._id,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { readBy: req.user._id } },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
