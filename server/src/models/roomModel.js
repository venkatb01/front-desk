const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  issue: {
    type: String,
    required: true
  },
  reportedBy: String,
  reportedDate: {
    type: Date,
    default: Date.now
  },
  resolvedDate: Date,
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },
  notes: String
}, { timestamps: true });

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Clean', 'Dirty', 'Occupied', 'Vacant', 'Maintenance'],
    default: 'Dirty'
  },
  maintenanceRequests: [maintenanceRequestSchema],
  inventory: {
    towels: { type: Number, default: 0 },
    bedsheets: { type: Number, default: 0 },
    soap: { type: Number, default: 0 },
    shampoo: { type: Number, default: 0 }
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: function () {
      return this.status === 'Occupied';
    }
  },
  capacity:{
    type:Number,
  },
  category:{
    type:String,
    enum:['standard', 'deluxe', 'premium'],
  }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
