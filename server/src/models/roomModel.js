const mongoose = require('mongoose');

const housekeepingTaskSchema = new mongoose.Schema({
  task: String,
  assignedTo: String, // staff ID or name
  scheduledDate: Date,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  notes: String
}, { timestamps: true });

const maintenanceRequestSchema = new mongoose.Schema({
  issue: String,
  reportedBy: String,
  reportedDate: {
    type: Date,
    default: Date.now
  },
  resolvedDate: Date,
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },
  notes: String
}, { timestamps: true });

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },

  status: {
    type: String,
    enum: ['Clean', 'Dirty', 'Occupied', 'Vacant', 'Maintenance'],
    default: 'Dirty'
  },

  housekeepingTasks: [housekeepingTaskSchema],

  maintenanceRequests: [maintenanceRequestSchema],

  inventory: {
    towels: { type: Number, default: 0 },
    bedsheets: { type: Number, default: 0 },
    soap: { type: Number, default: 0 },
    shampoo: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
