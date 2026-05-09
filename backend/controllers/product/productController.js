const Product = require("../../models/Product");
const fs = require("fs");

const addProduct = async (req, res) => {
  try {
    const { productName } = req.body;

    const normalizedName = productName.toLowerCase().replace(/\s+/g, "");

    const existingProduct = await Product.findOne({
      normalizedProductName: normalizedName,
    });

    if (existingProduct) {
      // ❗ delete uploaded image
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(200).json({
        message: `The product ${productName} is already added to the database`,
      });
    }

    const product = await Product.create({
      productId : req.productId,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productCategory: req.body.productCategory,
      fishType: req.body.fishType,
      productPrice: req.body.productPrice,
      productUnit: req.body.productUnit,

      //image
      productImage: req.file ? req.file.path : null,
    });

    res.status(200).json({
      message: `The product ${productName} is successfully added to the database`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

const viewProduct = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).select(
      "-normalizedProductName",
    );
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const { productName } = req.body;

    const updatedData = {
      productId : req.body.productId || existingProduct.productId,
      productName: req.body.productName || existingProduct.productName,
      productDescription:
        req.body.productDescription || existingProduct.productDescription,
      productCategory:
        req.body.productCategory || existingProduct.productCategory,
      fishType: req.body.fishType || existingProduct.fishType,
      productPrice: req.body.productPrice || existingProduct.productPrice,
      productUnit: req.body.productUnit || existingProduct.productUnit,
    };

    if (req.file) {
      if (
        existingProduct.productImage &&
        fs.existsSync(existingProduct.productImage)
      ) {
        fs.unlinkSync(existingProduct.productImage);
      }
      updatedData.productImage = req.file.path;
    }

    if (productName) {
      const normalizedName = productName.toLowerCase().replace(/\s+/g, "");

      const existingProductWithSameName = await Product.findOne({
        normalizedProductName: normalizedName,
        _id: { $ne: id },
      });

      if (existingProductWithSameName) {
        return res.status(400).json({ message: "Product Name already exist" });
      }

      updatedData.normalizedProductName = normalizedName;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: `The Product ${productName} updated successfully`,
      data: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Product Moved to the Deleted List" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

const getDeletedProduct = async (req, res) => {
  try {
    const deletedProducts = await Product.find({ isDeleted: true });

    if (!deletedProducts) {
      return res.status(404).json({ message: "deleted product not found" });
    }

    res.status(200).json(deletedProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

const restoreProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndUpdate(id, { isDeleted: false });

    res.status(200).json({ message: "Product restored successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  addProduct,
  viewProduct,
  getProductById,
  editProduct,
  deleteProduct,
  getDeletedProduct,
  restoreProduct,
};
