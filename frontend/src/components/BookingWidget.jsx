import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Calendar } from "../components/ui/Calender.jsx";
import { CalendarRange, Star } from "lucide-react";
import axios from "axios";
import AppContext from "../context/AuthContext.jsx";

const BookingWidget = ({ listing }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const { token, backendUrl, user, loadUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select dates", {
        description: "Choose your check-in and check-out dates",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/add-listing`,
        {
          listingId: listing._id,
          startDate: checkIn,
          endDate: checkOut,
          adults: guests,
          specialRequests: "Nothing special",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        navigate("/bookings");
      }
    } catch (error) {
      console.error("Error booking listing:", error);
      toast.error("Booking failed", {
        description: error.response?.data?.message || "Please try again later",
      });
    }
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="sticky top-6 h-fit">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-2xl font-bold text-[#ff385c]">
              ${listing.price}
            </p>
            <p className="text-gray-500">per night</p>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-[#ff385c] text-[#ff385c] mr-1" />
            <span>{listing.rating}</span>
            <span className="text-gray-500 ml-1">({listing.reviewCount})</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="border border-gray-200 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <input
                id="check-in"
                type="date"
                value={formatDateForInput(checkIn)}
                className="border-none cursor-pointer text-sm text-gray-800"
                onChange={(e) => setCheckIn(new Date(e.target.value))}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <input
                id="check-out"
                type="date"
                value={formatDateForInput(checkOut)}
                className="border-none cursor-pointer text-sm text-gray-800"
                onChange={(e) => setCheckOut(new Date(e.target.value))}
                min={
                  checkIn
                    ? formatDateForInput(checkIn)
                    : new Date().toISOString().split("T")[0]
                }
              />
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-500">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full focus:outline-none"
            >
              {[...Array(listing.guests)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} guest{i !== 0 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 overflow-x-auto sm:overflow-visible">
            <div className="inline-block min-w-full sm:min-w-0">
              <Calendar
                mode="range"
                selected={{ from: checkIn, to: checkOut }}
                onSelect={(range) => {
                  setCheckIn(range?.from);
                  setCheckOut(range?.to);
                }}
                className="rounded-md border border-gray-200 text-sm sm:text-base"
                disabled={(date) => date < new Date()}
              />
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={!user}
            className="rounded-md font-medium px-2 py-2 text-sm text-white w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 cursor-pointer duration-200 transition-colors disabled:opacity-70"
          >
            {user ? "Reserve" : "Login to Reserve"}
          </button>

          <p className="text-center text-sm text-gray-500">
            You won't be charged yet
          </p>

          {checkIn && checkOut && (
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  ${listing.price} x{" "}
                  {Math.ceil(
                    (checkOut.getTime() - checkIn.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  nights
                </span>
                <span>
                  $
                  {listing.price *
                    Math.ceil(
                      (checkOut.getTime() - checkIn.getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cleaning fee</span>
                <span>$120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span>$85</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>
                  $
                  {listing.price *
                    Math.ceil(
                      (checkOut.getTime() - checkIn.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) +
                    120 +
                    85}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
