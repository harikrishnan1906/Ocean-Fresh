const mongoose = require("mongoose");
const Branch = require("./Branch");

const employeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    employeePhone: {
      type: String,
      required: true,
    },
    employeeAddress: {
      type: String,
      required: true,
    },
    employeeImage: {
      type: String,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Employee", employeeSchema);
