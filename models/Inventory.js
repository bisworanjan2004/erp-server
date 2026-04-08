const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ["Furniture", "Electronics", "Stationery", "Other"], required: true },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String, required: true }, // pcs, kg, litre
  lowStockThreshold: { type: Number, default: 5 },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", inventorySchema);
