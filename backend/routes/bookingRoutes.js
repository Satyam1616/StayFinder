import express from "express";
import {
  approveBooking,
  getHostGuestRequests,
} from "../controllers/bookingController.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/approve", protectedRoute, approveBooking);
router.get("/guest-requests", protectedRoute, getHostGuestRequests);

export default router;
