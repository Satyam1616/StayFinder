import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const useHostGuestRequests = (backendUrl, token, socket) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/host-guest-listings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(data.listings || []);
    } catch (error) {
      console.error("Error fetching booking requests:", error);
      toast.error("Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/bookings/approve-booking`,
        { status: action, bookingId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        const updatedBooking = data.updatedBooking || {
          _id: id,
          status: action,
        };

        // Local update
        setRequests(
          (prev) =>
            prev
              .map((req) => (req._id === id ? { ...req, status: action } : req))
              .filter((req) => req._id !== id) // Remove after update
        );

        toast.success(data.message || "Booking status updated");

        // Emit socket update
        if (socket && updatedBooking) {
          socket.emit("booking-updated", {
            updatedBooking,
            message: `Booking has been ${updatedBooking.status}`,
          });
        }
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update booking status");
    }
  };

  useEffect(() => {
    if (!backendUrl || !token) return;

    fetchRequests();

    if (!socket) return;

    const handleBookingAdded = (data) => {
      if (data?.newBooking) {
        setRequests((prev) => [...prev, data.newBooking]);
      }
    };

    const handleBookingUpdated = (data) => {
      if (data?.updatedBookingss) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === data.updatedBooking._id
              ? { ...req, ...data.updatedBooking }
              : req
          )
        );
      }
    };

    socket.on("booking-added", handleBookingAdded);
    socket.on("booking-updated", handleBookingUpdated);

    return () => {
      socket.off("booking-added", handleBookingAdded);
      socket.off("booking-updated", handleBookingUpdated);
    };
  }, [backendUrl, token, socket]);

  return {
    requests,
    loading,
    fetchRequests,
    updateStatus,
  };
};

export default useHostGuestRequests;
