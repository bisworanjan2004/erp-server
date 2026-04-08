const express = require("express");
const router = express.Router();
const { getRegistrations, getRegistrationById, createRegistration, approveRegistration, rejectRegistration, deleteRegistration } = require("../controllers/registrationController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const { upload } = require("../config/cloudinary");

router.use(verifyToken);

router.get("/", getRegistrations);
router.get("/:id", getRegistrationById);
router.post("/", upload.single("document"), createRegistration);
router.put("/:id/approve", checkRole(["Admin"]), approveRegistration);
router.put("/:id/reject", checkRole(["Admin"]), rejectRegistration);
router.delete("/:id", checkRole(["Admin"]), deleteRegistration);

module.exports = router;
