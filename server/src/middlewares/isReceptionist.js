const jwt = require("jsonwebtoken");
const staffModel = require("../models/staffModel");

async function isReceptionist(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    const staff = await staffModel.findOne({ _id: req.userId });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    if (staff.role === "receptionist") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Not a receptionist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = isReceptionist;
