const LostAndFound=require("../models/lostITemModel.js");


exports.reportLostItem = async (req, res) => {
  try {
    const { itemName, description, dateLost, roomId, guestId } = req.body;

    const newEntry = new LostAndFound({
      itemName,
      description,
      dateLost,
      room: roomId,
      reportedByGuest: guestId || null
    });

    await newEntry.save();
    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reporting item', error });
  }
};


exports.getLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().populate('room', 'roomNumber');
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.claimLostItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { claimedBy } = req.body;

    const item = await LostItem.findById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    item.isClaimed = true;
    item.claimedBy = claimedBy;
    item.claimedDate = new Date();

    await item.save();
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};