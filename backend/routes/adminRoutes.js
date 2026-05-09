const express = require("express");
const {
  getDashboardStats,
  getAllBranches,
  updateBranch,
  deactivateBranch,
  activateBranch,
  getAllEmployees,
  getAllUsers,
  getAllReports,
  getAllFeedback,
  getOnlineOrders,
  getShopOrders,
} = require("../controllers/auth/adminController");
const { protect } = require("../middleware/authMiddleware");
const { model } = require("mongoose");
const upload = require("../middleware/upload");

const routes = express.Router();

routes.get("/dashboardStats", protect, getDashboardStats);

routes.get("/getAllBranches", protect, getAllBranches);

routes.put("/updateBranch/:id", protect,  upload.single("branchImage"), updateBranch);

routes.put("/deactivateBranch/:id", protect, deactivateBranch);

routes.put("/activateBranch/:id", protect, activateBranch);

routes.get("/getAllEmployees", protect, getAllEmployees);

routes.get("/getAllUsers", protect, getAllUsers);

routes.get("/getAllReports", protect, getAllReports);

routes.get("/getAllFeedback", protect, getAllFeedback);

routes.get("/getOnlineOrders", protect, getOnlineOrders);

routes.get("/getShopOrders", protect, getShopOrders);

module.exports = routes;
