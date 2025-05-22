import { create } from "zustand";
import axiosClient from "../api/axiosClient";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: undefined,
      login: async (username, password) => {
        try {
          const response = await axiosClient.post("/auth/login", {
            username,
            password,
          });
          set({ user: response.data.user });
          return { success: true, user: response.data.user };
        } catch (error) {
          console.error("Login failed:", error);

          const message = error.response?.data?.message || "Login failed";
          return { success: false, message };
        }
      },

        register: async (username, email, password) => {
        try {
          const response = await axiosClient.post("/auth/register", {
            username,
            email,
            password,
          });
          set({ user: response.data.user });
          return { success: true, user: response.data.user };
        } catch (error) {
          console.error("Registration failed:", error);

          const message = error.response?.data?.message || "Registration failed";
          return { success: false, message };
        }
      },
      logout: async () => {
        try {
          const response = await axiosClient.post("/auth/logout");
          if (response.status === 200) {
            set({ user: null });
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      checkAuth: async () => {
        try {
          const response = await axiosClient.get("/auth/session");
          set({ user: response.data.user });
        } catch (error) {
          console.error("Session expired, logging out:", error);
          set({ user: null });
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state, storeApi) => {
        if (state) {
          storeApi.getState().checkAuth();
        }
      },
    }
  )
);

export default useAuthStore;
