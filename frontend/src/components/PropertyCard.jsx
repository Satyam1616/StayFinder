import { Star, MapPin, Users, Bed, Bath, Heart } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AuthContext";

const PropertyCard = ({ listing, wishlist, toggleWishlist }) => {
  const navigate = useNavigate();

  const { user } = useContext(AppContext);

  // const { wishlist, toggleWishlist } = useWishlist(token);

  // useEffect(() => {
  //   getWishlist(backendUrl, token);
  // }, [token]);

  const wishlistItem = wishlist?.includes(listing._id);
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onClick={() => navigate(`/listings/${listing._id}`)}
    >
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={listing.images[0] || "/placeholder-property.jpg"}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {user && (
          <div
            className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(listing._id);
            }}
          >
            {wishlistItem ? (
              <Heart
                className="w-5 h-5 text-gray-700 hover:text-[#ff385c] cursor-pointer"
                fill="red"
                stroke="red"
              />
            ) : (
              <Heart className="w-5 h-5 text-gray-700 hover:text-[#ff385c] cursor-pointer" />
            )}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {listing.title}
          </h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-[#ff385c] text-[#ff385c] mr-1" />
            <span className="text-sm font-medium">
              {listing.rating || "New"}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>

        {/* Amenities Summary */}
        <div className="flex flex-wrap gap-2 mt-3">
          {listing.amenities.wifi && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">WiFi</span>
          )}
          {listing.amenities.kitchen && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              Kitchen
            </span>
          )}
          {listing.amenities.parking && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              Parking
            </span>
          )}
          {listing.amenities.tv && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">TV</span>
          )}
        </div>

        {/* Capacity */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{listing.guests} guests</span>
          </div>
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            <span>{listing.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            <span>{listing.bathrooms} baths</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm">Per night</p>
            <p className="text-xl font-bold text-[#ff385c]">
              ${listing.price.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/listings/${listing._id}`}
            className="px-4 py-2 bg-[#ff385c] hover:bg-[#e0274d] text-white rounded-lg transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
