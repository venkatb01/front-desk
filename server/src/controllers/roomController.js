const Room = require('../models/roomModel.js'); 
const HousekeepingStaff=require("../models/houseKeepingStaffModel.js")

exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, status, inventory } = req.body;
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ success: false, message: "Room number already exists" });
    }
    const newRoom = new Room({
      roomNumber,
      status,           
      inventory         
    });

    await newRoom.save();
    res.status(201).json({ success: true, message: "Room added successfully", data: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding room", error: error.message });
  }
};


exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      success:true,
      message:"Rooms retrieved successfully"
    });
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
};


exports.updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status } = req.body;

    const room = await Room.findByIdAndUpdate(roomId, { status }, { new: true });
    res.json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ success:false,message:error.message });
  }
};



exports.addHousekeepingTask= async (req, res) => {
  try {
    const { roomId } = req.params;
    const { task, assignedTo, scheduledDate, notes } = req.body;

    const room = await Room.findOne({ _id:roomId });
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });


    room.housekeepingTasks.push({
      task,
      assignedTo,
      scheduledDate,
      notes,
      status: 'Pending'
    });

    await room.save();

    if (assignedTo) {
      await HousekeepingStaff.findByIdAndUpdate(assignedTo, {
        $inc: { "performance.tasksPending": 1 }
      });
    }

    res.status(201).json({ success: true, message: "Task added and assigned", room });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



exports.reportMaintenance = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { issue, notes } = req.body;

    const room = await Room.findById(roomId);
    room.maintenanceRequests.push({ issue, reportedOn: new Date(), notes });
    room.status = "Maintenance";
    await room.save();

    res.json({ success: true, message: "Issue reported" });
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
};







// const Room = require('../models/Room');

// exports.createRoom = async (req, res) => {
//   try {
//     const room = new Room({ ...req.body, createdBy: req.user._id });
//     const saved = await room.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.getAllRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find().populate('roomType');
//     res.status(200).json(rooms);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getRoomById = async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.id).populate('roomType');
//     if (!room) return res.status(404).json({ message: 'Room not found' });
//     res.status(200).json(room);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateRoom = async (req, res) => {
//   try {
//     const updated = await Room.findByIdAndUpdate(req.params.id, { ...req.body, modifiedBy: req.user._id }, { new: true });
//     if (!updated) return res.status(404).json({ message: 'Room not found' });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.deleteRoom = async (req, res) => {
//   try {
//     const deleted = await Room.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Room not found' });
//     res.status(200).json({ message: 'Room deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.getRoomStatus=async (req,res)=>{
  try{
    const {roomId}=req.params;
    const room=await Room.findOne({_id:roomId});
    if(room && room.status){
      return res.status(200).json({
        success:true,
        status:room.status
      });
    }else{
      return res.status(400).json({
        success:false,
        message:"Room not found"
      })
    }
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}