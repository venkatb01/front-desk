const express = require("express");
const { addFolioEntry, getFolio, generateBill, recordPayment } = require("../controllers/folioController.js");
const verifyToken = require("../middlewares/verifyToken.js");

const folioRouter = express.Router();


folioRouter.post("/add/:guestId", verifyToken, addFolioEntry);


folioRouter.get("/:guestId", verifyToken, getFolio);
folioRouter.get("/generateBill/:guestId",verifyToken,generateBill);
folioRouter.get("/finalpayment",verifyToken,recordPayment);


module.exports = folioRouter;
