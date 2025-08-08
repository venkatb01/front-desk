const express = require("express");
const { addStaff, getAllStaff, updateTaskStatus, getPerformance } = require("../controllers/houseKeepingStaffController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.Router();

router.post("/add",verifyToken,addStaff);
router.get("/",verifyToken,getAllStaff);
router.put("/task/:staffId/:taskId",verifyToken,updateTaskStatus);
router.get("/performance/:staffId",verifyToken,getPerformance);

module.exports = router;
