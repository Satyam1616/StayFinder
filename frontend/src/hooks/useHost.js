import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const useHost = (loadUserData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHost, setIsHost] = useState(false);

  const becomeHost = async (backendUrl, token) => {
    setIsLoading(true);
    setError(null);
    console.log("Attempting to become host with token:", token);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/become-host`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Better practice than just 'token'
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsHost(true);
        await loadUserData(); // Refresh user data
        console.log("Host conversion successful:", data);
      } else {
        throw new Error(data.message || "Failed to become host");
      }
      return data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Error converting to host";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Host conversion error:", error);
      throw error; // Re-throw for component to handle if needed
    } finally {
      setIsLoading(false);
    }
  };

  return { becomeHost, isLoading, error, isHost };
};

export default useHost;
