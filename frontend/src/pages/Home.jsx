import React, { useEffect } from "react";
import DarkModeToggle from "../components/DarkmodeToggle";
import HeroSection from "../components/home/HeroSection.jsx";
import { ArrowRight, HomeIcon, User } from "lucide-react";
import Testimonials from "../components/home/Testimonials.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import PropertyCard from "../components/PropertyCard";
import { useContext } from "react";
import AppContext from "../context/AuthContext";
import { Calendar } from "../components/ui/Calender";
import MapView from "../components/MapView";
import { ScrollContext } from "../context/ScrollContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BecomeHostModal from "../components/BecomeHostModal";
import useListings from "../hooks/useListings.js";
import useWishlist from "../hooks/useWishlist.js";
import TailSpinLoader from "../components/Loader.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import DestinationHighlights from "../components/home/DestinationHighlights.jsx";
import HostBenefits from "../components/home/HostBenefits.jsx";

const Home = () => {
  const { token } = useContext(AppContext);
  const { listings, loading } = useListings();
  const currentListings = listings.slice(1, 10);
  const { wishlist, toggleWishlist } = useWishlist(token);
  console.log(loading);

  const { hostingRef } = useContext(ScrollContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for scroll flag in both state and hash for redundancy
    const shouldScroll =
      location.state?.scrollToHostSection ||
      window.location.hash === "#hosting-section";

    if (shouldScroll) {
      const scrollToSection = () => {
        const section =
          hostingRef?.current || document.getElementById("hosting-section");

        if (section) {
          // Calculate position accounting for fixed headers
          const headerOffset = 80; // Adjust based on your header height
          const sectionPosition = section.getBoundingClientRect().top;
          const offsetPosition =
            sectionPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Clean up URL and state
          window.history.replaceState({}, "", window.location.pathname);
          navigate(location.pathname, { replace: true, state: {} });
        }
      };

      // Try immediately, then fallback with timeout
      requestAnimationFrame(() => {
        scrollToSection();
        setTimeout(scrollToSection, 300); // Fallback delay
      });
    }
  }, [location, navigate, hostingRef]);
  const CardLoading = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse hover:shadow-md transition-all">
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
    );
  };
  return (
    <div>
      <HeroSection />
      <div className="mx-auto px-4 md:px-6 lg:px-8 py-8 w-full md:w-10/12">
        {/* Heading section with View All link */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Popular Destinations <span className="text-[#ff385c]">.</span>
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Discover amazing places for your next adventure
            </p>
          </div>
          <Link
            to="/all-listings"
            className="text-red-500 hover:text-red-700 font-medium text-sm md:text-base whitespace-nowrap flex items-center gap-1"
          >
            View All Properties
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? [...Array(6)].map((_, index) => <CardLoading key={index} />)
            : currentListings.map((listing) => (
                <PropertyCard
                  key={listing._id}
                  listing={listing}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))}
        </div>
      </div>
      <HowItWorks />
      <WhyChooseUs />
      <DestinationHighlights />
      <Testimonials />
      <HostBenefits />
      <div
        ref={hostingRef}
        id="hosting-section"
        className=" bg-gradient-to-r from-red-600 via-red-500 to-red-700 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl  font-bold mb-4">
              Become a StayFinder host
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Turn your extra space into extra income. Join thousands of hosts
              who are earning money by sharing their homes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$2,000+</div>
                <div className="opacity-90">Average monthly earnings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="opacity-90">Average host rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="opacity-90">Active hosts worldwide</div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                onClick={() => navigate("/host/create-listing")}
                className=" bg-white text-red-600 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg
             transition-all duration-500 ease-out shadow-sm hover:shadow-lg
             border border-gray-200/80 hover:border-red-200 flex items-center group
             hover:scale-[1.02] active:scale-100 cursor-pointer"
              >
                Start hosting today
                <ArrowRight
                  className="ml-2 w-5 h-5 transition-all duration-500 ease-out
              group-hover:translate-x-1 group-hover:text-red-700"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
