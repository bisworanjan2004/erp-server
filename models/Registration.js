const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: Date, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  documentUrl: { type: String }, // Cloudinary URL
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  rollNumber: { type: String }, // Generated on approval
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Registration", registrationSchema);
