const Product = require("../models/Product");

const generateProductCode = async (req, res, next) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({ message: "Product Name is Required" });
    }

    let productId;
    let exists = true;

    while (exists) {
      productId =
        "OCE-" +
        productName.toUpperCase().replace(/\s+/g, "") +
        "-" +
        Math.floor(Math.random() * 1000);

      const existing = await Product.findOne({ productId });

      if (!existing) {
        exists = false;
      }
    }

    req.productId = productId;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  generateProductCode,
};
