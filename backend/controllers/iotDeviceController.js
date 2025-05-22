const {insertDevice, findAllDevices, findDeviceById, updateDevice, deleteDevice, findDeviceBySerial} = require('../services/iotDeviceService');
const { findCardBySerial } = require('../services/iotCardService');
const { findRoomById } = require('../services/roomService');

const createDevice = async (req, res) => {
    const { roomId, nickname, deviceSerial, status } = req.body;

    try {
        const device = await insertDevice(roomId, nickname, deviceSerial, status);
        res.status(201).json({
            message: "Device created successfully",
            device,
        });
    } catch (error) {
        res.status(500).json({
            message: "Unexpected error creating device",
            error: error.message,
        });
    }
}

const getAllDevices = async (req, res) => {
    try {
        const devices = await findAllDevices();
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching devices",
            error: error.message,
        });
    }
}

const getDeviceById = async (req, res) => {
    const { id } = req.params;
    try {
        const device = await findDeviceById(id);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        res.status(200).json(device);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching device",
            error: error.message,
        });
    }
}

const updateDeviceById = async (req, res) => {
    const { id } = req.params;
    const { roomId, nickname, deviceSerial, status } = req.body;

    try {
        const device = await updateDevice(id, roomId, nickname, deviceSerial, status);
        res.status(200).json({
            message: "Device updated successfully",
            device,
        });
    } catch (error) {
        res.status(500).json({
            message: "Unexpected error updating device",
            error: error.message,
        });
    }
}

const validateIoTDevice = async (req, res) => {
    const { cardSerial, deviceSerial } = req.body;
    //rule:
    // 1. cardSerial must be registered in the database and is active,
    // 2. deviceSerial must be registered in the database and is active,
    // 3. cardSerial and deviceSerial must be registered in the same room
    // 4. room must have an occupied status

    try {
        // Check if cardSerial is registered and active
        const card = await findCardBySerial(cardSerial);
        if (!card || card.status !== "active") {
            return res.status(400).json({ message: "Invalid or inactive cardSerial" });
        }

        // Check if deviceSerial is registered and active
        const device = await findDeviceBySerial(deviceSerial);
        if (!device || device.status !== "active") {
            return res.status(400).json({ message: "Invalid or inactive deviceSerial" });
        }

        // Check if both are in the same room
        if (card.roomId !== device.roomId) {
            return res.status(400).json({ message: "Card and Device are not in the same room" });
        }

        // Check if room is occupied
        const room = await findRoomById(card.roomId);
        if (room.status !== "occupied") {
            return res.status(400).json({ message: "Room is not occupied" });
        }

        res.status(200).json({
            message: "IoT device validated successfully",
            card,
            device,
        });

    } catch (error) {
        res.status(500).json({
            message: "Unexpected error validating IoT device",
            error: error.message,
        });
    }
}



const deleteDeviceById = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteDevice(id);
        res.status(200).json({
            message: "Device deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Unexpected error deleting device",
            error: error.message,
        });
    }
}

module.exports = {
    createDevice,
    getAllDevices,
    getDeviceById,
    updateDeviceById,
    deleteDeviceById,
    validateIoTDevice,
};