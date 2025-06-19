import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import AppContext from "../context/AuthContext";

const useUserListings = (token, backendUrl) => {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);
  const fetchUserListings = async () => {
    try {
      console.log("Fetching with:", backendUrl, token);
      // getUserListings();
      console.log(token);
      const { data } = await axios.get(backendUrl + "/api/user/my-listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserListings(data.listings);
      } else {
        console.log("errorrr");
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
      console.log(token);
    }
  }, [token]);

  return { userListings, loading, fetchUserListings };
};

export default useUserListings;
