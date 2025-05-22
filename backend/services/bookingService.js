const {
  Booking,
  Customer,
  Reservation,
  RoomType,
  Room,
  sequelize,
} = require("../models");

const insertBooking = async (
  customerId,
  reservationId,
  roomId,
  price,
  status,
  notes
) => {
  const transaction = await sequelize.transaction();

  try {
    const booking = await Booking.create(
      {
        customerId,
        reservationId,
        roomId,
        price,
        status,
        notes,
      },
      { transaction }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const findAllBookings = async () => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["firstName", "lastName", "email"],
        },
        {
          model: Room,
          as: "room",
          attributes: ["roomNumber"],
          include: [
            {
              model: RoomType,
              as: "roomType",
              attributes: ["name"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return bookings;
  } catch (error) {
    throw error;
  }
};

const findBookingById = async (id) => {
  try {
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["firstName", "lastName"],
        },
        {
          model: Room,
          as: "room",
          attributes: ["roomNumber"],
          include: [
            {
              model: RoomType,
              as: "roomType",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    return booking;
  } catch (error) {
    throw error;
  }
};

const findBookingByCustomerId = async (customerId) => {
  try {
    const bookings = await Booking.findAll({
      where: { customerId },
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["firstName", "lastName"],
        },
        {
          model: Room,
          as: "room",
          attributes: ["roomNumber"],
          include: [
            {
              model: RoomType,
              as: "roomType",
              attributes: ["name"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return bookings;
  } catch (error) {
    throw error;
  }
};

const updateBookingCheckInDate = async (id, checkInDate) => {
  const transaction = await sequelize.transaction();

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    booking.checkInDate = checkInDate;
    booking.status = "checked_in";

    await booking.save({ transaction });
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

const updateBookingCheckOutDate = async (id, checkOutDate) => {
   const transaction = await sequelize.transaction();

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    booking.checkOutDate = checkOutDate;
    booking.status = "checked_out";

    await booking.save({ transaction });
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

const updateBooking = async (
  id,
  customerId,
  reservationId,
  roomId,
  checkInDate,
  checkOutDate,
  price,
  status,
  notes
) => {
  const transaction = await sequelize.transaction();

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    booking.customerId = customerId;
    booking.reservationId = reservationId;
    booking.roomId = roomId;
    booking.checkInDate = checkInDate;
    booking.checkOutDate = checkOutDate;
    booking.price = price;
    booking.notes = notes;
    booking.status = status;

    await booking.save({ transaction });
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteBooking = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    await booking.destroy({ transaction });
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  insertBooking,
  findAllBookings,
  findBookingById,
  findBookingByCustomerId,
  updateBooking,
  deleteBooking,
  updateBookingCheckInDate,
  updateBookingCheckOutDate,
};
