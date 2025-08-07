const express = require("express");
const { addStaff, getAllStaff, updateTaskStatus, getPerformance } = require("../controllers/houseKeepingStaffController.js");
const router = express.Router();

router.post("/add", addStaff);
router.get("/", getAllStaff);
router.put("/task/:staffId/:taskId", updateTaskStatus);
router.get("/performance/:staffId", getPerformance);

module.exports = router;
