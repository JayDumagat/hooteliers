import { create } from "zustand";
import axiosClient from "../api/axiosClient";
const useRoomTypeStore = create((set, get) => ({
  roomTypes: [],

  fetchRoomTypes: async () => {
    try {
      const response = await axiosClient.get("/roomTypes");
      set({ roomTypes: response.data });
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  },

    addRoomType: async (newRoomType) => {
        try {
        await axiosClient.post("/roomTypes", newRoomType);
        await get().fetchRoomTypes();

        } catch (error) {
        console.error("Error adding room type:", error);
        }
    },

    updateRoomType: async (id, updatedRoomType) => {
        try {
        await axiosClient.put(`/roomTypes/${id}`, updatedRoomType);
        await get().fetchRoomTypes();
        } catch (error) {
        console.error("Error updating room type:", error);
        }
    },

    deleteRoomType: async (id) => {
        try {
        await axiosClient.delete(`/roomTypes/${id}`);
        await get().fetchRoomTypes();
        } catch (error) {
        console.error("Error deleting room type:", error);
        }
    },
}));

export default useRoomTypeStore;
