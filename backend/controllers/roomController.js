const {insertRoom, findAllRooms, updateRoom, removeRoom} = require('../services/roomService');
const {Room, sequelize} = require('../models');

const createRoom = async (req, res) => {
    const { roomType, roomNumber, floor, status } = req.body;

    try {
        const room = await insertRoom(roomType, roomNumber, floor, status);
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Error creating room' });
    }
}

const getAllRooms = async (req, res) => {
    try {
        const rooms = await findAllRooms();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching rooms' });
    }
}

const getRoomById = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await findRoomById(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching room' });
    }
}

const updateRoomDetails = async (req, res) => {
    const { id } = req.params;
    const { roomTypeId, roomNumber, floor, status } = req.body;

    try {
        const room = await updateRoom(id, roomTypeId, roomNumber, floor, status);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Error updating room' });
    }
}

const deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await removeRoom(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting room' });
    }
}

const findRoomCountByStatus = async (req, res) => {
    try {
        const occupiedCount = await Room.count({ where: { status: 'occupied' } });
        const availableCount = await Room.count({ where: { status: 'available' } });

    res.json({ occupiedCount, availableCount });
  } catch (error) {
    console.error('Error fetching room counts:', error); // <- This line will log the root error
    res.status(500).json({ error: 'Error fetching room counts' });
  }
}

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoomDetails,
    deleteRoom,
    findRoomCountByStatus
}