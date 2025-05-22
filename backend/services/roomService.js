const {Room, RoomType, sequelize} = require('../models');

const insertRoom = async (roomTypeId, roomNumber, floor, status) => {
    const transaction = await sequelize.transaction();
    
    try {
        const room = await Room.create(
            {
                roomTypeId,
                roomNumber,
                floor,
                status
            },
            { transaction }
        );

        await transaction.commit();
        return room;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}

const findAllRooms = async () => {
  try {
    const rooms = await Room.findAll({
      attributes: { exclude: ['roomTypeId'] },  // exclude FK when including full roomType
      include: [
        {
          model: RoomType,
          as: 'roomType',
          attributes: ['id', 'name', 'basePrice', 'maxOccupancy'],
        }
      ],
      order: [['createdAt', 'DESC']],
    });
    return rooms;
  } catch (error) {
    throw error;
  }
};

const changeRoomStatus = async (id, status) => {
    const transaction = await sequelize.transaction();

    try {
        //find the room first if it exists
        const room = await Room.findOne({
            where: { id },
            transaction
        });

        if (!room) {
            throw new Error('Room not found');
        }

        //update the room status
        room.status = status;
        await room.save({ transaction });
        await transaction.commit();
        return room;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}


const findAllAvailableRooms = async () => {
    try {
        const rooms = await Room.findAll({
            where: { status: 'available' },
            include: [
                {
                    model: RoomType,
                    as: 'roomType',
                    attributes: ['id', 'name'],
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return rooms;
    } catch (error) {
        throw error;
    }
}

const findAllOccupiedRooms = async () => {
    try {
        const rooms = await Room.findAll({
            where: { status: 'occupied' },
            include: [
                {
                    model: RoomType,
                    as: 'roomType',
                    attributes: ['id', 'name'],
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return rooms;
    } catch (error) {
        throw error;
    }
}

const findAllMaintenanceRooms = async () => {
    try {
        const rooms = await Room.findAll({
            where: { status: 'maintenance' },
            include: [
                {
                    model: RoomType,
                    as: 'roomType',
                    attributes: ['id', 'name'],
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return rooms;
    } catch (error) {
        throw error;
    }
}

const findAllReservedRooms = async () => {
    try {
        const rooms = await Room.findAll({
            where: { status: 'reserved' },
            include: [
                {
                    model: RoomType,
                    as: 'roomType',
                    attributes: ['id', 'name'],
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return rooms;
    } catch (error) {
        throw error;
    }
}

const findRoomById = async (id) => {
    try {
        const room = await Room.findOne({
            where: { id },
            include: [
                {
                    model: RoomType,
                    as: 'roomType',
                    attributes: ['id', 'name'],
                }
            ]
        });
        return room;
    } catch (error) {
        throw error;
    }
}

const findRoomByRoomNumber = async (roomNumber) => {
    try {
        const room = await Room.findOne({
            where: { roomNumber },
            include: [
                {
                    model: RoomType,
                    as: 'roomType',
                    attributes: ['id', 'name'],
                }
            ]
        });
        return room;
    } catch (error) {
        throw error;
    }
}

const updateRoom = async (id, roomTypeId, roomNumber, floor, status) => {
    const transaction = await sequelize.transaction();

    try {

        const room = await Room.findByPk(id);

        if (!room) {
            throw new Error('Room not found');
        }

        room.roomTypeId = roomTypeId;
        room.roomNumber = roomNumber;
        room.floor = floor;
        room.status = status;
        await room.save({ transaction });

        await transaction.commit();
       return room;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const removeRoom = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const room = await Room.destroy({
            where: { id },
            transaction
        });

        await transaction.commit();
        return room;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    insertRoom,
    findAllRooms,
    findAllAvailableRooms,
    findAllOccupiedRooms,
    findAllMaintenanceRooms,
    findAllReservedRooms,
    findRoomById,
    findRoomByRoomNumber,
    changeRoomStatus,
    updateRoom,
    removeRoom
}