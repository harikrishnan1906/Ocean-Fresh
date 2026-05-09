const express = require("express");
const routes = express.Router();
const {
  registerCustomer,
  forgotPassword,
  changePassword,
} = require("../controllers/auth/customerAuthController");

const {
  protect,
  checkAllExsitingUser,
} = require("../middleware/authMiddleware");
const { getMe } = require("../controllers/auth/authConroller");

const { loginUser } = require("../controllers/auth/authLoginController");

const { logoutUser } = require("../controllers/auth/authLogoutController");

routes.post("/register", checkAllExsitingUser, registerCustomer);
routes.post("/login", loginUser);
routes.post("/logout", logoutUser);
routes.get("/me", protect, getMe);

routes.get("/profile", protect, getMe);

routes.post(`/forgotPassword`, forgotPassword);
routes.put("/changePassword", protect, changePassword);
module.exports = routes;
