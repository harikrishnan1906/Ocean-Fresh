const Order = require("../../models/Order");
const Customer = require("../../models/Customer");
const Branch = require("../../models/Branch");
const Inventory = require("../../models/Inventory");
const Product = require("../../models/Product");
const sendOrderMailStatus = require("../../utils/sendOrderStatusMail");

const placeOrder = async (req, res) => {
  try {
    const customerId = req.user.id;

    const {
      branchId,
      productId,
      quantity,
      paymentMethod,
      orderType,
      customerLat,
      customerLng,
    } = req.body;

    if (!branchId || !productId || !quantity || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const branch = await Branch.findById(branchId);
    const product = await Product.findById(productId);

    if (!branch || !product) {
      return res.status(404).json({ message: "Branch or Product not found" });
    }

    let distance = 0;

    if (orderType === "delivery") {
      const lat1 = Number(branch.branchLat);
      const lng1 = Number(branch.branchLng);
      const lat2 = Number(customerLat);
      const lng2 = Number(customerLng);

      if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
        return res.status(400).json({
          message: "Invalid location data",
        });
      }

      distance = getDistance(lat1, lng1, lat2, lng2);
    }

    const totalAmount = product.productPrice * quantity;

    const order = await Order.create({
      customerId,
      branchId,
      productId,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity,
      totalAmount,
      paymentMethod,
      orderType,
      distance,
      orderStatus: "placed",
      paymentStatus: paymentMethod === "online" ? "paid" : "pending",
    });

    await Inventory.findOneAndUpdate(
      { branchId, productId },
      { $inc: { quantity: -quantity } },
    );

    res.status(201).json({
      message: "Order placed successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const customerId = req.user.id;

    const orders = await Order.find({ customerId })
      .populate("customerId", "name email")
      .populate("branchId", "branchName ")
      .populate(
        "productId",
        "productImage productName productDescription productCategory fishType",
      );

    if (!orders) {
      return res.status(200).json({ message: "No products ordered yet" });
    }

    res.status(200).json({
      message: "My orders details fetched successfully",
      data: orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const cancelMyOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus === "delivered") {
      return res
        .status(400)
        .json({ message: "Cannot cancel the delivered order" });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({ message: "Order already cancelled" });
    }

    order.orderStatus = "cancelled";
    order.paymentStatus = "failed";
    await order.save();

    await Inventory.findOneAndUpdate(
      { branchId: order.branchId, productId: order.productId },
      { $inc: { quantity: order.quantity } },
    );

    res.status(200).json({
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;

    if (status === "delivered" && order.paymentMethod === "cod") {
      order.paymentStatus = "paid";
    }

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      data: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  placeOrder,
  getMyOrders,
  cancelMyOrder,
  updateOrderStatus,
};
