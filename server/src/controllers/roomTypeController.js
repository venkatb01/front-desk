import RoomType from '../models/roomTypeModel.js'; 
// create roomType
export const createRoomType = async (req, res) => {
    
  try {
    const roomType = new RoomType({
      ...req.body,
      createdBy: req.user._id  
    });
    const savedRoomType = await roomType.save();
    res.status(201).json(savedRoomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all room types 
export const getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find().populate('createdBy', 'firstName lastName');
    res.status(200).json(roomTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get room by id 
export const getRoomTypeById = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) return res.status(404).json({ message: 'Room Type not found' });
    res.status(200).json(roomType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update room
export const updateRoomType = async (req, res) => {
  try {
    const updated = await RoomType.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        modifiedBy: req.user._id
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Room Type not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delte rooomtype
export const deleteRoomType = async (req, res) => {
  try {
    const deleted = await RoomType.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Room Type not found' });
    res.status(200).json({ message: 'Room Type deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};