const Admin = require("../../models/Admin");
const generateToken = require("../../utils/generateToken");
const bcryptjs = require("bcryptjs");
const Branch = require("../../models/Branch");
const Employee = require("../../models/Employee");
const Order = require("../../models/Order");
const ShopOrder = require("../../models/ShopOrder");
const Customer = require("../../models/Customer");
const Report = require("../../models/Report");
const Feedback = require("../../models/Feedback");




const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const matchPassword = await bcryptjs.compare(password, admin.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    //generate token
    const token = generateToken(admin._id);

    //set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "protuction",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin login successful",
      token,
      roke: "admin",
      userID: admin._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // counts
    const totalBranches = await Branch.countDocuments();
    const totalEmployees = await Employee.countDocuments();
    const totalOrders = await Order.countDocuments();

    // revenue (online orders)
    const onlineRevenueData = await Order.aggregate([
      { $match: { orderStatus: "delivered" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // revenue (shop orders)
    const shopRevenueData = await ShopOrder.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const onlineRevenue = onlineRevenueData[0]?.total || 0;
    const shopRevenue = shopRevenueData[0]?.total || 0;

    const totalRevenue = onlineRevenue + shopRevenue;

    res.status(200).json({
      totalBranches,
      totalEmployees,
      totalOrders,
      totalRevenue,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Branches fetched successfully",
      data: branches,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateBranch = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.branchImage = req.file.path;
    }

    const updatedBranch = await Branch.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "Branch updated successfully",
      data: updatedBranch,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deactivateBranch = async (req, res) => {
  try {
    const id = req.params.id;

    await Branch.findByIdAndUpdate(id, { isActive: false });

    res.status(200).json({
      message: "Branch deactivated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const activateBranch = async (req, res) => {
  try {
    const id = req.params.id;

    await Branch.findByIdAndUpdate(id, { isActive: true });

    res.status(200).json({
      message: "Branch activated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};


const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("branchId", "branchName branchCity")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await Customer.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};


const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("employee", "employeeName")
      .populate("branch", "branchName")
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


const getOnlineOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "name phone")
      .populate("branchId", "branchName")
      .populate("productId", "productName productImage");

    res.status(200).json({ data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};



const getShopOrders = async (req, res) => {
  try {
    const shopOrders = await ShopOrder.find()
      .populate("branchId", "branchName")
      .populate("createdBy", "employeeName")
      .populate("items.productId", "productName productImage");

    res.status(200).json({ data: shopOrders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};




module.exports = {
  adminLogin,
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
};
