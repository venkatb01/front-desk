const mongoose = require('mongoose');

const folioSchema = new mongoose.Schema(
  {
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  category:{
    type: String,
    enum: ['room', 'service', 'tax', 'fee', 'discount', 'adjustment'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type:{
    type:String,
    enum:["debit","credit"]
  }
},
 {
  timestamps: true
});


module.exports = mongoose.model('Folio', folioSchema);

