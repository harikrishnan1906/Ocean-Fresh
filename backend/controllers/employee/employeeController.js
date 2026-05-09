const Employee = require("../../models/Employee");
const fs = require("fs");

const addEmployee = async (req, res) => {
  try {
    const { employeeName, employeePhone, employeeAddress } = req.body;

    const employee = await Employee.create({
      employeeName,
      employeeId: req.employeeId,
      employeePhone,
      employeeAddress,
      branchId: req.branchId,
      qrCode: req.qrCode,
      employeeImage: req.file ? req.file.path : "",
    });

    res
      .status(200)
      .json({ message: "Employee created successfully", employee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const viewEmployees = async (req, res) => {
  try {

    const branchId = req.user.id;
    const employee = await Employee.find({branchId});
    res.status(200).json({ employee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    res.status(200).json({ employee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const existingEmployee = await Employee.findById(id);

    if (!existingEmployee) {
      return res.status(404).json({ message: "Emmployee Not Found" });
    }

    const updatedData = {
      employeeName: req.body.employeeName || existingEmployee.employeeName,

      employeeAddress:
        req.body.employeeAddress || existingEmployee.employeeAddress,

      employeePhone: req.body.employeePhone || existingEmployee.employeePhone,
    };

    if (req.file) {
      if (
        existingEmployee.employeeImage &&
        fs.existsSync(existingEmployee.employeeImage)
      ) {
        fs.unlinkSync(existingEmployee.employeeImage);
      }
      updatedData.employeeImage = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      message: "The Employee Details Updated Successfully",
      data: updatedEmployee,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const deactivateEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    res
      .status(200)
      .json({ message: "The employee is deactivated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const activateEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true },
    );

    res.status(200).json({ message: "The employee activated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addEmployee,
  viewEmployees,
  getEmployee,
  editEmployee,
  deactivateEmployee,
  activateEmployee,
};
