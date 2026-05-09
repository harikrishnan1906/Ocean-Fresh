const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    require: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  normalizedProductName: {
    type: String,
  },
  productImage: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
    enum: ["Premium", "Regular"],
  },
  fishType: {
    type: String,
    required: true,
    enum: ["Sea", "FreshWater"],
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productUnit: {
    type: String,
    default: "kg",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

ProductSchema.pre("save", function () {
  this.normalizedProductName = this.productName
    .toLowerCase()
    .replace(/\s+/g, "");
});

module.exports = mongoose.model("Product", ProductSchema);
