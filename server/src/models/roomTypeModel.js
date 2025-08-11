const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: String,
  baseCapacity: {
    adults: { type: Number, required: true, min: 1 },
    children: { type: Number, default: 0 }
  },
  maxCapacity: {
    adults: Number,
    children: Number
  },
  bedConfigurations: [{
    type: { type: String, enum: ['single', 'double', 'queen', 'king'] },
    count: Number
  }],
  standardAmenities: [String],
  size: Number, 
  pricingCategory: {
    type: String,
    enum: ['standard', 'deluxe', 'premium']
  },
  images: [String],
  isActive: { type: Boolean, default: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff',
    required: true
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'staff'
  }
}, { timestamps: true });

module.exports = mongoose.model('RoomType', roomTypeSchema);


