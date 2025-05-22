import { create } from "zustand";
import axiosClient from "../api/axiosClient";

const useCardStore = create((set, get) => ({
  cards: [],
  fetchCards: async () => {
    try {
      const response = await axiosClient.get("/iot-cards");
      set({ cards: response.data });
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  },
  addCard: async (card) => {
    try {
      await axiosClient.post("/iot-cards", card);
      await get().fetchCards();
    } catch (error) {
      console.error("Error adding card:", error);
    }
  },
  updateCard: async (id, updatedCard) => {
    try {
      await axiosClient.put(`/iot-cards/${id}`, updatedCard);
      await get().fetchCards();
    } catch (error) {
      console.error("Error updating card:", error);
    }
  },
  deleteCard: async (id) => {
    try {
      await axiosClient.delete(`/iot-cards/${id}`);
      await get().fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  },
}));

export default useCardStore;
