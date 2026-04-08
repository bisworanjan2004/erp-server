const express = require("express");
const router = express.Router();
const { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket } = require("../controllers/supportController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

router.use(verifyToken);

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", checkRole(["Admin"]), deleteTicket);

module.exports = router;
