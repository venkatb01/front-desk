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
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  baseRate: {
    type: Number,
    required: true,
    min: 0
  },
  seasonalAdjustments: [{
    season: String,
    startDate: Date,
    endDate: Date,
    adjustment: {
      type: String,
      enum: ['percentage', 'fixed']
    },
    value: Number
  }],
  weekendPremium: {
    percentage: Number,
    days: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }]
  },
  discountRules: [{
    name: String,
    type: {
      type: String,
      enum: ['early_bird', 'extended_stay', 'loyalty', 'corporate', 'group']
    },
    condition: String,
    discount: {
      type: String,
      enum: ['percentage', 'fixed']
    },
    value: Number
  }],
  restrictions: {
    minStay: Number,
    maxStay: Number,
    advanceBooking: Number,
    cancellationPolicy: String
  },
  validFrom: {
    type: Date,
    required: true
  },
  validTo: {
    type: Date,
    required: true
  },
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

// Compound index for rate lookup
rateSchema.index({ roomType: 1, rateCode: 1, validFrom: 1, validTo: 1 });

module.exports = mongoose.model('Rate', rateSchema);