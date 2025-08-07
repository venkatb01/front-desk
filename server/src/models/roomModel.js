const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  capacity: {
    adults: Number,
    children: Number
  },
  bedType: {
    type: String,
    enum: ['single', 'double', 'queen', 'king', 'twin']
  },
  amenities: [String],
  baseRate: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'out_of_order', 'maintenance'],
    default: 'available'
  },
  housekeepingStatus: {
    type: String,
    enum: ['clean', 'dirty', 'inspected', 'out_of_order'],
    default: 'clean'
  },
  maintenanceIssues: [{
    issue: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent']
    },
    reportedDate: Date,
    resolvedDate: Date,
    isResolved: {
      type: Boolean,
      default: false
    }
  }],
  images: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  lastCleaned: Date,
  lastMaintained: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Compound index for room search
roomSchema.index({ roomType: 1, status: 1, floor: 1 });

module.exports = mongoose.model('Room', roomSchema);
