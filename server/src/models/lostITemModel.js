const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    description: String,
    dateFound: {
      type: Date,
      default: Date.now,
    },
    foundBy: {
      type: String,
      required: true,
    },
    isClaimed: {
      type: Boolean,
      default: false,
    },
    claimedBy: String,
    claimedDate: Date,

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    reportedByGuest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostItem", lostItemSchema);
