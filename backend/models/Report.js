const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportCategory: {
      type: String,
      enum: ["employee", "branch", "website", "other"],
      required: true,
    },

    reportTitle: {
      type: String,
      required: true,
      trim: true,
    },

    reportDescription: {
      type: String,
      required: true,
    },

    reportReference: {
      type: String,
      default: null,
    },

    reportPriority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

   
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Report", reportSchema);
