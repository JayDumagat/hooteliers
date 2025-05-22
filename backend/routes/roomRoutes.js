const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms, getRoomById, updateRoomDetails, deleteRoom, findRoomCountByStatus } = require('../controllers/roomController');

router.post('/', createRoom);
router.get('/dashboard-stat', findRoomCountByStatus);
router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.put('/:id', updateRoomDetails);
router.delete('/:id', deleteRoom);


module.exports = router;