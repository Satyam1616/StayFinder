import { Heart, Hotel, MapPin } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import WishlistItem from "./WishlistItem.jsx";
import useListings from "../hooks/useListings.js";
import useWishlist from "../hooks/useWishlist.js";
import AppContext from "../context/AuthContext.jsx";
import TailSpinLoader from "./Loader.jsx";

const Wishlist = () => {
  const { listings } = useListings();
  const { token } = useContext(AppContext);
  const { wishlist, loading } = useWishlist(token);

  const wishlistListings = listings.filter((listing) =>
    wishlist?.includes(listing._id)
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center ">
        <TailSpinLoader />
      </div>
    );
  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Your Wishlist
        </h1>
        <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm">
          {wishlistListings.length}{" "}
          {wishlistListings.length === 1 ? "item" : "items"}
        </span>
      </div>

      {wishlistListings.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <Heart className="mx-auto w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mb-6">
            Save listings you love by clicking the heart icon
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <div className="">
          {wishlistListings.map((listing) => (
            <WishlistItem listing={listing} wishlist={wishlist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
