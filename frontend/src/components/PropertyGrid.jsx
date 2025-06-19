import React, { useContext } from "react";
import { Star, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

import useWishlist from "../hooks/useWishlist.js";
import AppContext from "../context/AuthContext";

const PropertyGrid = ({ listings, loading }) => {
  const { token } = useContext(AppContext);
  const { wishlist, toggleWishlist } = useWishlist(token);
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse hover:shadow-md transition-all"
          >
            {/* Image placeholder */}
            <div className="relative h-64 bg-gray-200 overflow-hidden">
              <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm">
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Content placeholder */}
            <div className="p-5">
              {/* Title & Rating */}
              <div className="flex justify-between items-start mb-2">
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-6"></div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
              </div>

              {/* Capacity */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-6"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-6"></div>
                </div>
              </div>

              {/* Price & Button */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <div className="h-3 bg-gray-200 rounded w-12 mb-1"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-9 bg-gray-200 rounded-lg w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {listings.map((property, index) => (
        <PropertyCard
          key={index}
          listing={property}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
