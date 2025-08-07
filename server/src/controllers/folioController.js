// controllers/folioController.js
const Guest = require('../models/guestModel');


exports.addFolioEntry = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { date, description, amount, type } = req.body;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ success: false, message: "Guest not found" });

    const entry = { date, description, amount, type };
    guest.folio = guest.folio || [];
    guest.folio.push(entry);

    await guest.save();
    res.status(200).json({ success: true, data: guest.folio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFolio = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ success: false, message: "Guest not found" });
    res.status(200).json({ success: true, data: guest.folio || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateBill = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ success: false, message: 'Guest not found' });

    const folioEntries = guest.folio || [];
    let total = 0;
    folioEntries.forEach(entry => {
      total += entry.type === 'debit' ? entry.amount : -entry.amount;
    });

    // Calculate stay charges
    const stay = guest.currentStay;
    if (!stay || !stay.checkInDate || !stay.expectedCheckOutDate) {
      return res.status(400).json({ success: false, message: 'Current stay data missing' });
    }

    const nights = Math.ceil(
      (new Date(stay.expectedCheckOutDate) - new Date(stay.checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const roomCharges = nights * (stay.ratePerNight || 0);

    const grandTotal = total + roomCharges;

    res.status(200).json({
      success: true,
      bill: {
        guestName: guest.name,
        roomNumber: stay.roomNumber,
        nights,
        roomCharges,
        folioTotal: total,
        grandTotal
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { amountPaid, paymentMethod } = req.body;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ success: false, message: 'Guest not found' });

    const paymentEntry = {
      date: new Date().toISOString().split('T')[0],
      description: `Final payment via ${paymentMethod}`,
      amount: amountPaid,
      type: 'credit'
    };

    guest.folio.push(paymentEntry);
    guest.currentStay.isCheckedOut = true;
    guest.stayHistory.push({
      checkInDate: guest.currentStay.checkInDate,
      checkOutDate: new Date(),
      roomNumber: guest.currentStay.roomNumber,
      amountPaid,
    });
    guest.currentStay = {};

    await guest.save();
    res.status(200).json({ success: true, message: 'Payment recorded and guest checked out' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// // controllers/nightAuditController.js
// const performNightAudit = async () => {
//   const guests = await Guest.find({
//     'currentStay.isCheckedOut': false,
//     'currentStay.checkInDate': { $exists: true },
//   });
  
//   for (const guest of guests) {
//     const today = new Date().toISOString().slice(0, 10);

//     const chargeExists = guest.folio?.some(entry => entry.date === today && entry.description === 'Room Charge');
//     if (chargeExists) continue;

//     const rate = guest.currentStay?.ratePerNight || 0;

//     const folioEntry = {
//       date: today,
//       description: 'Room Charge',
//       amount: rate,
//       type: 'debit'
//     };

//     guest.folio = guest.folio || [];
//     guest.folio.push(folioEntry);
//     await guest.save();
//   }
// };

// exports.runNightAudit = async (req, res) => {
//   try {
//     await performNightAudit();
//     res.status(200).json({ success: true, message: "Night audit completed" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // controllers/shiftController.js
// const ShiftLog = require('../models/shiftLogModel');

// exports.recordShiftHandover = async (req, res) => {
//   try {
//     const { shift, notes, handoverBy } = req.body;
//     const log = new ShiftLog({ shift, notes, handoverBy });
//     await log.save();
//     res.status(201).json({ success: true, data: log });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getShiftLogs = async (req, res) => {
//   try {
//     const logs = await ShiftLog.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: logs });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
