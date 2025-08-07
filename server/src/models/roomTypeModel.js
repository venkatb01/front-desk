const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: String,
  baseCapacity: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0
    }
  },
  maxCapacity: {
    adults: Number,
    children: Number
  },
  bedConfigurations: [{
    type: {
      type: String,
      enum: ['single', 'double', 'queen', 'king', 'twin', 'sofa_bed']
    },
    count: Number
  }],
  standardAmenities: [String],
  size: Number, // in square meters
  pricingCategory: {
    type: String,
    enum: ['economy', 'standard', 'deluxe', 'premium', 'suite'],
    required: true
  },
  images: [String], // URLs to room images
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

module.exports = mongoose.model('RoomType', roomTypeSchema);