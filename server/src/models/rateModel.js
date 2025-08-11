const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true
  },
  rateCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  baseRate: { type: Number, required: true, min: 0 },
  
  seasonalAdjustments: [{
    season: String,
    startDate: Date,
    endDate: Date,
    adjustmentType: { type: String, enum: ['percentage', 'fixed'] },
    value: Number
  }],

  weekendPremium: {
    percentage: Number,
    days: [{ type: String, enum: ['friday', 'saturday', 'sunday'] }]
  },

  guestBasedAdjustments: [{
    condition: { type: String, enum: ['single', 'extra_adult', 'extra_child'] },
    adjustmentType: { type: String, enum: ['percentage', 'fixed'] },
    value: Number
  }],

  discountRules: [{
    name: String,
    type: { type: String, enum: ['early_bird', 'extended_stay'] },
    conditionDays: Number,
    discountType: { type: String, enum: ['percentage', 'fixed'] },
    value: Number
  }],

  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },

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

rateSchema.index({ roomType: 1, rateCode: 1, validFrom: 1, validTo: 1 });

module.exports = mongoose.model('Rate', rateSchema);
