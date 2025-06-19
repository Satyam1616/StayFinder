import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Tv,
  CookingPot,
  ParkingCircle,
  Flame,
  Mountain,
  Coffee,
  Dog,
  CigaretteOff,
  CalendarClock,
  Cigarette,
  Columns4,
  CircleSlash2,
  FishOff,
  PartyPopper,
  Loader,
  ArrowLeft,
  Heart,
} from "lucide-react";
import BookingWidget from "../components/BookingWidget";
import { Calendar } from "../components/ui/Calender";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../context/AuthContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TailSpinLoader from "../components/Loader";
import MapView from "../components/MapView";
import useWishlist from "../hooks/useWishlist";
const Listing = () => {
  const { user } = useContext(AppContext);
  const { token } = useContext(AppContext);
  const { toggleWishlist, wishlist } = useWishlist(token);

  const { id } = useParams();
  console.log(id);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(backendUrl + `/api/listings/${id}`);
        console.log(response);
        setListing(response.data.listing);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);
  console.log(listing);
  if (loading && !listing)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpinLoader size={50} />;
      </div>
    );
  if (!listing)
    return <div className="text-center py-20">Listing not found</div>;
  const wishlistItem = wishlist.includes(listing._id);
  return (
    listing && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-2 px-2 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500  inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none "
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </button>
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {listing.title}
          </h1>
          <div className="flex justify-between">
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-4">
                <Star className="w-5 h-5 fill-[#ff385c] text-[#ff385c] mr-1" />
                <span className="font-medium">{listing.rating}</span>
                <span className="text-gray-500 ml-1">
                  ({listing.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-500 mr-1" />
                <span className="text-gray-700">{listing.location}</span>
              </div>
            </div>
            {user && (
              <div
                className="bg-white/90 rounded-full p-2.5 px-4 shadow-sm flex cursor-pointer transition-all duration-300 hover:bg-white/70 hover:backdrop-blur-md hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(listing._id);
                }}
              >
                {wishlistItem ? (
                  <div className="flex items-center gap-2">
                    <Heart
                      className="w-5 h-5 text-[#ff385c]"
                      fill="#ff385c"
                      stroke="#ff385c"
                    />
                    <p className="text-sm font-medium text-gray-700">Saved</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-gray-700" />
                    <p className="text-sm font-medium text-gray-700">Save</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* ⛱️ Image Carousel */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                showStatus={false}
                dynamicHeight={false}
              >
                {listing.images?.map((url, index) => (
                  <div key={index}>
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="rounded-xl"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            {/* Property Highlights */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4">About this property</h2>
              <p className="text-gray-700 mb-6">{listing.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-[#ff385c] mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{listing.guests}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bed className="w-6 h-6 text-[#ff385c] mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-medium">{listing.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="w-6 h-6 text-[#ff385c] mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-medium">{listing.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mountain className="w-6 h-6 text-[#ff385c] mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">View</p>
                    <p className="font-medium">Ocean</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listing.amenities?.wifi && (
                  <div className="flex items-center">
                    <Wifi className="w-5 h-5 text-[#ff385c] mr-2" />
                    <span>High-speed WiFi</span>
                  </div>
                )}
                {listing.amenities?.kitchen && (
                  <div className="flex items-center">
                    <CookingPot className="w-5 h-5 text-[#ff385c] mr-2" />
                    <span>Fully equipped kitchen</span>
                  </div>
                )}
                {listing.amenities?.parking && (
                  <div className="flex items-center">
                    <ParkingCircle className="w-5 h-5 text-[#ff385c] mr-2" />
                    <span>Free parking</span>
                  </div>
                )}
                {listing.amenities?.tv && (
                  <div className="flex items-center">
                    <Tv className="w-5 h-5 text-[#ff385c] mr-2" />
                    <span>Smart TV</span>
                  </div>
                )}
                {listing.amenities?.fireplace && (
                  <div className="flex items-center">
                    <Flame className="w-5 h-5 text-[#ff385c] mr-2" />
                    <span>Fireplace</span>
                  </div>
                )}
                {listing.amenities?.bbq && (
                  <div className="flex items-center">
                    <Columns4 className="w-5 h-5 text-[#ff385c] mr-2" />
                    <span>BBQ grill</span>
                  </div>
                )}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4">House Rules</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CalendarClock className="w-5 h-5 text-[#ff385c] mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium">Check-in/Check-out</p>
                    <p className="text-gray-600">
                      {listing.houseRules?.checkInTime} /{" "}
                      {listing.houseRules?.checkOutTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  {listing.houseRules?.smoking ? (
                    <Cigarette className="w-5 h-5 text-[#ff385c] mr-2 mt-0.5" />
                  ) : (
                    <CigaretteOff className="w-5 h-5 text-[#ff385c] mr-2 mt-0.5" />
                  )}
                  <p className="text-gray-600">
                    {listing.houseRules?.smoking
                      ? "Smoking allowed"
                      : "No smoking"}
                  </p>
                </div>
                <div className="flex items-start">
                  {listing.houseRules?.pets ? (
                    <Dog className="w-5 h-5 text-[#ff385c] mr-2 mt-0.5" />
                  ) : (
                    <FishOff className="w-5 h-5 text-[#ff385c] mr-2 mt-0.5" />
                  )}
                  <p className="text-gray-600">
                    {listing.houseRules?.pets ? "Pets allowed" : "No pets"}
                  </p>
                </div>
                <div className="flex items-start">
                  {listing.houseRules?.parties ? (
                    <PartyPopper className="w-5 h-5 text-[#ff385c] mr-2 mt-0.5" />
                  ) : (
                    <CircleSlash2 className="w-5 h-5 text-[#ff385c] mr-2 mt-0.5" />
                  )}
                  <p className="text-gray-600">
                    {listing.houseRules?.parties
                      ? "Parties allowed"
                      : "No parties/events"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="sticky top-20 h-fit">
            {/* Booking Form */}
            <BookingWidget listing={listing} />
          </div>
        </div>
        <div className=" my-6 lg:my-8">
          <h1 className="text-2xl md:text-2xl font-bold my-2">
            Where you'll be
          </h1>
          <p className="text-md font-medium ">{listing.location}</p>
          <MapView listing={listing} />
        </div>
      </div>
    )
  );
};

export default Listing;
