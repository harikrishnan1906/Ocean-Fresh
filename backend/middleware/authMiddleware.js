const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const Branch = require("../models/Branch");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      //verify token
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { id: decode.id };

      next();
    } catch (err) {
      console.log(err);
      res.status(200).json({ message: "Not authorized , token failed" });
    }
  } else {
    res.status(200).json({ message: "Not authorized, no token" });
  }
};

const checkAllExsitingUser = async (req, res, next) => {
  try {
    //check in the admin model
    const userEmail = req.body.email;

    const exsitAdminEmail = await Admin.findOne({ email: userEmail });
    if (exsitAdminEmail) {
      return res.status(400).json({ message: "Already registered email" });
    }

    //check in the branch model
    const exsitBranchEmail = await Branch.findOne({ email: userEmail });
    if (exsitBranchEmail) {
      return res.status(400).json({ message: "Already registered email" });
    }

    //check in the customer model
    const exsitCustomerEmail = await Customer.findOne({ email: userEmail });

    if (exsitCustomerEmail)
      return res.status(400).json({ message: "Already registered email" });

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  protect,
  checkAllExsitingUser,
};
