const {insertRoomType, findAllRoomTypes, findRoomTypeByName, findRoomTypeById, updateRoomType, removeRoomType} = require('../services/roomTypeService');
const { findRoomCountByStatus } = require('./roomController');

const createRoomType = async (req, res) => {
    const { name, description, maxOccupancy, basePrice, amenities } = req.body;

    try {
        const newRoomType = await insertRoomType(name, description, maxOccupancy, basePrice, amenities);
        return res.status(201).json(newRoomType);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllRoomTypes = async (req, res) => {
    try {
        const roomTypes = await findAllRoomTypes();
        return res.status(200).json(roomTypes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getRoomTypeById = async (req, res) => {
    const { id } = req.params;

    try {
        const roomType = await findRoomTypeById(id);
        if (!roomType) {
            return res.status(404).json({ message: 'Room type not found' });
        }
        return res.status(200).json(roomType);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getRoomTypeByName = async (req, res) => {
    const { name } = req.params;

    try {
        const roomType = await findRoomTypeByName(name);
        if (!roomType) {
            return res.status(404).json({ message: 'Room type not found' });
        }
        return res.status(200).json(roomType);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateRoomTypeById = async (req, res) => {
    const { id } = req.params;
    const { name, description, maxOccupancy, basePrice, amenities } = req.body;

    try {
        const updatedRoomType = await updateRoomType(id, name, description, maxOccupancy, basePrice, amenities);
        return res.status(200).json(updatedRoomType);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteRoomTypeById = async (req, res) => {
    const { id } = req.params;

    try {
        await removeRoomType(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoomType,
    getAllRoomTypes,
    findRoomCountByStatus,
    getRoomTypeById,
    getRoomTypeByName,
    updateRoomTypeById,
    deleteRoomTypeById
};