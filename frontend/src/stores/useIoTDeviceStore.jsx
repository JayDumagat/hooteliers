import { create } from "zustand";
import axiosClient from "../api/axiosClient";

const useIoTDeviceStore = create((set, get) => ({
  devices: [],
  fetchDevices: async () => {
    try {
      const response = await axiosClient.get("/iot-devices");
      set({ devices: response.data });
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  },
  addDevice: async (device) => {
    try {
      await axiosClient.post("/iot-devices", device);
      await get().fetchDevices();
    } catch (error) {
      console.error("Error adding device:", error);
    }
  },
  updateDevice: async (id, updatedDevice) => {
    try {
      await axiosClient.put(`/iot-devices/${id}`, updatedDevice);
      await get().fetchDevices();
    } catch (error) {
      console.error("Error updating device:", error);
    }
  },
  deleteDevice: async (id) => {
    try {
      await axiosClient.delete(`/iot-devices/${id}`);
      await get().fetchDevices();
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  },
}));

export default useIoTDeviceStore;
