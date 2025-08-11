const Rate = require('../models/rateModel');

exports.createRate = async (req, res) => {
  try {
    const rate = new Rate({ ...req.body, createdBy: req.user._id });
    const saved = await rate.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

function calculateCurrentRate(rate, date = new Date()) {
  let currentRate = rate.baseRate;

  // Seasonal adjustment
  const season = rate.seasonalAdjustments?.find(adj =>
    date >= new Date(adj.startDate) && date <= new Date(adj.endDate)
  );

  if (season) {
    if (season.adjustment === 'percentage') {
      currentRate += currentRate * (season.value / 100);
    } else if (season.adjustment === 'fixed') {
      currentRate += season.value;
    }
  }

  // Weekend premium
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  if (rate.weekendPremium?.days?.includes(dayOfWeek)) {
    currentRate += currentRate * (rate.weekendPremium.percentage / 100);
  }

  return parseFloat(currentRate.toFixed(2));
}


exports.getCurrentRateByRoomType = async (req, res) => {
  try {
    const { roomTypeId } = req.params;
    const today = req.query.date ? new Date(req.query.date) : new Date();

    const rate = await Rate.findOne({
      roomType: roomTypeId,
      isActive: true,
      validFrom: { $lte: today },
      validTo: { $gte: today }
    });

    if (!rate) {
      return res.status(404).json({ error: 'No active rate found for this room type' });
    }

    const currentRate = calculateCurrentRate(rate, today);

    res.status(200).json({
      roomType: roomTypeId,
      date: today.toISOString().split('T')[0],
      baseRate: rate.baseRate,
      currentRate: currentRate
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRates = async (req, res) => {
  try {
    const rates = await Rate.find().populate('roomType');
    res.status(200).json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRateById = async (req, res) => {
  try {
    const rate = await Rate.findById(req.params.id);
    if (!rate) return res.status(404).json({ message: 'Rate not found' });
    res.status(200).json(rate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRate = async (req, res) => {
  try {
    const updated = await Rate.findByIdAndUpdate(req.params.id, { ...req.body, modifiedBy: req.user._id }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Rate not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRate = async (req, res) => {
  try {
    const deleted = await Rate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Rate not found' });
    res.status(200).json({ message: 'Rate deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
