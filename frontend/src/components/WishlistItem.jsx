import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Star,
  Trash2,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Utensils,
  Tv,
  Flame,
  Thermometer,
} from "lucide-react";
import useWishlist from "../hooks/useWishlist.js";
import AppContext from "../context/AuthContext.jsx";

const WishlistCard = ({ listing: property }) => {
  const { token } = useContext(AppContext);
  const { toggleWishlist } = useWishlist(token);

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "kitchen":
        return <Utensils className="w-4 h-4" />;
      case "parking":
        return <Car className="w-4 h-4" />;
      case "tv":
        return <Tv className="w-4 h-4" />;
      case "fireplace":
        return <Flame className="w-4 h-4" />;
      case "heating":
        return <Thermometer className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const availableAmenities = Object.entries(property.amenities)
    .filter(([_, value]) => value)
    .map(([key, _]) => key);

  return (
    <div className="group w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 mb-4 last:mb-0">
      <div className="flex flex-col md:flex-row h-auto md:h-40 group-hover:md:h-[400px] transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
        {/* Image Section - Fixed Width */}
        <div
          className="w-full md:w-64 h-48 md:h-full group-hover:md:h-[400px] relative overflow-hidden 
    transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
          style={{
            willChange: "height, transform",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <Link to={`/listing/${property._id}`} className="block h-full">
            <img
              src={property.images[0] || "/placeholder-property.jpg"}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {property.rating || "New"}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(property._id);
              }}
              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all hover:scale-110"
              title="Remove from wishlist"
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </button>
          </div>
        </div>

        {/* Content Section - Flexible Width */}
        <div className="flex-1 p-4 md:p-5 transition-all duration-300">
          {/* Always Visible Content */}
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <Link to={`/listings/${property._id}`}>
                <h3 className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-1">
                  {property.title}
                </h3>
              </Link>

              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="text-sm truncate">{property.location}</span>
              </div>

              {/* Basic Info - Always Visible */}
              <div className="mt-3 flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{property.bedrooms} beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{property.bathrooms} baths</span>
                </div>
              </div>

              {/* Price - Always Visible */}
              <div className="mt-3">
                <span className="text-lg font-bold text-red-600">
                  ${property.price.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm ml-1">/ night</span>
              </div>
            </div>

            {/* Expanded Content - Visible on Hover */}
            <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-96 overflow-hidden transition-all duration-500 ease-in-out mt-3 space-y-3">
              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-3">
                {property.description}
              </p>

              {/* Amenities */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Amenities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableAmenities.slice(0, 6).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
                <div>
                  <span className="font-medium">Check-in:</span>{" "}
                  {property.houseRules.checkInTime}
                </div>
                <div>
                  <span className="font-medium">Check-out:</span>{" "}
                  {property.houseRules.checkOutTime}
                </div>
              </div>

              {/* View Button */}
              <div className="pt-3">
                <Link
                  to={`/listings/${property._id}`}
                  className="inline-block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                >
                  View Property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
