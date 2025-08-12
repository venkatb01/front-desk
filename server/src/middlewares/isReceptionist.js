const jwt = require("jsonwebtoken");
const staffModel = require("../models/staffModel");
require('dotenv').config()

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
    console.log(decoded)
    req.userId = decoded.userId;

    const staff = await staffModel.findOne({ _id: req.userId });
    console.log(staff)

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    if (staff.role === "receptionist" || staff.role === "admin") {
      req.user = staff; 
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admin or receptionist can perform this action.",
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

