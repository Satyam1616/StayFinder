import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import AppContext from "../context/AuthContext";

const useUserListings = (token, backendUrl) => {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUserListings = async () => {
    try {
      console.log("Fetching with:", backendUrl, token);

      const { data } = await axios.get(backendUrl + "/api/user/my-listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserListings(data.listings);
      } else {
        toast.error(data.message || "Failed to load listings");
      }
    } catch (error) {
      console.error("Error fetching user listings:", error);
      toast.error("Error fetching listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserListings();
    }
  }, [token]);

  return { userListings, loading, fetchUserListings };
};

export default useUserListings;
