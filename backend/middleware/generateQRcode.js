const QRCode = require("qrcode");
const Employee = require("../models/Employee");

const generateQRCode = async (req, res, next) => {
  try {
    const baseURL = "http://localhost:5173";

    //passing json to the QR
    // const qrData = JSON.stringify({
    //   employeeId: req.employeeId,
    //   branchId: req.branchId,
    //   name: req.body.employeeName,
    // });

    //passing the URL to the QR
    const qrData = `${baseURL}/customerQRCodeFeedback?employeeId=${req.employeeId}/&branchId=${req.branchId}&name=${req.body.employeeName}`;

    const qrCodeImage = await QRCode.toDataURL(qrData);

    req.qrCode = qrCodeImage;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = generateQRCode;
