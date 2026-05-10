const jwt = require("jsonwebtoken");

const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.status(200).json({ message: "Logout Successful" });
};

module.exports = { logoutUser };
