const express = require('express');
const router = express.Router();

const {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomType,
  deleteRoomType
} = require('../controllers/roomTypeController');

const isReceptionist = require('../middlewares/isReceptionist');

// Create
router.post('/', isReceptionist, createRoomType);

// Read
router.get('/', isReceptionist, getAllRoomTypes);
router.get('/:id', getRoomTypeById);

// Update
router.put('/:id', isReceptionist, updateRoomType);

// Delete
router.delete('/:id', isReceptionist, deleteRoomType);

module.exports = router;
