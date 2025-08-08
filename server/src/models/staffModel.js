const mongoose = require('mongoose');

const { Schema } = mongoose;

const StaffSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'receptionist', 'housekeeping',"front-desk"],
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('staff', StaffSchema);
