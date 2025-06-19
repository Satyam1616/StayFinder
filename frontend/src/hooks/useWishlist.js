import axios from "axios";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import useWishlistStore from "../zustand/useWishlistStore.js";
import AppContext from "../context/AuthContext.jsx";
import { useState } from "react";

const useWishlist = (token) => {
  const { wishlist, setWishlist, toggleItem, clearWishlist, error } =
    useWishlistStore();
  const { backendUrl } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  // Fetch wishlist from backend
  const getWishlist = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
// import axios from "axios";
// import { useContext, useEffect, useCallback } from "react";
// import { toast } from "sonner";
// import useWishlistStore from "../zustand/useWishlistStore.js";
// import AppContext from "../context/AuthContext.jsx";

// const useWishlist = (token) => {
//   const {
//     wishlist,
//     setWishlist,
//     toggleItem,
//     clearWishlist,
//     setLoading,
//     setError,
//   } = useWishlistStore();
//   const { backendUrl } = useContext(AppContext);

//   // Fetch wishlist from backend
//   const getWishlist = useCallback(async () => {
//     if (!token) {
//       clearWishlist();
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/get-wishlist`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setWishlist(data.wishlist);
//       } else {
//         setError(data.message || "Failed to fetch wishlist");
//         toast.error(data.message || "Failed to fetch wishlist");
//       }
//     } catch (error) {
//       setError(error.message);
//       toast.error("Error fetching wishlist: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [token, backendUrl, setWishlist, clearWishlist, setLoading, setError]);

//   // Toggle wishlist item (with backend update)
//   const toggleWishlist = useCallback(
//     async (listingId) => {
//       if (!token) {
//         toast.error("Please login to manage your wishlist");
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const { data } = await axios.post(
//           `${backendUrl}/api/user/toggle-wishlist`,
//           { listingId },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (data.success) {
//           toggleItem(listingId);
//           toast.success(data.message);
//         } else {
//           setError(data.message || "Failed to toggle wishlist");
//           toast.error(data.message || "Failed to toggle wishlist");
//         }
//       } catch (error) {
//         setError(error.message);
//         toast.error("Error toggling wishlist: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [token, backendUrl, toggleItem, setLoading, setError]
//   );

//   // Auto-fetch on token change
//   useEffect(() => {
//     getWishlist();
//   }, [getWishlist]);

//   return {
//     wishlist,
//     getWishlist,
//     toggleWishlist,
//     clearWishlist,
//     loading: useWishlistStore((state) => state.loading),
//     error: useWishlistStore((state) => state.error),
//   };
// };

// export default useWishlist;import axios from "axios";
// import { useContext, useEffect, useCallback } from "react";
// import { toast } from "sonner";
// import useWishlistStore from "../zustand/useWishlistStore.js";
// import AppContext from "../context/AuthContext.jsx";
// import axios from "axios";

// const useWishlist = (token) => {
//   const { wishlist, setWishlist, toggleItem, clearWishlist, loading, error } =
//     useWishlistStore();
//   const { backendUrl } = useContext(AppContext);

//   // Enhanced store with loading states
//   const setLoading = (isLoading) =>
//     useWishlistStore.setState({ loading: isLoading });
//   const setError = (error) => useWishlistStore.setState({ error });

//   // Fetch wishlist from backend
//   const getWishlist = useCallback(async () => {
//     if (!token) {
//       clearWishlist();
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/get-wishlist`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (data.success) {
//         setWishlist(data.wishlist);
//       } else {
//         setError(data.message || "Failed to fetch wishlist");
//         toast.error(data.message || "Failed to fetch wishlist");
//       }
//     } catch (error) {
//       setError(error.message);
//       toast.error("Error fetching wishlist: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [token, backendUrl, setWishlist, clearWishlist]);

//   // Toggle wishlist item
//   const toggleWishlist = useCallback(
//     async (listingId) => {
//       if (!token) {
//         toast.error("Please login to manage your wishlist");
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const { data } = await axios.post(
//           `${backendUrl}/api/user/toggle-wishlist`,
//           { listingId },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (data.success) {
//           toggleItem(listingId);
//           toast.success(data.message);
//         } else {
//           setError(data.message || "Failed to toggle wishlist");
//           toast.error(data.message || "Failed to toggle wishlist");
//         }
//       } catch (error) {
//         setError(error.message);
//         toast.error("Error toggling wishlist: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [token, backendUrl, toggleItem]
//   );

//   // Auto-fetch on token change
//   useEffect(() => {
//     getWishlist();
//   }, [getWishlist]);

//   return {
//     wishlist,
//     getWishlist,
//     toggleWishlist,
//     clearWishlist,
//     loading,
//     error,
//   };
// };

// export default useWishlist;
