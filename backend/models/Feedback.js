const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: false,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: false,
    },

    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    feedbackType: {
      type: String,
      enum: ["QR", "WEBSITE"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Feedback", feedBackSchema);
