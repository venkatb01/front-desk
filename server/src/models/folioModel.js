const mongoose = require('mongoose');

const folioSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
    unique: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  folioNumber: {
    type: String,
    required: true,
    unique: true
  },
  charges: [{
    date: {
      type: Date,
      default: Date.now
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['room', 'service', 'tax', 'fee', 'discount', 'adjustment'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    unitPrice: Number,
    reference: String, // reference to service or room
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  totalCharges: {
    type: Number,
    default: 0
  },
  totalPayments: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  },
  isSettled: {
    type: Boolean,
    default: false
  },
  settledDate: Date,
  printedStatements: [{
    printedDate: Date,
    printedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
}, {
  timestamps: true
});

// Pre-save middleware to calculate totals
folioSchema.pre('save', function(next) {
  this.totalCharges = this.charges.reduce((total, charge) => {
    return total + charge.amount;
  }, 0);
  
  this.balance = this.totalCharges - this.totalPayments;
  this.isSettled = this.balance === 0;
  
  next();
});

module.exports = mongoose.model('Folio', folioSchema);

