const express = require("express");
const router = express.Router();
const {addItem,getAllItems,getItemById,updateItem,deleteItem,decreaseQuantity,getItemsByCategory}= require("../controllers/inventoryController");

router.post("/", addItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.put("/:id",updateItem);
router.delete("/:id", deleteItem);
router.get("/category/:category",getItemsByCategory);
router.patch("/:id/decrease", decreaseQuantity);

module.exports = router;
