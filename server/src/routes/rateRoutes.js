const express = require('express');
const router = express.Router();
const rateController = require('../controllers/rateController');
const isReceptionist = require('../middlewares/isReceptionist'); // ✅ Fixed here


router.post('/', isReceptionist, rateController.createRate);
router.get('/current/:roomTypeId', isReceptionist, rateController.getCurrentRateByRoomType);
router.get('/',isReceptionist, rateController.getAllRates);
router.get('/:id',isReceptionist, rateController.getRateById);
router.put('/:id', isReceptionist, rateController.updateRate);
router.delete('/:id', isReceptionist, rateController.deleteRate);

module.exports = router;
