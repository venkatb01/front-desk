const Room = require("../models/roomModel");


exports.createRequest = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { issue, description, reportedBy } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    room.maintenanceRequests.push({ issue, description, reportedBy });
    await room.save();

    res.json({ success: true, message: "Maintenance request submitted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit request" });
  }
};


exports.updateRequestStatus = async (req, res) => {
  try {
    const { roomId, requestId } = req.params;
    const { status, resolutionNotes } = req.body;

    const room = await Room.findById(roomId);
    const request = room.maintenanceRequests.id(requestId);

    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = status;
    if (status === 'resolved') {
      request.resolvedAt = new Date();
      request.resolutionNotes = resolutionNotes;
    }

    await room.save();
    res.json({ success: true, message: "Request updated." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update request" });
  }
};


exports.getRequests = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);

    res.json(room.maintenanceRequests);
  } catch (err) {
    res.status(500).json({ error: "Failed to get requests" });
  }
};
