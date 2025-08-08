const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  facility: String,
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['plumbing', 'electrical', 'hvac', 'furniture', 'appliances', 'structural', 'other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['reported', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'reported'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedDate: {
    type: Date,
    default: Date.now
  },
  assignedDate: Date,
  startDate: Date,
  completionDate: Date,
  estimatedCost: Number,
  actualCost: Number,
  estimatedTime: Number, // in hours
  actualTime: Number,
  materials: [{
    item: String,
    quantity: Number,
    unitCost: Number,
    totalCost: Number,
    supplier: String
  }],
  workPerformed: String,
  resolutionNotes: String,
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  images: [String], // before/after images
  warrantyInfo: {
    warrantyPeriod: Number, // in months
    warrantyProvider: String,
    warrantyDetails: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);