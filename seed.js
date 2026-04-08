require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Inventory = require("./models/Inventory");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Inventory.deleteMany({});

    // Create Admin
    const admin = await User.create({
      name: "Admin User",
      email: "admin@school.com",
      password: "password123", // Will be hashed by pre-save hook
      role: "Admin"
    });
    console.log("✅ Admin user created: admin@school.com / password123");

    // Create Sample Inventory
    await Inventory.insertMany([
      { name: "Executive Desk", category: "Furniture", quantity: 15, unit: "pcs", lowStockThreshold: 5 },
      { name: "Projector EPSON", category: "Electronics", quantity: 4, unit: "pcs", lowStockThreshold: 5 },
      { name: "A4 Paper Reams", category: "Stationery", quantity: 50, unit: "kg", lowStockThreshold: 20 },
      { name: "Whiteboard Markers", category: "Stationery", quantity: 3, unit: "pcs", lowStockThreshold: 10 },
    ]);
    console.log("✅ Sample inventory created");

    console.log("🌱 Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
