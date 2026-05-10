const Customer = require("../../models/Customer");
const generateToken = require("../../utils/generateToken");
const hashPassword = require("../../utils/hashPassword");
const bcryptjs = require("bcryptjs");
const Inventory = require("../../models/Inventory");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");

const registerCustomer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      city,
      address,
      pincode,
      customerLat,
      customerLng,
    } = req.body;

    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      city,
      address,
      pincode,
      customerLat,
      customerLng,
    });

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const matchPassword = await bcryptjs.compare(password, customer.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = generateToken(customer._id);

    //set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Customer Login Successful",
      token,
      role: "customer",
      userID: customer._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await Customer.findOne({ email });

  if (!user) {
    return res.status(200).json({
      message: "If the email exists, a password has been sent",
    });
  }

  const tempPassword = Math.random().toString(36).slice(-8);

  user.password = await hashPassword(tempPassword);
  user.mustChangePassword = true;
  user.tempPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  const message = `
Your temporary password is: ${tempPassword}

Please login and change your password immediately.
This password will expire in 10 minutes.
`;

  await sendEmail(user.email, "OceanFresh Password Reset", message);

  res.status(200).json({
    message: "Temporary password sent to your email",
  });
};

const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = await Customer.findById(userId);

  user.password = await hashPassword(newPassword);
  user.mustChangePassword = false;
  user.tempPasswordExpire = null;

  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};

module.exports = {
  registerCustomer,
  loginCustomer,
  forgotPassword,
  changePassword,
};
