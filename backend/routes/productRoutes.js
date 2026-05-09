const express = require("express");
const routes = express.Router();

const {
  addProduct,
  viewProduct,
  getProductById,
  editProduct,
  deleteProduct,
  getDeletedProduct,
  restoreProduct,
} = require("../controllers/product/productController");
const upload = require("../middleware/upload");
const { generateProductCode } = require("../middleware/generateProductCode");

routes.post(
  "/addProduct",
  upload.single("productImage"),
  generateProductCode,
  addProduct,
);

routes.get("/viewProduct", viewProduct);

routes.get("/getProduct/:id", getProductById);

routes.put("/editProduct/:id", upload.single("productImage"), editProduct);

routes.delete("/deleteProduct/:id", deleteProduct);

routes.get("/viewDeletedProduct", getDeletedProduct);

routes.put(`/restoreProduct/:id`, restoreProduct);

module.exports = routes;
