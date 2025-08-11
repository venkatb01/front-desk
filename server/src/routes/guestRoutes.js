const express = require("express");
const {
  registerGuest,
  bookRoom,
  getAllGuests,
  updateGuest,
  addStayFeedback,
  addGuestFeedback,
  updateGuestFeedback,
  getGuestDetails
} = require("../controllers/guestController.js");

const isReceptionist = require("../middlewares/isReceptionist.js");
const verifyToken = require("../middlewares/verifyToken.js");

const guestRouter = express.Router();

guestRouter.post("/addGuest",registerGuest);
guestRouter.post("/bookroom/:guestId", isReceptionist, bookRoom);
guestRouter.get("/:guestId",getGuestDetails);
guestRouter.get("/allguests",getAllGuests);
guestRouter.put("/:guestId", isReceptionist, updateGuest);
guestRouter.post("/:guestId/feedback",addGuestFeedback);
guestRouter.put("/:guestId/:feedbackId/changeFeedbackStatus",updateGuestFeedback);


module.exports = guestRouter;
