const mongoose = require("mongoose");
const Product = require("./Product");

const inventorySchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true },
);

inventorySchema.index({ branchId: 1, productId: 1 }, { unique: true });
module.exports = mongoose.model("Inventory", inventorySchema);
