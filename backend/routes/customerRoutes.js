const express = require("express");

const {
  editCustomer,
  viewBranches,
  addToFavorite,
  getFavoriteProducts,
  removeFromFavorite,
  getOrderDetails,
} = require("../controllers/customer/customerController");
const routes = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { viewProducts } = require("../controllers/customer/customerController");

const {
  placeOrder,
  getMyOrders,
  cancelMyOrder,
} = require("../controllers/order/orderController");
const {
  getDetailsForFeedback,
} = require("../controllers/feedback/feedbackController");
const Product = require("../models/Product");

routes.put("/editCustomer/:id", protect, editCustomer);

routes.get("/viewBranches", protect, viewBranches);

routes.get("/viewProducts/:id", protect, viewProducts);

routes.post("/addToFavorite/:id", protect, addToFavorite);

routes.put("/removeFromFavorite/:id", protect, removeFromFavorite);

routes.get("/getFavoriteProducts", protect, getFavoriteProducts);

routes.get("/getOrderDetails/:productId/:branchId", protect, getOrderDetails);

routes.post("/placeOrder", protect, placeOrder);

routes.get(`/getMyOrders`, protect, getMyOrders);

routes.get(
  `/getQRCodeDetails/:branchId/:employeeId`,
  protect,
  getDetailsForFeedback,
);

routes.put(`/cancelMyOrder/:orderId`, protect, cancelMyOrder);

module.exports = routes;
