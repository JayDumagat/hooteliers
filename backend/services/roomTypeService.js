const {RoomType, sequelize} = require('../models');

const insertRoomType = async (name, description, maxOccupancy, basePrice, amenities = []) => {
    const transaction = await sequelize.transaction();

    try {

         const existing = await RoomType.findOne({
            where: { name },
            paranoid: false, // include soft-deleted
            transaction
        });

        if (existing) {
            if (existing.deletedAt) {
                // Restore the deleted room type
                await existing.restore({ transaction });

                // Update it with new details
                existing.description = description;
                existing.maxOccupancy = maxOccupancy;
                existing.basePrice = basePrice;
                existing.amenities = amenities;

                await existing.save({ transaction });

                await transaction.commit();
                return existing;
            } else {
                await transaction.rollback();
                throw new Error("Room type with this name already exists.");
            }
        }

        // If not exists at all, create a new one
        const roomType = await RoomType.create(
            {
                name,
                description,
                maxOccupancy,
                basePrice,
                amenities
            },
            { transaction }
        );

        await transaction.commit();
        return roomType;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const findAllRoomTypes = async () => {
    try {
        const roomTypes = await RoomType.findAll({
            order: [['createdAt', 'DESC']]
        });
        return roomTypes;
    } catch (error) {
        throw error;
    }
}

const findRoomTypeById = async (id) => {
    try {
        const roomType = await RoomType.findByPk(id);
        return roomType;
    } catch (error) {
        throw error;
    }
}


const findRoomTypeByName = async (name) => {
    try {
        const roomType = await RoomType.findOne({
            where: { name }
        });
        return roomType;
    } catch (error) {
        throw error;
    }
}

const updateRoomType = async (id, name, description, maxOccupancy, basePrice, amenities) => {
    const transaction = await sequelize.transaction();

    try {
        const roomType = await RoomType.findByPk(id);

        if (!roomType) {
            throw new Error('Room type not found');
        }

        roomType.name = name;
        roomType.description = description;
        roomType.maxOccupancy = maxOccupancy;
        roomType.basePrice = basePrice;
        roomType.amenities = amenities;

        await roomType.save({ transaction });
        await transaction.commit();
        return roomType;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const removeRoomType = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const roomType = await RoomType.findByPk(id);

        if (!roomType) {
            throw new Error('Room type not found');
        }

        await roomType.destroy({ transaction });
        await transaction.commit();
        return roomType;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    insertRoomType,
    findAllRoomTypes,
    findRoomTypeById,
    findRoomTypeByName,
    updateRoomType,
    removeRoomType
}