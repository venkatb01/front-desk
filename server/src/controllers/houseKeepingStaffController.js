const HousekeepingStaff = require("../models/houseKeepingStaffModel.js");
const Room=require("../models/roomModel.js")
const HousekeepingTask = require('../models/houseKeepingTaskModel.js'); // Adjust path if needed

const mongoose = require('mongoose');


exports.addStaff = async (req, res) => {
  try {
    const staff = await HousekeepingStaff.create(req.body);
    res.status(201).json({ success: true, data: staff });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await HousekeepingStaff.find();
    res.status(200).json({ success: true, data: staffList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




exports.getPerformance = async (req, res) => {
  try {
    const { staffId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({ success: false, message: 'Invalid staff ID' });
    }

    const staff = await HousekeepingStaff.findById(staffId);
    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }
    
    const tasks = await HousekeepingTask.find({ assignedTo: staff._id });

    const completed = tasks.filter(task => task.status === 'Completed').length;
    const total = tasks.length;

    res.status(200).json({
      success: true,
      performance: {
        staffName: staff.name,
        totalTasks: total,
        completedTasks: completed,
        completionRate: total ? ((completed / total) * 100).toFixed(2) + "%" : "0%"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
