const Guest = require('../models/guestModel');


exports.registerGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json({ success: true, data: guest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.bookRoom = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { checkInDate, checkOutDate, roomNumber, amountPaid } = req.body;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ success: false, message: "Guest not found" });

    guest.stayHistory.push({
      checkInDate,
      checkOutDate,
      roomNumber,
      amountPaid
    });

    await guest.save();
    res.status(200).json({ success: true, data: guest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json({ success: true, data: guests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    const updatedGuest = await Guest.findByIdAndUpdate(guestId, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedGuest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getStayHistory = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ success: false, message: "Guest not found" });

    res.status(200).json({ success: true, data: guest.stayHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    await Guest.findByIdAndDelete(guestId);
    res.status(200).json({ success: true, message: "Guest deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
