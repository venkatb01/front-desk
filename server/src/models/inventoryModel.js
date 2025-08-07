const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Amenity', 'Linen', 'Cleaning Supply', 'Toiletry', 'Minibar Item', 'Stationery', 'Maintenance Tool'],
    required: true
  },
  quantityInStock: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['pieces', 'bottles', 'packets', 'rolls', 'bars', 'liters', 'kilograms'],
    default: 'pieces'
  },
  restockLevel: {
    type: Number,
    default: 10
  },
  lastRestocked: Date,
  addedBy: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);
