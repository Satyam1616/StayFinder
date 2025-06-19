// src/store/wishlistStore.js
import { create } from "zustand";

const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  setWishlist: (items) => set({ wishlist: items }),
  toggleItem: (id) => {
    const current = get().wishlist;
    if (current.includes(id)) {
      set({ wishlist: current.filter((item) => item !== id) });
    } else {
      set({ wishlist: [...current, id] });
    }
  },
  clearWishlist: () => set({ wishlist: [] }),
}));

export default useWishlistStore;
