const {Device, Room, sequelize} = require('../models');

const insertDevice = async (roomId, nickname, deviceSerial, status) => {
    const transaction = await sequelize.transaction();
    
    try {
        const device = await Device.create(
            {
                roomId,
                nickname,
                deviceSerial,
                status
            },
            { transaction }
        );

        await transaction.commit();
        return device;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const findAllDevices = async () => {
    try {
        const devices = await Device.findAll(
            {
                include: [
                    {
                        model: Room,
                        as: 'room',
                        attributes: ['id', 'roomNumber'],
                    }
                ],
                order: [['createdAt', 'DESC']],
            }
        );
        return devices;
    } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
    }
}

const findDeviceBySerial = async (deviceSerial) => {
    //check if deviceSerial is registerd in the database and has a status of "active"
    try {
        const device = await Device.findOne({
            where: { deviceSerial, status: 'active' },
        });
        return device;
    } catch (error) {
        console.error("Error fetching device:", error);
        throw error;
    }
}


const findDeviceById = async (id) => {
    try {
        const device = await Device.findOne({
            where: { id },
        });
        return device;
    } catch (error) {
        console.error("Error fetching device:", error);
        throw error;
    }
};

const updateDevice = async (id, roomId, nickname, deviceSerial, status) => {
    const transaction = await sequelize.transaction();

    try {
        const device = await Device.findOne({
            where: { id },
        });

        if (!device) {
            throw new Error("Device not found");
        }

        device.roomId = roomId;
        device.nickname = nickname;
        device.deviceSerial = deviceSerial;
        device.status = status;

        await device.save({ transaction });
        await transaction.commit();
        return device;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const deleteDevice = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const device = await Device.findOne({
            where: { id },
        });

        if (!device) {
            throw new Error("Device not found");
        }

        await device.destroy({ transaction });
        await transaction.commit();
        return device;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    insertDevice,
    findAllDevices,
    findDeviceBySerial,
    findDeviceById,
    updateDevice,
    deleteDevice
}