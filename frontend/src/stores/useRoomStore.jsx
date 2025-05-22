import { create } from "zustand";
import axiosClient from "../api/axiosClient";

const useRoomStore = create((set, get) => ({
  rooms: [],
  dashboardStats: [],

  fetchDashboardStats: async () => {
    try {
      const response = await axiosClient.get("/rooms/dashboard-stat");
      set({ dashboardStats: response.data });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  },

  fetchRooms: async () => {
    try {
      const response = await axiosClient.get("/rooms");
      set({ rooms: response.data });
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  },

    addRoom: async (room) => {
        try {
        await axiosClient.post("/rooms", room);
        await get().fetchRooms();

        } catch (error) {
        console.error("Error adding room:", error);
        }
    },

    updateRoom: async (id, updatedRoom) => {
        try {
        await axiosClient.put(`/rooms/${id}`, updatedRoom);
        await get().fetchRooms();
        
       
        } catch (error) {
        console.error("Error updating room:", error);
        }
    },

    deleteRoom: async (id) => {
        try {
        await axiosClient.delete(`/rooms/${id}`);
        await get().fetchRooms();
        } catch (error) {
        console.error("Error deleting room:", error);
        }
    },
}));

export default useRoomStore;
