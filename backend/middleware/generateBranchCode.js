const Branch = require("../models/Branch");

const generateBranchCode = async (req, res, next) => {
  try {
    const { branchName } = req.body;

    if (!branchName) {
      return res.status(400).json({ message: "Branch name is required" });
    }

    let prefix = branchName.substring(0, 3).toUpperCase();

    let branchCodeName;
    let exists = true;

    // keep generating until unique
    while (exists) {
      branchCodeName = prefix + "-BRH-" + Math.floor(Math.random() * 1000);

      exists = await Branch.findOne({
        branchCode: branchCodeName,
      });
    }

    req.branchCode = branchCodeName;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in creating Branch code" });
  }
};

module.exports = generateBranchCode;
