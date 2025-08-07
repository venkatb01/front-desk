const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'receptionist', 'housekeeping'],
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    default: null
  },
  permissions: {
    type: [String], // Example: ['read:bookings', 'write:rooms']
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
