const Room = require('../models/roomModel.js'); 
const HousekeepingStaff=require("../models/houseKeepingStaffModel.js")
const imagekit=require("../utils/imagekit");
const fs=require("fs");
exports.addRoom = async (req, res) => {
  try {
    const { roomNumber, status, inventory,category,bedConfigurations,capacity} = req.body;
    const existingRoom = await Room.findOne({ roomNumber });
    const imageFile=req.file;
    console.log(imageFile+"imagefile")
    if(!roomNumber || !status || !inventory){
       return res.status(400).json({
        success:false,
        message:"Missing required fields"
       })
    }
    if (existingRoom) {
      return res.status(400).json({ success: false, message: "Room number already exists" });
    }
    const fileBuffer=fs.readFileSync(imageFile.path);
        const response=await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/Rooms"
        });
        const optimizedImageUrl=imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:'auto'},
                {format:'webp'},
                {width:'600'},
            ]
        });
    const image=optimizedImageUrl;
    const newRoom = new Room({
      roomNumber,
      status,           
      inventory,
      image,
      category,
      bedConfigurations,
      capacity     
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
      message:"Rooms retrieved successfully",
      rooms
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



exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('roomType');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


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


exports.getBookings=async (req,res)=>{
  try{
     const bookings=await Room.find({status:occupied});
     if(bookings){
      return res.status(200).json({
        success:true,
        bookings
      })
     }
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    });
  }
}

exports.resolveMaintenance=async (req,res)=>{
  const {mid}=req.params;
   try{
      const room=await Room.maintenanceRequests.find({_id:mid});
      maintenanceRequests.status="resolved";
      await room.save();
      
      return res.status(500).json({
        success:true,
        message:"Maintenance issue status resolved"
      })
   }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
   }
}