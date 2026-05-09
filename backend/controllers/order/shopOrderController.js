const Order = require("../../models/Order");
const Customer = require("../../models/Customer");
const Branch = require("../../models/Branch");
const Inventory = require("../../models/Inventory");
const Product = require("../../models/Product");
const ShopOrder = require("../../models/ShopOrder");

const createShopOrder = async (req, res) => {
  try {
    const branchId = req.user.id;

    const { items, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await ShopOrder.create({
      branchId,
      items,
      totalAmount,
      paymentMethod,
    });

    for (let item of items) {
      await Inventory.findOneAndUpdate(
        { branchId, productId: item.productId },
        { $inc: { quantity: -item.quantity } },
      );
    }

    res.status(200).json({
      message: "Shop order created successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTodayShopOrders = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getShopOrderHistory = async (req, res) => {
  try {
    const id = req.user.id;

    const shopOrder = await ShopOrder.find({ branchId: id }).sort({
      createdAt: -1,
    });

    if (shopOrder.length === 0) {
      res.status(400).json({ message: "There is no shop order history" });
    }

    res.status(200).json({
      message: "Shop order hostory fetched successfully",
      data: shopOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createShopOrder,
  getTodayShopOrders,
  getShopOrderHistory,
};
