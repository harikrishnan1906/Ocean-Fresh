const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

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

    productName: String,
    productPrice: Number,

    quantity: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    orderType: {
      type: String,
      enum: ["delivery", "takeaway"],
      required: true,
    },

    customerLat: Number,
    customerLng: Number,

    branchLat: Number,
    branchLng: Number,

    distance: Number,

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "ready_for_takeaway",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },

    address: String,
    city: String,
    pincode: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
