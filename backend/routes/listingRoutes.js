import express from "express";
import {
  createListing,
  deleteListing,
  getListingById,
  getListings,
  getHostListings,
  editListing,
} from "../controllers/listingController.js";
import upload from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.get("/", getListings);
router.get("/host-listings", authUser, getHostListings);
router.get("/:id", getListingById);
router.post("/create", authUser, upload.array("images", 5), createListing);
router.put("/:id", authUser, upload.array("images", 10), editListing);
router.delete("/:id", authUser, deleteListing);

export default router;
