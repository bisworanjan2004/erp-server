const Registration = require("../models/Registration");

exports.getRegistrations = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;

    const registrations = await Registration.find(query).sort({ registeredAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: "Registration not found" });
    res.json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createRegistration = async (req, res) => {
  try {
    const { studentName, fatherName, dob, className, section, contactNumber, address } = req.body;
    const documentUrl = req.file ? req.file.path : null;

    const newRegistration = await Registration.create({
      studentName,
      fatherName,
      dob,
      class: className,
      section,
      contactNumber,
      address,
      documentUrl,
    });
    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.approveRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json({ message: "Registration not found" });

    // Generate roll number: ROLL2024-001
    const count = await Registration.countDocuments({ status: "Approved" });
    const rollNumber = `ROLL${new Date().getFullYear()}-${(count + 1).toString().padStart(3, "0")}`;

    registration.status = "Approved";
    registration.rollNumber = rollNumber;
    await registration.save();

    res.json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.rejectRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    res.json(registration);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) return res.status(404).json({ message: "Registration not found" });
    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
