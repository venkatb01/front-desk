const express = require("express");
const { addStaff, getAllStaff,getPerformance } = require("../controllers/houseKeepingStaffController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.Router();
const transporter=require("../utils/nodemailer.js")


router.post("/add",verifyToken,addStaff);
router.get("/",verifyToken,getAllStaff);
router.get("/performance/:staffId",verifyToken,getPerformance);

module.exports = router;
