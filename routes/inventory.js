const express = require("express");
const router = express.Router();
const { getAllItems, addItem, updateItem, deleteItem } = require("../controllers/inventoryController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

router.use(verifyToken);

router.get("/", getAllItems);
router.post("/", checkRole(["Admin"]), addItem);
router.put("/:id", checkRole(["Admin"]), updateItem);
router.delete("/:id", checkRole(["Admin"]), deleteItem);

module.exports = router;
