const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  updateRoomStatus,
  addHousekeepingTask,
  reportMaintenance,
  addRoom,
  getRoomStatus
} = require("../controllers/roomController.js");


router.get("/", getAllRooms);
router.post("/addRoom",addRoom);
router.get("/status/:roomId",getRoomStatus);
router.put("/status/:roomId", updateRoomStatus);
router.post("/:roomId/report-maintenance", reportMaintenance);



module.exports = router;
