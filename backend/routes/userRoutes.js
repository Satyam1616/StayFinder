import express from "express";
import {
  register,
  login,
  addlisting,
  getMyBookings,
  cancelListing,
  getUserProfile,
  toggleWishList,
  updateProfile,
  changePassword,
  getMyWishlist,
  getHostListings,
  getHostGuestListings,
} from "../controllers/userController.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add-listing", protectedRoute, addlisting);

// Profile routes
router.get("/profile", protectedRoute, getUserProfile);
router.put("/profile/update", protectedRoute, updateProfile);
router.put("/profile/change-password", protectedRoute, changePassword);

// Bookings
router.get("/my-bookings", protectedRoute, getMyBookings);
router.put("/cancel-listing", protectedRoute, cancelListing);

// Wishlist
router.get("/my-wishlist", protectedRoute, getMyWishlist);
router.post("/toggle-wishlist", protectedRoute, toggleWishList);

router.get("/host-listings", protectedRoute, getHostListings);
router.get("/host-guest-listings", protectedRoute, getHostGuestListings);

export default router;
