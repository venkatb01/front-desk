const Guest = require('../models/guestModel');
const transporter = require("../utils/nodemailer");

exports.registerGuest = async (req, res) => {
  try {
    
    const guest = new Guest(req.body);
    await guest.save();
    
    const mailOptions = {
      to: email,
      subject: "Registered Successfully",
      text: `Thanks for becoming member of our organisation.`
    }; 

    await transporter.sendMail(mailOptions);
    
    return res.status(201).json({ success: true, data: guest });
  } catch (error) {
    return res.status(500).json({ success: false, message: error});
  }
};

exports.bookRoom = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { checkInDate, checkOutDate, roomNumber, ratePerNight } = req.body;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ success: false, message: "Guest not found" });


    guest.currentStay = {
      checkInDate,
      expectedCheckOutDate: checkOutDate,
      roomNumber,
      ratePerNight,
      isCheckedOut: false
    };

    await guest.save();
    res.status(200).json({ success: true, message: "Room booked", data: guest });
    const mailOptions = {
      to: email,
      from: process.env.NM_USER,
      subject: "Welcome to HMS",
      text: `Thank you for Booking room in HMS`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json({ success: true, guests });
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


exports.addGuestFeedback = async (req, res) => {
  try {
    const { guestId } = req.params;
    const { rating, comment } = req.body;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    guest.feedback.push({ rating, comment });
    await guest.save();
    res.status(201).json({ message: 'Feedback added successfully', feedback: guest.feedback });
    const mailOptions = {
      to: email, 
      from: process.env.NM_USER,
      subject: "Feedback Received",
      text: `Thanks for giving feedback we have received your feedback!`
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getGuestFeedback = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findById(guestId).select('feedback name email');
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    res.status(200).json({success:true,feedback: guest.feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateGuestFeedback = async (req, res) => {
  try {
    const { guestId, feedbackId } = req.params;
    const { rating, comment, status } = req.body;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    const feedback = guest.feedback.id(feedbackId);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    if (rating !== undefined) feedback.rating = rating;
    if (comment) feedback.comment = comment;
    if (status) feedback.status = status;

    await guest.save();
    res.status(200).json({success:true, message: 'Feedback updated successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteGuestFeedback = async (req, res) => {
  try {
    const { guestId, feedbackId } = req.params;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    guest.feedback.id(feedbackId).remove();
    await guest.save();

    res.status(200).json({success:true,message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.addStayFeedback = async (req, res) => {
  try {
    const { guestId, stayIndex } = req.params;
    const { rating, comment } = req.body;

    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });

    if (!guest.stayHistory[stayIndex]) {
      return res.status(400).json({ message: 'Stay not found' });
    }

    guest.stayHistory[stayIndex].feedback = { rating, comment, date: new Date() };
    await guest.save();

    res.json({success:true, message: 'Stay feedback added successfully', stayFeedback: guest.stayHistory[stayIndex].feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGuestDetails=async(req,res)=>{
  try{
     const {guestId}=req.params;
     const guest=await Guest.find({_id:guestId});
     return res.status(200).json({
      success:false,guest
     })
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })

  }
}
