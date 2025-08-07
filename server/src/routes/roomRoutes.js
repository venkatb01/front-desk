const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  updateRoomStatus,
  addHousekeepingTask,
  reportMaintenance
} = require("../controllers/roomController.js");


router.get("/", getAllRooms);

router.put("/status/:roomId", updateRoomStatus);

router.post("/housekeeping/:roomId", addHousekeepingTask);

router.post("/maintenance/:roomId", reportMaintenance);

module.exports = router;
