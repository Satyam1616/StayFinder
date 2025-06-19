import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AuthContext";
import {
  Calendar,
  Wallet,
  TrendingUp,
  Ban,
  CheckCircle2,
  Users,
  Bed,
  Bath,
  CoinsIcon,
} from "lucide-react";
import { Hotel, MapPin, BadgeCheck, Clock, XCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserListings from "../hooks/useUserListings.js";
import { useSocketContext } from "../context/SocketContext.jsx";
import axios from "axios";

const MyBooking = () => {
  const { token, backendUrl, user } = useContext(AppContext);
  const { userListings, loading } = useUserListings(token, backendUrl);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const { socket } = useSocketContext();

  useEffect(() => {
    setListings(userListings);
  }, [userListings]);

  const totalSpent = listings.reduce((sum, booking) => {
    if (["confirmed", "approved"].includes(booking.status)) {
      return sum + booking.totalPrice;
    }
    return sum;
  }, 0);

  useEffect(() => {
    if (!socket) return;

    socket.on("booking-updated", (data) => {
      setListings((prev) =>
        prev.map((req) =>
          req._id === data.bookingId ? { ...req, status: data.status } : req
        )
      );
    });

    return () => {
      socket.off("booking-updated");
    };
  }, [socket]);

  const handleCancelBooking = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-booking",
        { bookingId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setListings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status: data.status } : booking
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Welcome back, {user?.name}!
      </h1>
      <p className="text-gray-600 mb-6">Manage your bookings and account</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-blue-50 rounded-lg text-blue-600">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Total Bookings
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-1">
                {listings.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-green-50 rounded-lg text-green-600">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Total Spent
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-green-600 mt-1">
                ${totalSpent.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-purple-50 rounded-lg text-purple-600">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Upcoming Trips
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mt-1">
                {
                  listings.filter((b) => new Date(b.startDate) > new Date())
                    .length
                }
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100">
          <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Hotel className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            Your Bookings
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center h-60vh">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border border-primary mx-auto mb-3"></div>
            <p className="text-gray-500">Loading your bookings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-10 h-10 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No bookings Yet!</p>
            <button
              onClick={() => navigate("/")}
              className="my-4 px-4 sm:px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {listings.map((booking) => {
              const startDate = new Date(booking.startDate);
              const endDate = new Date(booking.endDate);
              const nights = Math.ceil(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={booking._id}
                  className="w-full bg-white rounded-lg overflow-hidden border border-gray-100 mb-3 sm:mb-4"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image Section */}
                    <div className="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden">
                      <img
                        src={
                          booking.images?.[0] ||
                          "https://via.placeholder.com/300x200?text=Property"
                        }
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-4 sm:p-5">
                      {/* Changed parent flex container to use items-start */}
                      <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {" "}
                          {/* Added min-w-0 to prevent text overflow */}
                          <h4 className="font-medium text-gray-900 truncate">
                            {" "}
                            {/* Added truncate for long titles */}
                            {booking.listing.title}
                          </h4>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />{" "}
                            {/* Added flex-shrink-0 */}
                            <span className="truncate">
                              {" "}
                              {/* Added truncate for long locations */}
                              {booking.listing.location || "City, Country"}
                            </span>
                          </div>
                        </div>

                        {/* Status badge - now will stay tight to content */}
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "approved"
                              ? "bg-blue-100 text-blue-700"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : booking.status === "rejected"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status?.charAt(0).toUpperCase() +
                            booking.status?.slice(1)}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div>
                            <p className="text-gray-500">Check-in</p>
                            <p>{startDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div>
                            <p className="text-gray-500">Check-out</p>
                            <p>{endDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Total</p>
                          <p className="font-medium">${booking.totalPrice}</p>
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-500">
                        {nights} night{nights !== 1 ? "s" : ""} stay
                      </div>

                      {/* Amenities - Only show on larger screens */}
                      <div className="mt-3 hidden sm:flex flex-wrap gap-2">
                        {Object.entries(booking.listing.amenities || {})
                          .filter(([_, value]) => value)
                          .map(([key]) => (
                            <span
                              key={key}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize"
                            >
                              {key}
                            </span>
                          ))}
                      </div>

                      {/* Cancel Button - Always visible */}
                      <div className="mt-4">
                        {(booking.status === "approved" ||
                          booking.status === "pending" ||
                          booking.status === "confirmed") && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className={`w-full sm:w-auto px-4 py-2 rounded-lg transition-colors ${
                              booking.status === "confirmed"
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {booking.status === "confirmed"
                              ? "Cancel Booking"
                              : booking.status === "approved"
                              ? "Cancel"
                              : "Cancel Request"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
