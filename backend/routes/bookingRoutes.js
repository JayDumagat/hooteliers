const express = require('express');
const router = express.Router();

const {createBooking, getAllBookings, getBookingById, getBookingByCustomerId, updateBookingById, deleteBookingById, updateBookingStatus} = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);
router.get('/customer/:customerId', getBookingByCustomerId);
router.put('/:id', updateBookingById);
router.delete('/:id', deleteBookingById);




module.exports = router;