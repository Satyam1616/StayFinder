// import { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import AppContext from "../context/AuthContext";
// import { useContext } from "react";
// import { useEffect } from "react";

// const useListings = () => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { backendUrl, token } = useContext(AppContext);
//   const getListings = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/listings`);

//       if (data.success) {
//         setListings(data.listings);
//         console.log("Listings fetched:", data.listings);
//       } else {
//         setError(data.message);
//         toast.error(data.message);
//       }
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message || "Failed to fetch listings";
//       setError(errorMessage);
//       toast.error(errorMessage);
//       console.error("Error fetching listings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getListings();
//   }, [token]);
//   return { listings, loading, error, getListings };
// };

// export default useListings;

import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import AppContext from "../context/AuthContext";

const useListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { backendUrl, token } = useContext(AppContext);

  // Memoize the function to prevent unnecessary recreations
  const getListings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${backendUrl}/api/listings`);

      if (data.success) {
        setListings(data.listings);
      } else {
        throw new Error(data.message || "Failed to fetch listings");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [backendUrl, token]);

  // Fetch listings on mount and when dependencies change
  useEffect(() => {
    if (token) {
      getListings();
    }
  }, [getListings, token]); // Now depends on memoized function

  return { listings, loading, error, getListings };
};

export default useListings;
