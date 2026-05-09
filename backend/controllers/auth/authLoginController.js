const Admin = require("../../models/Admin");
const Customer = require("../../models/Customer");
const Branch = require("../../models/Branch");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../../utils/generateToken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin) {
      const matchPassword = await bcryptjs.compare(password, admin.password);

      if (!matchPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = generateToken(admin._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Admin login successful",
        token,
        role: "admin",
        userID: admin._id,
      });
    }

    const customer = await Customer.findOne({ email });

    if (customer) {
      const matchPassword = await bcryptjs.compare(password, customer.password);

      if (!matchPassword) {
        return res.status(401).json({ message: "Invalid Password" });
      }

      if (
        customer.mustChangePassword &&
        customer.tempPasswordExpire < Date.now()
      ) {
        return res.status(400).json({
          message: "Temporary password expired. Request again.",
        });
      }

      const token = generateToken(customer._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });

      if (customer.mustChangePassword) {
        return res.status(200).json({
          message: "Login with temporary password",
          role: "customer",
          userID: customer._id,
          mustChangePassword: true,
          token,
        });
      }

      return res.status(200).json({
        message: "Customer login successful",
        token,
        role: "customer",
        userID: customer._id,
      });
    }

    const branch = await Branch.findOne({ email });

    if (branch) {
      const matchPassword = await bcryptjs.compare(password, branch.password);

      if (!matchPassword) {
        return res.status(401).json({ message: "Invalid Password" });
      }

      const token = generateToken(branch._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "Branch login successful",
        token,
        role: "branch",
        userID: branch._id,
      });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginUser };
