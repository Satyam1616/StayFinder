import React, { useContext } from "react";
import {
  Hotel,
  MapPin,
  Star,
  Edit,
  Trash2,
  Eye,
  Plus,
  HotelIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AuthContext";
import useHostListings from "../hooks/useHostListings.js";
import { useSocketContext } from "../context/SocketContext";

const HostDashboard = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { socket } = useSocketContext();
  const navigate = useNavigate();

  const {
    requests: listings,
    loading,
    handleDeleteListing,
  } = useHostListings(backendUrl, token, socket);
  console.log(listings);

  const totalListings = listings.length;
  const averagePrice =
    listings.reduce((sum, listing) => sum + listing.price, 0) /
    (totalListings || 1);
  const averageRating =
    listings.reduce((sum, listing) => sum + listing.rating, 0) /
    (totalListings || 1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Host Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your listings and view performance
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Listings Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Hotel className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Listings
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 mt-1">
                {totalListings}
              </h2>
            </div>
          </div>
        </div>

        {/* Average Price Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <span className="text-xl font-bold">$</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Average Price</p>
              <h2 className="text-2xl font-semibold text-green-600 mt-1">
                ${averagePrice.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        {/* Average Rating Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Average Rating
              </p>
              <h2 className="text-2xl font-semibold text-purple-600 mt-1">
                {averageRating.toFixed(1)}/5
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-sm md:text-xl font-bold flex items-center gap-2">
            <Hotel className="w-5 h-5 text-indigo-600" />
            Your Listings
          </h3>
          <button
            onClick={() => navigate("/host/create-listing")}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-sm md:text-md"
          >
            <Plus className="w-4 h-4" />
            Add New Listing
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center h-60vh">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border border-primary mx-auto mb-3"></div>
            <p className="text-gray-500">Loading your listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="p-8 text-center">
            <Hotel className="w-10 h-10 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No listings yet!</p>
            <button
              onClick={() => navigate("/host/create-listing")}
              className="my-4 px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Create Your First Listing
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {listings.map((listing) => (
              <li
                key={listing._id}
                className="p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-40 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={
                        listing.images?.[0] ||
                        "https://via.placeholder.com/300x200?text=Property"
                      }
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {listing.title}
                        </h4>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {listing.location || "City, Country"}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">
                          {listing.rating?.toFixed(1) || "New"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Price</p>
                        <p className="font-medium">${listing.price}/night</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Bedrooms</p>
                        <p>{listing.bedrooms}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Bathrooms</p>
                        <p>{listing.bathrooms}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {listing?.amenities
                        ? Object.entries(listing.amenities)
                            .filter(([_, value]) => value)
                            .map(([key]) => (
                              <span
                                key={key}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize"
                              >
                                {key}
                              </span>
                            ))
                        : null}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex sm:flex-col gap-2 sm:w-32">
                    <button
                      onClick={() => navigate(`/listings/${listing._id}`)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/host/edit-listing/${listing._id}`)
                      }
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteListing(listing._id)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;
