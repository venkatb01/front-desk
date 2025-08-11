const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);
router.post('/', controller.createReservation);
router.get('/', controller.getAllReservations);
router.get('/:id', controller.getReservationById);
router.put('/:id', controller.updateReservation);
router.delete('/:id', controller.deleteReservation);

module.exports = router;
