const {
  insertBooking,
  findAllBookings,
  findBookingByCustomerId,
  findBookingById,
  updateBooking,
  deleteBooking,
  updateBookingCheckInDate,
  updateBookingCheckOutDate,
 
} = require("../services/bookingService");
const { insertCustomer, findCustomerByName } = require("../services/customerService");

const { changeRoomStatus} = require("../services/roomService");

const createBooking = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    reservationId,
    roomId,
    checkInDateTime,
    checkOutDateTime,
    price,
    status,
    notes,
    phoneNumber,
    address,
    dateOfBirth,
    gender,
  } = req.body;

  // Basic validation before processing
  if (!firstName || !lastName || !email || !roomId) {
    return res.status(400).json({
      message: "Missing required fields",
      missing: {
        firstName: !firstName,
        lastName: !lastName,
        email: !email,
        roomId: !roomId,
      },
    });
  }

  const bookingStatus = status || "pending"; // default fallback if not provided

  try {
    // Insert customer
    let customer;
    try {
      customer = await insertCustomer(
        firstName,
        lastName,
        email,
        phoneNumber || null,
        address || null,
        dateOfBirth || null,
        gender || null,
        "active"
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error inserting customer",
        error: error.message,
      });
    }


    // Insert booking
    let booking;
    try {
      booking = await insertBooking(
        customer.id,
        reservationId || null,
        roomId,
        price || 0,
        bookingStatus,
        notes || null
      );
    } catch (error) {
      return res.status(500).json({
        message: "Error inserting booking",
        error: error.message,
        details: {
          status: bookingStatus,
          roomId,
          checkInDateTime,
          checkOutDateTime,
          price,
        },
      });
    }

    // Change room status
    const isRoomStatusChanged = await changeRoomStatus(roomId, "occupied");

    if (!isRoomStatusChanged) {
      return res.status(500).json({
        message: "Booking created but failed to change room status",
      });
    }

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unexpected error creating booking",
      error: error.message,
    });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const bookings = await findAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await findBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booking", error: error.message });
  }
};

const getBookingByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const bookings = await findBookingByCustomerId(customerId);
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

const { updateCustomer } = require("../services/customerService");

const updateBookingById = async (req, res) => {
  const { id } = req.params;
  const {
    customerId,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    dateOfBirth,
    gender,
    roomId,
    previousRoomId, // <- NEW
    checkInDate,
    checkOutDate,
    status,
    reservationId,
    price,
    notes,
  } = req.body;

  if (!customerId || !firstName || !lastName || !email || !roomId || !status) {
    return res.status(400).json({
      message: "Missing required fields",
      missing: {
        customerId: !customerId,
        firstName: !firstName,
        lastName: !lastName,
        email: !email,
        roomId: !roomId,
        status: !status,
      },
    });
  }

  try {
    // 1. Update the customer
    await updateCustomer(
      customerId,
      firstName,
      lastName,
      email,
      phoneNumber || null,
      address || null,
      dateOfBirth || null,
      gender || null,
      "active"
    );

    // 2. Update the booking
    const booking = await updateBooking(
      id,
      customerId,
      reservationId || null,
      roomId,
      checkInDate || null,
      checkOutDate || null,
      price || 0,
      status,
      notes || null
    );

    // 3. Change room statuses (if the room was changed)
    if (previousRoomId && previousRoomId !== roomId) {
      await changeRoomStatus(previousRoomId, "available");
      await changeRoomStatus(roomId, "occupied");
    }

    res.status(200).json({
      message: "Booking and customer updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking",
      error: error.message,
    });
  }
};


const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { datetime, status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
   if(status === "checked_in") {
      booking = await updateBookingCheckInDate(id, datetime);
    } else if(status === "checked_out") {
      booking = await updateBookingCheckOutDate(id, datetime);
      const roomstatus = await changeRoomStatus(booking.roomId, "available");
    }
    res.status(200).json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking status", error: error.message });
  }
};



const deleteBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await deleteBooking(id);
    res.status(200).json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingByCustomerId,
  updateBookingById,
  deleteBookingById,
  updateBookingStatus,
};
