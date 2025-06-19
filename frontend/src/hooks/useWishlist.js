// import { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner"; // Using sonner for toasts (same as your other hooks)
// import { useContext } from "react";
// // import AppContext from "../context/AuthContext";
// import { useEffect } from "react";

// const useWishlist = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   //const { token } = useContext(AppContext);
//   // const toggleWishlist = async (listingId) => {
//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     const { data } = await axios.post(
//   //       `${backendUrl}/api/user/toggle-wishlist`,
//   //       { listingId },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`, // Recommended security practice
//   //         },
//   //       }
//   //     );

//   //     if (data.success) {
//   //       setWishlist((prev) =>
//   //         prev.includes(listingId)
//   //           ? prev.filter((id) => id !== listingId)
//   //           : [...prev, listingId]
//   //       );
//   //       toast.success(
//   //         data.message ||
//   //           (wishlist.includes(listingId)
//   //             ? "Removed from wishlist"
//   //             : "Added to wishlist")
//   //       );
//   //     } else {
//   //       throw new Error(data.message || "Failed to update wishlist");
//   //     }
//   //     return data;
//   //   } catch (error) {
//   //     const errorMsg = error.response?.data?.message || error.message;
//   //     setError(errorMsg);
//   //     toast.error(errorMsg);
//   //     console.error("Wishlist toggle error:", error);
//   //     throw error;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const toggleWishlist = async (token, id) => {
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/user/toggle-wishlist`,
//         { listingId: id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(data);
//       if (data.success) {
//         setWishlist((prev) =>
//           prev?.includes(id)
//             ? prev?.filter((itemId) => itemId !== id)
//             : [...prev, id]
//         );
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error toggling wishlist:", error);
//     }
//   };
//   const getWishlist = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/get-wishlist", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(data);
//       if (data.success) {
//         setWishlist(data.wishlist);
//         console.log(data, data.wishlist);
//       } else {
//         console.log(data.message);
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching listings:", error);
//     }
//   };
//   // const getWishlist = async (backendUrl, token) => {
//   //   setLoading(true);
//   //   setError(null);
//   //   try {
//   //     const { data } = await axios.get(`${backendUrl}/api/user/get-wishlist`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`, // Best practice for JWT
//   //       },
//   //     });
//   //     console.log(data);
//   //     if (data.success) {
//   //       setWishlist(data.wishlist);
//   //       console.log("Wishlist data:", data.wishlist);
//   //     } else {
//   //       setError(data.message);
//   //       toast.error(data.message);
//   //     }
//   //     return data.wishlist; // Return for optional chaining
//   //   } catch (error) {
//   //     const errorMsg =
//   //       error.response?.data?.message || "Failed to fetch wishlist";
//   //     setError(errorMsg);
//   //     toast.error(errorMsg);
//   //     console.error("Wishlist error:", error);
//   //     throw error; // Re-throw for component handling
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   useEffect(() => {
//     if (token) {
//       getWishlist();
//     }
//   }, [token]);
//   console.log(wishlist);
//   return {
//     wishlist,
//     loading,
//     error,
//     toggleWishlist,
//     getWishlist,
//     // Optional helper methods:
//     clearWishlist: () => setWishlist([]),
//     count: wishlist.length,
//   };
// };

// export default useWishlist;
// import React from "react";

// const useWishlist = () => {
//   return;
// };

// export default useWishlist;
// src/hooks/useWishlist.js
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import useWishlistStore from "../zustand/useWishlistStore.js";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useWishlist = (token) => {
  const { wishlist, setWishlist, toggleItem, clearWishlist, loading, error } =
    useWishlistStore();

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
