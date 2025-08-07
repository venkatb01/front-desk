const mongoose = require('mongoose');

const housekeepingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  taskType: {
    type: String,
    enum: ['cleaning', 'maintenance', 'inspection', 'deep_cleaning'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  estimatedTime: Number, 
  actualTime: Number,
  supplies: [{
    item: String,
    quantity: Number,
    unit: String
  }],
  checklist: [{
    task: String,
    isCompleted: {
      type: Boolean,
      default: false
    },
    notes: String
  }],
  assignedDate: {
    type: Date,
    default: Date.now
  },
  startTime: Date,
  completionTime: Date,
  inspectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  inspectionNotes: String,
  qualityScore: {
    type: Number,
    min: 1,
    max: 5
  },
  issues: [String],
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Housekeeping', housekeepingSchema);
