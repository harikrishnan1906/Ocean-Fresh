const Employee = require("../models/Employee");
const Branch = require("../models/Branch");

const generateEmployeeId = async (req, res, next) => {
  try {
    const branchId = req.user.id;

    const branch = await Branch.findById(branchId);

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const code = branch.branchCode;
    const part = code.split("-");
    const prefix = part.join("");

    const lastEmployee = await Employee.findOne({ branchId }).sort({
      createdAt: -1,
    });

    let newEmployeeId;

    if (!lastEmployee) {
      newEmployeeId = `${prefix}-EMP-001`;
    } else {
      const number = parseInt(lastEmployee.employeeId.split("-")[2]);
      const nextNumber = number + 1;

      newEmployeeId = `${prefix}-EMP-` + String(nextNumber).padStart(3, "0");
    }

    req.employeeId = newEmployeeId;
    req.branchId = branchId;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in generating Employee ID" });
  }
};

module.exports = generateEmployeeId;
