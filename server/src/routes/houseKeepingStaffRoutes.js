const express = require("express");
const { addStaff, getAllStaff, updateTaskStatus, getPerformance } = require("../controllers/houseKeepingStaffController.js");
const verifyToken = require("../middlewares/verifyToken.js");
const router = express.Router();

//tasks are associated with room we assign task to staff by using taskid when we click on room=>tasks=>staff assign

router.post("/add",verifyToken,addStaff);
router.get("/",verifyToken,getAllStaff);
router.get("/performance/:staffId",verifyToken,getPerformance);

module.exports = router;
