const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  DOB: {
    type: Date
  },
  nationality: {
    type: String
  },
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
    smoking: Boolean,
    floorPreference: String,    
    view: String               
  },
  stayHistory: [{
    checkInDate: Date,
    checkOutDate: Date,
    roomNumber: String,
    amountPaid: Number,
    feedback: String
  }],
  references: [{
    name: String,
    contact: String,
    relation: String
  }],
  vipStatus: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });

module.exports = mongoose.model('Guest', guestSchema);
