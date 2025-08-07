const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['room_service', 'spa', 'restaurant', 'laundry', 'transportation', 'recreation', 'business', 'other'],
    required: true
  },
  pricing: {
    type: {
      type: String,
      enum: ['fixed', 'hourly', 'per_item', 'percentage']
    },
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  availability: {
    schedule: [{
      day: {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      },
      startTime: String,
      endTime: String
    }],
    capacity: Number,
    advanceBooking: Number 
  },
  requiredStaff: [{
    role: String,
    count: Number
  }],
  requiredResources: [String],
  isActive: {
    type: Boolean,
    default: true
  },
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

module.exports = mongoose.model('Service', serviceSchema);