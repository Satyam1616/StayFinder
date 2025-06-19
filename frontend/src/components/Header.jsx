import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  User,
  Heart,
  Home,
  LogOut,
  List,
  ListCheckIcon,
  Plus,
  PlusCircle,
  Album,
  Book,
  ClipboardList,
  BedDouble,
} from "lucide-react";
import { useContext } from "react";
import AppContext from "../context/AuthContext.jsx";
import BecomeHostModal from "./BecomeHostModal.jsx";
import { useEffect } from "react";
import useWishlist from "../hooks/useWishlist.js";

export const Header = () => {
  const { token, user, setToken, setUser } = useContext(AppContext);

  const { wishlist } = useWishlist(token);
  // const { getWishlist } = useWishlist();
  // const [showHostModal, setShowHostModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
    setShowUserMenu(false);
  };

  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* <BecomeHostModal
        isOpen={showHostModal}
        onClose={() => setShowHostModal(false)}
        onBecomeHost={async () => {
          setShowHostModal(false);
        }}
      /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">StayFinder</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                onClick={() => navigate("/all-listings")}
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div
                  className="relative cursor-pointer group"
                  onClick={() => navigate("/wishlist")}
                >
                  {/* Heart Icon with smoother animation */}
                  <Heart className="h-6 w-6 text-gray-600 group-hover:text-red-500 transition-all duration-300 ease-in-out transform group-hover:scale-110" />

                  {/* Enhanced Count Badge */}
                  {wishlist && wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold flex items-center justify-center h-5 w-5 rounded-full shadow-md group-hover:animate-pulse">
                      {wishlist.length > 9 ? "9+" : wishlist.length}
                    </span>
                  )}

                  {/* Optional tooltip */}
                  {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    My Wishlist
                  </div> */}
                </div>

                <Link
                  to="/host/create-listing"
                  className="flex items-center space-x-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Listing</span>
                </Link>
                {/* ) : (
                  <Link
                    to="/"
                    onClick={() => setShowHostModal(true)}
                    // onClick={handleClick}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm  hover:bg-gray-100 focus:ring-gray-500  inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none"
                  >
                    Become a Host
                  </Link>
                )} */}

                <Link
                  to="/host/dashboard"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm hover:bg-gray-100 focus:ring-gray-500  inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none"
                >
                  Host Dashboard
                </Link>

                <div className="relative " ref={dropdownRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center hover:cursor-pointer space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span>{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="inline h-4 w-4 mr-2" />
                        Profile
                      </Link>

                      <Link
                        to="/host/guest-booking"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BedDouble className="inline h-4 w-4 mr-2" />
                        Guest Bookings
                      </Link>

                      <Link
                        to="/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <ClipboardList className="inline h-4 w-4 mr-2" />
                        My Trips
                      </Link>

                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Heart className="inline h-4 w-4 mr-2" />
                        Wishlist
                      </Link>
                      <hr className="my-1 border-0.5 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="inline h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ">
                    Log in
                  </button>
                </Link>
                <Link to="/register">
                  <button className=" px-4 py-2 text-sm  bg-primary text-white  hover:bg-primary-hover inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div>
            {" "}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div
            ref={mobileMenuRef}
            className="md:hidden border-t border-gray-100 py-4"
          >
            <div className="space-y-3">
              {/* Mobile search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  onClick={() => navigate("/all-listings")}
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {user ? (
                <>
                  <Link
                    to="/host/dashboard"
                    className="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Host Dashboard
                  </Link>

                  <Link
                    to="/host/guest-booking"
                    className="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Guest Bookings
                  </Link>

                  <Link
                    to="/bookings"
                    className="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My Trips
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link to="/login">
                    <button
                      onClick={() => setShowMobileMenu(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 "
                    >
                      Log in
                    </button>
                  </Link>
                  <Link to="/register">
                    <button
                      onClick={() => setShowMobileMenu(false)}
                      className=" px-4 py-2 text-sm  bg-primary text-white  hover:bg-primary-hover inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 "
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
