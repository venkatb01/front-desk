const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  confirmationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  nights: {
    type: Number,
    required: true
  },
  guestCount: {
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
  rooms: [{
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoomType'
    },
    rate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rate'
    },
    rateAmount: Number,
    guests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest'
    }]
  }],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'],
    default: 'pending'
  },
  financial: {
    roomTotal: Number,
    servicesTotal: {
      type: Number,
      default: 0
    },
    taxTotal: {
      type: Number,
      default: 0
    },
    discountTotal: {
      type: Number,
      default: 0
    },
    grandTotal: Number,
    amountPaid: {
      type: Number,
      default: 0
    },
    balance: Number
  },
  source: {
    type: String,
    enum: ['direct', 'booking.com', 'expedia', 'agoda', 'phone', 'walk_in', 'corporate'],
    required: true
  },
  specialRequests: String,
  services: [{
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    scheduledDate: Date,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled']
    }
  }],
  modificationHistory: [{
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    modificationDate: Date,
    changes: String,
    reason: String
  }],
  checkInTime: Date,
  checkOutTime: Date,
  earlyCheckIn: Boolean,
  lateCheckOut: Boolean,
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

// Pre-save middleware to calculate totals
reservationSchema.pre('save', function(next) {
  this.nights = Math.ceil((this.checkOutDate - this.checkInDate) / (1000 * 60 * 60 * 24));
  
  // Calculate room total
  this.financial.roomTotal = this.rooms.reduce((total, room) => {
    return total + (room.rateAmount * this.nights);
  }, 0);
  
  // Calculate services total
  this.financial.servicesTotal = this.services.reduce((total, service) => {
    return total + service.totalPrice;
  }, 0);
  
  // Calculate grand total
  this.financial.grandTotal = this.financial.roomTotal + 
                             this.financial.servicesTotal + 
                             this.financial.taxTotal - 
                             this.financial.discountTotal;
  
  // Calculate balance
  this.financial.balance = this.financial.grandTotal - this.financial.amountPaid;
  
  next();
});

// Index for reservation lookup
reservationSchema.index({ guest: 1, checkInDate: 1, checkOutDate: 1 });
reservationSchema.index({ confirmationNumber: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
