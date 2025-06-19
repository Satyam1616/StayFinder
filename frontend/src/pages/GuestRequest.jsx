import React, { useContext } from "react";

import AppContext from "../context/AuthContext";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Ban,
  BadgeCheck,
} from "lucide-react";

import { Socket } from "socket.io-client";
import useHostGuestRequests from "../hooks/useHostGuestRequests";
import { useSocketContext } from "../context/SocketContext";
const GuestRequest = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { socket } = useSocketContext();

  const { requests, loading, updateStatus } = useHostGuestRequests(
    backendUrl,
    token,
    socket
  );

  const statusStyles = {
    approved: "bg-emerald-50 text-emerald-700",
    cancelled: "bg-red-50 text-red-700",
    rejected: "bg-rose-50 text-rose-700",
    pending: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
          Guest Booking Requests
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Review and manage incoming booking requests from guests
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-amber-500" />
            Pending Requests
            <span className="ml-auto bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {requests.length} {requests.length === 1 ? "request" : "requests"}
            </span>
          </h3>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-gray-500">Loading booking requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-gray-700 font-medium mb-1">
              No pending requests
            </h4>
            <p className="text-gray-500 text-sm">
              You'll see new booking requests here when guests book your
              property
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {requests.map((booking) => {
              const startDate = new Date(booking.startDate);
              const endDate = new Date(booking.endDate);
              const nights = Math.round(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
              );

              return (
                <li
                  key={booking._id}
                  className="p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-48 h-36 bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <img
                        src={
                          booking.images?.[0] ||
                          "https://via.placeholder.com/300x200?text=Property"
                        }
                        alt="Property"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {booking.listing.title}
                          </h4>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                            <span className="truncate">
                              {booking.listing.location ||
                                "Location not specified"}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 w-fit ${
                            statusStyles[booking.status] || statusStyles.pending
                          }`}
                        >
                          {booking.status === "approved" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : booking.status === "cancelled" ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : booking.status === "rejected" ? (
                            <Ban className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-1 bg-gray-100 rounded-full">
                            <Calendar className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Check-in</p>
                            <p className="font-medium text-gray-800">
                              {startDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-1 bg-gray-100 rounded-full">
                            <Calendar className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Check-out</p>
                            <p className="font-medium text-gray-800">
                              {endDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-1 bg-gray-100 rounded-full">
                            <BadgeCheck className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Duration</p>
                            <p className="font-medium text-gray-800">
                              {nights} {nights === 1 ? "night" : "nights"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-1 bg-gray-100 rounded-full">
                            <span className="w-4 h-4 text-gray-500 font-bold text-xs flex items-center justify-center">
                              $
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Total</p>
                            <p className="font-medium text-gray-800">
                              ${booking.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.status === "pending" && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          <button
                            onClick={() =>
                              updateStatus(booking._id, "approved")
                            }
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Approve Request
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(booking._id, "rejected")
                            }
                            className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GuestRequest;
