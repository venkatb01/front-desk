const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.post("/inventory", inventoryController.addItem);
router.get("/inventory", inventoryController.getAllItems);
router.get("/inventory/:id", inventoryController.getItemById);
router.put("/inventory/:id", inventoryController.updateItem);
router.delete("/inventory/:id", inventoryController.deleteItem);
router.get("/inventory/category/:category", inventoryController.getItemsByCategory);
router.patch("/inventory/:id/decrease", inventoryController.decreaseQuantity);

module.exports = router;
