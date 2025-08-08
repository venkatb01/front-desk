const mongoose = require('mongoose');

const housekeepingTaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HousekeepingStaff',
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  scheduledDate: Date,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('HousekeepingTask', housekeepingTaskSchema);
