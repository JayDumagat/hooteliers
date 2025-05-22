// useBookingStore.js
import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import useRoomStore from "./useRoomStore"; // Import the other store

const useBookingStore = create((set, get) => ({
  bookings: [],

  fetchBookings: async () => {
    try {
      const response = await axiosClient.get("/bookings");
      set({ bookings: response.data });

      // Example: After fetching bookings, also fetch rooms
      const roomStore = useRoomStore.getState(); // Access the room store
      await roomStore.fetchRooms(); // Call room store function if needed
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  },

  addBooking: async (bookingData) => {
    try {
      await axiosClient.post("/bookings", bookingData);
      await get().fetchBookings();
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  },

  updateBooking: async (id, bookingData) => {
    try {
      await axiosClient.put(`/bookings/${id}`, bookingData);
      await get().fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  },

  updateBookingStatus: async (id, values) => {
    try {
      await axiosClient.put(`/bookings/${id}/status`, values);
      await get().fetchBookings();
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  },

  deleteBooking: async (id) => {
    try {
      await axiosClient.delete(`/bookings/${id}`);
      await get().fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  },
}));

export default useBookingStore;
