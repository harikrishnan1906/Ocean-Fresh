const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

module.exports = mongoose.model("Favorite", favoriteSchema);
