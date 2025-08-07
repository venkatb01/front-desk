const HousekeepingStaff = require("../models/houseKeepingStaffModel.js");

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

exports.updateTaskStatus = async (req, res) => {
  try {
    const { staffId, taskId } = req.params;
    const { status } = req.body;

    const staff = await HousekeepingStaff.findOne({ staffId });
    const task = staff.assignedTasks.find(t => t.taskId.toString() === taskId);
    if (task) {
      task.status = status;
      await staff.save();
    }

    res.status(200).json({ success: true, message: "Task status updated." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPerformance = async (req, res) => {
  try {
    const { staffId } = req.params;
    const staff = await HousekeepingStaff.findOne({ staffId });

    const completed = staff.assignedTasks.filter(t => t.status === 'Completed').length;
    const total = staff.assignedTasks.length;

    res.status(200).json({
      success: true,
      performance: {
        totalTasks: total,
        completedTasks: completed,
        completionRate: total ? ((completed / total) * 100).toFixed(2) + "%" : "0%"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
