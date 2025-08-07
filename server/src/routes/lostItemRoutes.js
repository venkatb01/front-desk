const express = require('express');
const { reportLostItem, getLostItems, claimLostItem } = require('../controllers/lostItemController');

const router = express.Router();

router.post('/report', reportLostItem);            
router.get('/', getLostItems);                     
router.put('/claim/:id', claimLostItem);           

module.exports = router;
