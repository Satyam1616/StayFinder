import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, X, MapPin } from "lucide-react";
import axios from "axios";
import AppContext from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { CustomToast } from "../components/CustomToast";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { backendUrl, token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    price: "",
    guests: "",
    bedrooms: "",
    bathrooms: "",
    category: "",
    amenities: {
      wifi: false,
      kitchen: false,
      parking: false,
      tv: false,
      fireplace: false,
      balcony: false,
      heating: false,
      bbq: false,
    },
    houseRules: {
      smoking: false,
      pets: false,
      parties: false,
      checkInTime: "15:00",
      checkOutTime: "11:00",
    },
  });

  const categoryOptions = [
    "Beach",
    "Mountain",
    "City",
    "Countryside",
    "Luxury",
    "Budget",
    "Historical",
    "Adventure",
  ];

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch listing data on component mount
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/listings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          const listing = data.listing;
          setFormData({
            title: listing.title,
            description: listing.description,
            location: listing.location,
            latitude: listing.latitude,
            longitude: listing.longitude,
            price: listing.price.toString(),
            guests: listing.guests.toString(),
            bedrooms: listing.bedrooms.toString(),
            bathrooms: listing.bathrooms.toString(),
            category: listing.category || "",
            amenities: listing.amenities,
            houseRules: listing.houseRules,
          });
          setExistingImages(listing.images || []);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
        toast.error("Failed to load listing data");
      } finally {
        setFetching(false);
      }
    };

    fetchListing();
  }, [id, backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !isValidCoordinate(formData.latitude) ||
      !isValidCoordinate(formData.longitude)
    ) {
      toast.error(
        "Please enter valid latitude (-90 to 90) and longitude (-180 to 180)"
      );
      return;
    }
    try {
      const formDataToSend = new FormData();

      // Append all form data
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("guests", formData.guests);
      formDataToSend.append("bedrooms", formData.bedrooms);
      formDataToSend.append("bathrooms", formData.bathrooms);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("id", id);

      // Append amenities
      Object.keys(formData.amenities).forEach((key) => {
        formDataToSend.append(`amenities.${key}`, formData.amenities[key]);
      });

      // Append house rules
      Object.keys(formData.houseRules).forEach((key) => {
        formDataToSend.append(`houseRules.${key}`, formData.houseRules[key]);
      });

      // Append existing images that haven't been removed
      existingImages.forEach((imageUrl) => {
        formDataToSend.append("existingImages", imageUrl);
      });

      // Append new images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const { data } = await axios.put(
        `${backendUrl}/api/listings/edit-listing/${id}`,
        formDataToSend,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Listing updated successfully");
        navigate("/host/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Failed to update listing");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("amenities.")) {
      const amenityName = name.split(".")[1];
      setFormData({
        ...formData,
        amenities: {
          ...formData.amenities,
          [amenityName]: type === "checkbox" ? checked : value,
        },
      });
    } else if (name.startsWith("houseRules.")) {
      const ruleName = name.split(".")[1];
      setFormData({
        ...formData,
        houseRules: {
          ...formData.houseRules,
          [ruleName]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index) => {
    const newExistingImages = [...existingImages];
    newExistingImages.splice(index, 1);
    setExistingImages(newExistingImages);
  };

  const isValidCoordinate = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= -180 && num <= 180;
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-700">Loading listing data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/host/dashboard")}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-hover transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Edit Listing
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
            encType="multipart/form-data"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Basic Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Give your place a descriptive title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Describe your property in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="City, State or City, Country"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Latitude *
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    required
                    min="-90"
                    max="90"
                    step="0.000001"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="e.g. 40.7128"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Between -90 and 90
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Longitude *
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    required
                    min="-180"
                    max="180"
                    step="0.000001"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="e.g. -74.0060"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Between -180 and 180
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per night ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    required
                    min="1"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    required
                    min="1"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Guests *
                  </label>
                  <input
                    type="number"
                    name="guests"
                    required
                    min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Property Images
              </h2>
              <p className="text-gray-600">
                Upload new images or remove existing ones
              </p>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-700 mb-3">
                    Current Images
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {existingImages.map((imageUrl, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Existing ${index}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images */}
              <div className="flex flex-col space-y-4">
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center px-6 py-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-hover transition-colors"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                </label>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.keys(formData.amenities).map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 cursor-pointer capitalize"
                  >
                    <input
                      type="checkbox"
                      name={`amenities.${amenity}`}
                      checked={formData.amenities[amenity]}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-primary"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                House Rules
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {["smoking", "pets", "parties"].map((rule) => (
                  <label
                    key={rule}
                    className="flex items-center space-x-2 cursor-pointer capitalize"
                  >
                    <input
                      type="checkbox"
                      name={`houseRules.${rule}`}
                      checked={formData.houseRules[rule]}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-primary"
                    />
                    <span className="text-sm text-gray-700">Allow {rule}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Time
                  </label>
                  <select
                    name="houseRules.checkInTime"
                    value={formData.houseRules.checkInTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(
                      (time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Time
                  </label>
                  <select
                    name="houseRules.checkOutTime"
                    value={formData.houseRules.checkOutTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                  >
                    {["09:00", "10:00", "11:00", "12:00"].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/host/dashboard")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating Listing..." : "Update Listing"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
