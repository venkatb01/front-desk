const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  updateRoomStatus,
  reportMaintenance,
  addRoom,
  getRoomStatus
} = require("../controllers/roomController.js");

const upload=require("../middlewares/multer.js");

router.get("/", getAllRooms);
router.post("/addRoom",upload.single('image'),addRoom);
router.get("/status/:roomId",getRoomStatus);
router.put("/status/:roomId", updateRoomStatus);
router.post("/:roomId/report-maintenance", reportMaintenance);


module.exports = router;


 
