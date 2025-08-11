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


 


// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/roomController');
// const { authenticate, authorizeStaff } = require('../middleware/auth');

// router.use(authenticate);
// router.post('/', authorizeStaff, controller.createRoom);
// router.get('/', controller.getAllRooms);
// router.get('/:id', controller.getRoomById);
// router.put('/:id', authorizeStaff, controller.updateRoom);
// router.delete('/:id', authorizeStaff, controller.deleteRoom);

// module.exports = router;
