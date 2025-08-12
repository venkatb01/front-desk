const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  id:{
    type: mongoose.Schema.Types.ObjectId,
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  DOB: { type: Date },
  nationality: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  information: {
    aadharNumber: String,
    idType: String,
    idNumber: String
  },
  roomPreferences: {
    bedType: String,
    floorPreference: String,
    view: String
  },
  feedback: [{
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    date: { type: Date, default: Date.now },
    staffResponse: String,
    status: { type: String, enum: ['pending', 'approved', 'hidden'], default: 'approved' }
  }],
  stayHistory: [{
    checkInDate: Date,
    checkOutDate: Date,
    roomNumber: String,
    amountPaid: Number,
  }],
  currentStay: {
    checkInDate: Date,
    expectedCheckOutDate: Date,
    roomNumber: String,
    ratePerNight: Number,
    isCheckedOut: { type: Boolean, default: false }
  },
  folio: [{
    date: String,
    description: String,
    amount: Number,
    type: { type: String, enum: ['debit', 'credit'] }
  }]

}, { timestamps: true });



module.exports = mongoose.model('Guest', guestSchema);
