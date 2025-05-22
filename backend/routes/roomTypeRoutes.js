const express = require('express');
const router = express.Router();

const {createRoomType, getAllRoomTypes, getRoomTypeById, getRoomTypeByName, updateRoomTypeById, deleteRoomTypeById, findRoomCountByStatus} = require('../controllers/roomTypeController');

router.post('/', createRoomType);
router.get('/', getAllRoomTypes);
router.get('/dashboard-stat', findRoomCountByStatus);
router.get('/:id', getRoomTypeById);
router.get('/name/:name', getRoomTypeByName);
router.put('/:id', updateRoomTypeById);
router.delete('/:id', deleteRoomTypeById);


module.exports = router;
