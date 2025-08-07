const express=require("express");
const { registerGuest, bookRoom, getAllGuests, updateGuest } = require("../controllers/guestController.js");
const isReceptionist = require("../middlewares/isReceptionist.js");
const verifyToken=require("../middlewares/verifyToken.js")
const guestRouter=express.Router();

guestRouter.post("/addGuest",isReceptionist,registerGuest);
guestRouter.post("/bookroom/:guestId",isReceptionist,bookRoom);
guestRouter.get("/allguests",verifyToken,getAllGuests);
guestRouter.put("/:id",isReceptionist,updateGuest);

module.exports=guestRouter;