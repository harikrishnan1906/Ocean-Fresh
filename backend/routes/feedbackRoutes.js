const express = require("express");

const routes = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  submitFeedback,
  submitReport,
} = require("../controllers/feedback/feedbackController");

routes.post("/submitFeedback", submitFeedback);

routes.post(`/submitReport`, protect, submitReport);

module.exports = routes;
