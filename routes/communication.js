const express = require("express");
const router = express.Router();
const { getInbox, getAnnouncements, sendMessage, markAsRead } = require("../controllers/communicationController");
const { verifyToken } = require("../middleware/authMiddleware");

router.use(verifyToken);

router.get("/inbox", getInbox);
router.get("/announcements", getAnnouncements);
router.post("/send", sendMessage);
router.put("/:id/read", markAsRead);

module.exports = router;
