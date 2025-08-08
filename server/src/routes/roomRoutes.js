const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  updateRoomStatus,
  addHousekeepingTask,
  reportMaintenance,
  addRoom
} = require("../controllers/roomController.js");


router.get("/", getAllRooms);

router.post("/addRoom",addRoom);
router.put("/status/:roomId", updateRoomStatus);

router.post("/housekeeping/:roomId", addHousekeepingTask);

router.post("/:roomId/report-maintenance", reportMaintenance);

module.exports = router;
