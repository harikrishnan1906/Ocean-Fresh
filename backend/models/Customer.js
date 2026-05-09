const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    city: {
      type: String,
    },

    address: {
      type: String,
    },

    pincode: {
      type: String,
    },
    customerLat: {
      type: String,
      require: true,
    },
    customerLng: {
      type: String,
      require: true,
    },
    mustChangePassword: {
      type: Boolean,
      default: false,
    },
    tempPasswordExpire: Date,
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Customer", customerSchema);
