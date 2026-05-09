const Customer = require("../../models/Customer");
const Branch = require("../../models/Branch");
const Inventory = require("../../models/Inventory");
const Product = require("../../models/Product");
const Favorite = require("../../models/Favorite");

const editCustomer = async (req, res) => {
  try {
    const id = req.user.id;

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Email validation
    if (req.body.email) {
      const existingEmail = await Customer.findOne({ email: req.body.email });
      if (existingEmail && existingEmail._id.toString() !== id) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      {
        name: req.body.name || customer.name,
        email: req.body.email || customer.email,
        phone: req.body.phone || customer.phone,
        city: req.body.city || customer.city,
        address: req.body.address || customer.address,
        pincode: req.body.pincode || customer.pincode,
      },
      { new: true },
    );

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedCustomer,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const viewBranches = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id);
    const city = customer.city;
    const branches = await Branch.find();
    res
      .status(200)
      .json({ message: "Branches Details got Successfully", data: branches });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const viewProducts = async (req, res) => {
  try {
    const id = req.params.id;

    const inventory = await Inventory.find({ branchId: id }).populate(
      "productId",
    );
    if (!inventory) {
      res
        .status(404)
        .json({ message: "No inventory products available for this branch" });
    }

    const result = inventory.map((item) => ({
      id: item._id,
      productId: item.productId._id,
      productName: item.productId.productName,
      productImage: item.productId.productImage,
      productPrice: item.productId.productPrice,
      productDescription: item.productId.productDescription,
      productCategory: item.productId.productCategory,
      fishType: item.productId.fishType,
      productUnit: item.productId.productUnit,
      quantity: item.quantity,
    }));
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const addToFavorite = async (req, res) => {
  try {
    const productId = req.params.id;

    const customerId = req.user.id;

    let favorite = await Favorite.findOne({ customerId });

    if (!favorite) {
      favorite = new Favorite({
        customerId,
        products: [{ productId }],
      });
    } else {
      const exist = favorite.products.find(
        (item) => item.productId.toString() === productId,
      );

      if (exist) {
        return res
          .status(200)
          .json({ message: "Prodcut already added to the Favorites" });
      } else {
        favorite.products.push({ productId });
      }
    }

    await favorite.save();

    res.status(200).json({
      message: "Product Added to the Favorites successfully",
      favorite,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeFromFavorite = async (req, res) => {
  try {
    const productId = req.params.id;

    const customerId = req.user.id;

    await Favorite.updateOne(
      { customerId },
      {
        $pull: {
          products: {
            productId: productId,
          },
        },
      },
    );

    res
      .status(200)
      .json({ message: "The product is removed from the favorite" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getFavoriteProducts = async (req, res) => {
  try {
    const id = req.user.id;

    const favorite = await Favorite.findOne({ customerId: id }).populate(
      "products",
    );

    if (!favorite) {
      return res
        .status(200)
        .json({ message: "No products in the favorite list" });
    }

    const productIds = favorite.products.map((item) => item.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    res.status(200).json({
      message: "Favorite products fetched successfully",
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    const branchId = req.params.branchId;
    const customerId = req.user.id;

    const product = await Product.findById(productId);
    const customer = await Customer.findById(customerId);
    const branch = await Branch.findById(branchId).select('-branchCode -password -isActive');

    if (!customer) {
      return res.status(404).json({ message: "Customer details not found" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product Not Found in DB" });
    }

    if (!branch) {
      return res.status(404).json({ message: "Branch NOt Found in the DB" });
    }

    res.status(200).json({
      message: "The order product details are fetched successfully",
      branch,
      product,
      customer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  editCustomer,
  viewBranches,
  viewProducts,
  addToFavorite,
  removeFromFavorite,
  getFavoriteProducts,
  getOrderDetails,
};
