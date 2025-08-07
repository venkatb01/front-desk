const Room = require("../models/roomModel.js");


exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};


exports.updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status } = req.body;

    const room = await Room.findByIdAndUpdate(roomId, { status }, { new: true });
    res.json({ success: true, data: room });
  } catch (err) {
    res.status(500).json({ error: "Failed to update room status" });
  }
};


exports.addHousekeepingTask = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { task, assignedTo, scheduledDate } = req.body;

    const room = await Room.findById(roomId);
    room.housekeepingTasks.push({ task, assignedTo, scheduledDate });
    await room.save();

    res.json({ success: true, message: "Task added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add task" });
  }
};


exports.reportMaintenance = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { issue, notes } = req.body;

    const room = await Room.findById(roomId);
    room.maintenanceIssues.push({ issue, reportedOn: new Date(), notes });
    room.status = "maintenance";
    await room.save();

    res.json({ success: true, message: "Issue reported" });
  } catch (err) {
    res.status(500).json({ error: "Failed to report issue" });
  }
};
