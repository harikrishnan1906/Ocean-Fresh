const mongoose =require("mongoose");

const shopOrderSchema = new mongoose.Schema(
  {
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productName: String,
        price: Number,
        quantity: Number,
        total: Number,
      },
    ],

    totalAmount: Number,

    paymentMethod: {
      type: String,
      enum: ["cash", "upi"],
      default: "cash",
    },

    customerName: {
      type: String,
      default: "Walk-in Customer",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // who billed
    },
  },
  { timestamps: true },
);


module.exports = mongoose.model("ShopOrder", shopOrderSchema);