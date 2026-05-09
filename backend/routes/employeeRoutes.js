const express = require("express");

const routes = express.Router();

const {
  addEmployee,
  viewEmployees,
  getEmployee,
  editEmployee,
  deactivateEmployee,
  activateEmployee,
} = require("../controllers/employee/employeeController");

const { protect } = require("../middleware/authMiddleware");

const generateEmployeeId = require("../middleware/generateEmployeeId");

const generateQRCode = require("../middleware/generateQRcode");

const upload = require("../middleware/upload");

routes.post(
  "/addEmployee",
  protect,
  upload.single("employeeImage"),
  generateEmployeeId,
  generateQRCode,
  addEmployee,
);

routes.get("/viewEmployees", protect, viewEmployees);

routes.get(`/getEmployee/:id`, protect, getEmployee);

routes.put(
  `/editEmployee/:id`,
  protect,
  upload.single("employeeImage"),
  editEmployee,
);

routes.put(`/deactivateEmployee/:id`, protect, deactivateEmployee);

routes.put(`/activateEmployee/:id`, protect, activateEmployee);

module.exports = routes;
