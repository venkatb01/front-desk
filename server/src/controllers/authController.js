const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/staffModel');
const transporter=require("../utils/nodemailer")



exports.register = async (req, res) => {
  const { firstName,lastName, email,phone,role, password} = req.body; 
  console.log("Inside register controller")
  try {
    console.log("Incoming data:", req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({success:false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({firstName,lastName,email,phone,role,password: hashedPassword});

    const mailOptions = {
      to: email,
      from: process.env.NM_USER,
      subject: "Welcome to HMS",
      text: `Thank you for registering`,
    };

    await transporter.sendMail(mailOptions);


    res.status(201).json({success:true, message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false, message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({success:false,message: "User doesnot exists,Kindly create an account" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({success:false,message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({success:true,user,token, message: "Login successful" });
  } catch (err) {
    res.status(500).json({success:false, message: "Server error", error: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
