const express = require("express");
const router = express.Router();
const {
  createRequest,
  updateRequestStatus,
  getRequests
} = require("../controllers/maintenanceController.js");


router.post("/:roomId", createRequest);
router.put("/:roomId/:requestId", updateRequestStatus);
router.get("/:roomId", getRequests);

module.exports = router;
