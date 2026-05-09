const mongoose = require("mongoose");
const hashPassword = require("../utils/hashPassword");

const BranchSchema = new mongoose.Schema(
  {
    branchCode: {
      type: String,
      unique: true,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    branchPhone: {
      type: String,
      required: true,
    },
    branchAddress: {
      type: String,
      required: true,
    },
    branchPincode: {
      type: String,
      required: true,
    },
    branchCity: {
      type: String,
      require: true,
    },
    branchArea: {
      type: String,
      require: true,
    },
    branchImage: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    branchLat: {
      type: String,
      require: true,
    },
    branchLng: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Branch", BranchSchema);
