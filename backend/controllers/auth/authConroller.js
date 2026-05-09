const Customer = require("../../models/Customer");
const Admin = require("../../models/Admin");
const Branch = require("../../models/Branch");
const jwt = require("jsonwebtoken");

const getMe = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");

    if (customer) {
      return res.json({ ...customer._doc, type: "customer" });
    }

    const admin = await Admin.findById(req.user.id).select("-password");

    if (admin) {
      return res.json({ ...admin._doc, type: "admin" });
    }

    const branch = await Branch.findById(req.user.id).select("-password");

    if (branch) {
      return res.json({ ...branch._doc, type: "branch" });
    }

    res.status(404).json({ message: "user not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMe };
