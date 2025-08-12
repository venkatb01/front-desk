const mongoose = require('mongoose');

const performanceMetricsSchema = new mongoose.Schema({
  tasksCompleted: { type: Number, default: 0 },
  tasksPending: { type: Number, default: 0 },
  averageCompletionTimeInMinutes: { type: Number, default: 0 },
  lastTaskDate: Date,
  feedback: [{
    rating: { type: Number, min: 1, max: 5 },
    comments: String,
    date: { type: Date, default: Date.now }
  }]
});


const housekeepingStaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  phone: String,
  shift: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Night']
  },
  performance: performanceMetricsSchema,
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HousekeepingTask' }]
}, { timestamps: true });

module.exports = mongoose.model('HousekeepingStaff', housekeepingStaffSchema);
