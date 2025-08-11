const LostAndFound = require("../models/lostITemModel.js");
const transporter = require("../utils/nodemailer.js")

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

    const mailOptions = {
      to: email,
      from: process.env.NM_USER,
      subject: "Lost Item Report Received",
      text: `We have received your lost item report for "${itemName}" lost on ${new Date(dateLost).toLocaleDateString()}. Our team will get back to you soon.`
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reporting item', error });
  }
};


exports.getLostItems = async (req, res) => {
  try {
    const items = await LostAndFound.find().populate('room', 'roomNumber');
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.claimLostItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { claimedBy } = req.body;

    const item = await LostAndFound.findById(id);
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


exports.foundItem=async (req,res)=>{
  try{
      const {id}=req.params;
      const item=await LostAndFound({_id:id});
      const mailOptions = {
      to: email,
      from: process.env.NM_USER,
      subject: "Found reported Item",
      text: `We have recovered your lost item (${item.itemName} ${new Date()}) kindly recollect it`,
     };

     await transporter.sendMail(mailOptions);
     return res.status(200).json({
        success:true,
        message:"Lost item Found"
      });
  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}