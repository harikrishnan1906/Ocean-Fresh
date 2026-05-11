const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.includes("vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_CONNECT_STRING)
  .then(() => console.log("Mongo DB connected successfully...!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5069;
app.listen(port, () =>
  console.log(`Server is running in the port http://localhost:${port}`),
);

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/branch", require("./routes/branchRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/uploads", express.static("uploads"));
