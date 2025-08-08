const InventoryItem = require("../models/inventoryModel.js");

exports.addItem = async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({success:false,error: err.message });
  }
};



exports.getAllItems = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({success:false,error: err.message });
  }
};



exports.getItemById = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({success:false,error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ success:false,error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ success:false,error: err.message });
  }
};

exports.getItemsByCategory = async (req, res) => {
  try {
    const items = await InventoryItem.find({ category: req.params.category });
    res.json(items);
  } catch (err) {
    res.status(500).json({success:false, error: err.message });
  }
};

exports.decreaseQuantity = async (req, res) => {
  try {
    const { amount } = req.body;
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = Math.max(item.quantity - amount, 0);
    item.status = item.quantity === 0 ? "Out of Stock" : item.quantity < 5 ? "Low Stock" : "In Stock";
    item.lastUpdated = Date.now();

    await item.save();
    res.json(item);
    } catch (err) {
    res.status(400).json({success:false, error: err.message });
  }
};
