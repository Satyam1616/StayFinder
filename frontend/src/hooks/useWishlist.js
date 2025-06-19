import axios from "axios";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import useWishlistStore from "../zustand/useWishlistStore.js";
import AppContext from "../context/AuthContext.jsx";

const useWishlist = (token) => {
  const { wishlist, setWishlist, toggleItem, clearWishlist, loading, error } =
    useWishlistStore();
  const { backendUrl } = useContext(AppContext);
  // Fetch wishlist from backend
  const getWishlist = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        console.log(data.wishlist);
        setWishlist(data.wishlist);
      } else {
        toast.error(data.message || "Failed to fetch wishlist");
      }
    } catch (error) {
      toast.error("Error fetching wishlist", error.message);
    }
  };

  // Toggle wishlist item (with backend update)
  const toggleWishlist = async (listingId) => {
    try {
      console.log(token);
      const { data } = await axios.post(
        `${backendUrl}/api/user/toggle-wishlist`,
        { listingId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toggleItem(listingId);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to toggle wishlist");
      }
    } catch {
      toast.error("Error toggling wishlist");
    }
  };

  // Auto-fetch on hook usage (optional)
  useEffect(() => {
    if (token) {
      getWishlist();
    }
  }, [token]);

  return {
    wishlist,
    getWishlist,
    toggleWishlist,
    clearWishlist,
    loading,
    error,
  };
};

export default useWishlist;
