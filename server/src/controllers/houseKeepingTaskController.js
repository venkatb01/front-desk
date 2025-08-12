const HousekeepingTask=require("../models/houseKeepingTaskModel")
const HousekeepingStaff=require("../models/houseKeepingStaffModel")

exports.addTask = async (req, res) => {
  try {
    const task = new HousekeepingTask(req.body);
    await task.save();

    if (task.assignedTo) {
      await HousekeepingStaff.findByIdAndUpdate(task.assignedTo, {
        $push: { assignedTasks: task._id },
        $inc: { 'performance.tasksPending': 1 }
      });
    }

    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.updateTaskStatus = async (req, res) => {
  const { staffId, taskId } = req.params;
  const { status } = req.body;

  if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
   
    const task = await HousekeepingTask.findOne({ _id: taskId});

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found or not assigned to this staff" });
    }

    const oldStatus = task.status;
    task.status = status;
    await task.save();

    const update = {};
    if (oldStatus !== 'Completed' && status === 'Completed') {
      update.$inc = { 'performance.tasksCompleted': 1, 'performance.tasksPending': -1 };
      update.$set = { 'performance.lastTaskDate': new Date() };
    } else if (oldStatus === 'Pending' && status === 'In Progress') {
      update.$inc = { 'performance.tasksPending': -1 };
    }

    if (Object.keys(update).length > 0) {
      await HousekeepingStaff.findByIdAndUpdate(staffId, update);
    }

    res.status(200).json({ success: true, message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
