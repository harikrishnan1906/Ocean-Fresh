const Employee = require("../../models/Employee");
const Branch = require("../../models/Branch");
const Feedback = require("../../models/Feedback");
const jwt = require("jsonwebtoken");
const Report = require("../../models/Report");

const getDetailsForFeedback = async (req, res) => {
  try {
    const { branchId, employeeId } = req.params;

    if (!branchId || !employeeId) {
      return res.status(400).json({ message: "Required IDs are missing" });
    }

    const branch = await Branch.findById(branchId).select(
      "-password -isActive",
    );

    const employee = await Employee.findOne({ employeeId }).select(
      "-qrCode -isActive -branchId",
    );

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Details for the feedback fetched successfully",
      branch,
      employee,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const submitFeedback = async (req, res) => {
  try {
    let customer = null;
    if (req.cookies.token) {
      try {
        const decode = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        customer = decode.id;
      } catch (err) {
        console.log(err);
        customer = null;
      }
    }

    const { name, email, rating, comment, branch, employee, feedbackType } =
      req.body;

    if (!name || !email || !rating || !comment || !feedbackType) {
      return res.status(400).json({ message: "All fields are required  " });
    }
    const feedBack = await Feedback.create({
      customer: customer,
      employee: req.body.employee || null,
      branch: req.body.branch || null,
      name: req.body.name,
      email: req.body.email,
      rating: req.body.rating,
      comment: req.body.comment,
      feedbackType: req.body.feedbackType,
    });

    res
      .status(200)
      .json({ message: "Feedback submitted successfully", feedBack });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const submitReport = async (req, res) => {
  try {
    const customer = req.user ? req.user.id : null;
    const {
      reportCategory,
      reportTitle,
      reportDescription,
      reportReference,
      reportPriority,
    } = req.body;

    const report = await Report.create({
      reportCategory,
      reportTitle,
      reportDescription,
      reportReference,
      reportReference,
    });

    res.status(200).json({ message: "Report submitted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getBranchFeedback = async (req, res) => {
  try {
    const branchId = req.user.id;

    const feedbacks = await Feedback.find({ branch: branchId })
      .populate("employee", "employeeName employeeId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Feedback fetched successfully",
      data: feedbacks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDetailsForFeedback,
  submitFeedback,
  submitReport,
  getBranchFeedback,
};
