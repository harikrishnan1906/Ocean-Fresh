const express = require("express");
const routes = express.Router();

const {
  registerBranch,
  getProductsForInventory,
  updateInventory,
  getBranchDetails,
  getBranchOrders,
} = require("../controllers/branch/branchController");
const {
  checkAllExsitingUser,
  protect,
} = require("../middleware/authMiddleware");
const generateBranchCode = require("../middleware/generateBranchCode");
const upload = require("../middleware/upload");
const { updateOrderStatus } = require("../controllers/order/orderController");
const {
  createShopOrder,
  getTodayShopOrders,
  getShopOrderHistory,
} = require("../controllers/order/shopOrderController");
const { route } = require("./employeeRoutes");
const { getBranchFeedback } = require("../controllers/feedback/feedbackController");

routes.post(
  "/register",
  upload.single("branchImage"),
  checkAllExsitingUser,
  generateBranchCode,
  registerBranch,
);

routes.get("/getInventory", protect, getProductsForInventory);

routes.post("/updateInventory", protect, updateInventory);

routes.get("/getBranchDetails", protect, getBranchDetails);

routes.get(`/getBranchOrders`, protect, getBranchOrders);

routes.put(`/updateOrderStatus/:id`, protect, updateOrderStatus);

routes.post(`/createShopOrder`, protect, createShopOrder);

routes.get(`/getTodayShopOrders`, protect, getTodayShopOrders);

routes.get(`/getShopOrderHistory`, protect, getShopOrderHistory);

routes.get("/getBranchFeedback", protect, getBranchFeedback);

module.exports = routes;
