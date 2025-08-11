const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true
  },
  rooms: [{
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    },
    rate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rate'
    }
  }],
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: {
    adults: { type: Number, required: true },
    children: { type: Number, default: 0 }
  },
  totalAmount: { type: Number, required: true },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'bookedByModel',
    required: true
  },
  bookedByModel: {
    type: String,
    enum: ['staff', 'Guest'], 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'checked_in', 'checked_out'],
    default: 'pending'
  },
  specialRequests: String
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
