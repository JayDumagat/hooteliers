import {create} from "zustand";

export const useFilterStore = create((set) => ({
  searchQuery: "",
  filters: {},

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: {}, searchQuery: "" }),
}));

export default useFilterStore;
