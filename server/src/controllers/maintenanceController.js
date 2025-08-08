const Maintenance = require('../models/maintenanceModel');
const Room = require('../models/roomModel');

exports.createRequest = async (req, res) => {
  try {
    const { roomId } = req.params;
    const {
      facility,
      title,
      description,
      category,
      priority,
      reportedBy,
      estimatedCost,
      estimatedTime,
      materials,
      images,
      warrantyInfo
    } = req.body;

    const roomExists = await Room.findById(roomId);
    if (!roomExists) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const maintenanceRequest = new Maintenance({
      room: roomId,
      facility,
      title,
      description,
      category,
      priority,
      reportedBy,
      estimatedCost,
      estimatedTime,
      materials,
      images,
      warrantyInfo
    });

    await maintenanceRequest.save();
    res.status(201).json({ success: true, message: "Maintenance request created", data: maintenanceRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const updates = req.body;

    const updatedRequest = await Maintenance.findByIdAndUpdate(requestId, updates, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Maintenance request not found" });
    }

    res.status(200).json({ success: true, message: "Maintenance request updated", data: updatedRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const { roomId } = req.params;

    const requests = await Maintenance.find({ room: roomId })
      .populate('reportedBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email');

    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
