const Branch = require("../../models/Branch");
const Product = require("../../models/Product");
const generateToken = require("../../utils/generateToken");
const hashedPassword = require("../../utils/hashPassword");
const bcryptjs = require("bcryptjs");
const Inventory = require("../../models/Inventory");
const Order = require("../../models/Order");

const registerBranch = async (req, res) => {
  try {
    const {
      branchName,
      branchPhone,
      branchAddress,
      branchPincode,
      branchCity,
      branchArea,
      email,
      password,
      branchLat,
      branchLng,
    } = req.body;

    const existingBranch = await Branch.findOne({ email });

    if (existingBranch) {
      return res
        .status(400)
        .json({ message: "This email is already used for another branch" });
    }

    const hashPassword = await hashedPassword(password);

    const branch = await Branch.create({
      branchCode: req.branchCode,
      branchName,
      branchPhone,
      branchAddress,
      branchPincode,
      branchCity,
      branchArea,
      email,
      password: hashPassword,
      branchLat,
      branchLng,
      branchImage: req.file ? req.file.path : "",
    });

    res.status(200).json({
      message: `The new branch ${branchName} is created successfully..!`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error", error: err.message });
  }
};

const getBranchDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const branch = await Branch.findById(id).select("-password");

    if (!branch) {
      return res.status(404).json({ message: "Branch Not Found" });
    }

    res
      .status(200)
      .json({ message: "Branch Details Fetched Successfully", data: branch });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductsForInventory = async (req, res) => {
  try {
    const branchId = req.user.id;

    const products = await Product.find({ isDeleted: false });
    const inventory = await Inventory.find({ branchId });

    const inventoryMap = {};

    inventory.forEach((item) => {
      inventoryMap[item.productId.toString()] = item.quantity;
    });

    const result = products.map((product) => ({
      ...product._doc,
      quantity: inventoryMap[product._id.toString()] || 0,
    }));

    res
      .status(200)
      .json({ message: "Inventory products got succesfully", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateInventory = async (req, res) => {
  try {
    const branchId = req.user.id;

    const { productId, action, quantity } = req.body;

    let inventory = await Inventory.findOne({ branchId, productId });

    if (!inventory) {
      inventory = await Inventory.create({
        branchId,
        productId,
        quantity: action === "add" ? quantity : 0,
      });
    } else {
      if (action === "add") {
        inventory.quantity += quantity;
      } else if (action === "subract") {
        inventory.quantity = Math.max(0, inventory.quantity - quantity);

        inventory.isAvailable = inventory.quantity > 0;
      }

      await inventory.save();
    }

    res.status(200).json(inventory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getBranchOrders = async (req, res) => {
  try {
    const id = req.user.id;

    const order = await Order.find({ branchId: id })
      .populate("customerId", "name email phone")
      .populate(
        "productId",
        "productName productImage productCategory fishType productPrice ",
      );

    if (!order) {
      return res.status(200).json({ message: "No orders found" });
    }

    res
      .status(200)
      .json({ message: "Branch orders fetched successfully", data: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerBranch,
  getBranchDetails,
  getProductsForInventory,
  updateInventory,
  getBranchOrders,
};
