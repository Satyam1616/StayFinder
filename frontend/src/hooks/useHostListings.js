import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const useHostListings = (backendUrl, token, socket) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests manually or via useEffect
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/host-listings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(data.listings);
    } catch (error) {
      console.error("Error fetching booking requests:", error);
      toast.error("Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteListing = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/listings/delete-listing/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success("Listing deleted successfully");
        setRequests(requests.filter((listing) => listing._id !== id));
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    }
  };
  useEffect(() => {
    if (!backendUrl || !token) return;
    fetchRequests();

    if (!socket) return;

    const handleBookingUpdated = (data) => {
      if (data?.bookingId && data?.status) {
        setRequests((prev) =>
          prev.map((booking) =>
            booking._id === data.bookingId
              ? { ...booking, status: data.status }
              : booking
          )
        );
        // toast.success(data.message || "Booking status updated");
      }
    };

    socket.on("booking-updated", handleBookingUpdated);

    return () => {
      socket.off("booking-updated", handleBookingUpdated);
    };
  }, [backendUrl, token, socket]);

  return { requests, loading, handleDeleteListing };
};

export default useHostListings;
