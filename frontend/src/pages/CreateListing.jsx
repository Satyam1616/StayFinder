import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, MapPin } from "lucide-react";
import axios from "axios";
import AppContext from "../context/AuthContext";
import { toast } from "sonner";

export default function CreateListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { backendUrl, token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    guests: "",
    category: "",
    bedrooms: "",
    bathrooms: "",
    latitude: "",
    longitude: "",
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

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const categories = [
    "Beach",
    "Mountain",
    "City",
    "Countryside",
    "Luxury",
    "Budget",
    "Historical",
    "Adventure",
  ];

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
      setLoading(false);
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (key === "amenities" || key === "houseRules") {
          Object.keys(formData[key]).forEach((subKey) => {
            formDataToSend.append(`${key}.${subKey}`, formData[key][subKey]);
          });
        } else if (key !== "images") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/listings/create-listing`,
        formDataToSend,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
        navigate("/host/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error(error.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      price: "",
      guests: "",
      category: "",
      bedrooms: "",
      bathrooms: "",
      latitude: "",
      longitude: "",
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
    setImages([]);
    setImagePreviews([]);
  };

  const isValidCoordinate = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= -180 && num <= 180;
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
    const files = Array.from(e.target.files).slice(0, 5); // Limit to 5 images
    if (files.length + images.length > 5) {
      toast.warning("You can upload a maximum of 5 images");
      return;
    }

    setImages([...images, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]); // Clean up memory
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/host/dashboard")}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#ff385c] transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Listing
            </h1>
            <p className="text-gray-600 mb-6">
              Fill out the form below to list your property on StayFinder
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900  pb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                    placeholder="Cozy Mountain Cabin, Beachfront Villa, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                    placeholder="Describe your property in detail..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                      placeholder="City, State or City, Country"
                    />
                  </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                      placeholder="e.g. -74.0060"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Between -180 and 180
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per night ($) *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        name="price"
                        required
                        min="1"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                      />
                    </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900  pb-2">
                  Property Images
                </h2>
                <p className="text-gray-600">
                  Upload high-quality images of your property (max 5 images)
                </p>

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
                    className="flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#ff385c] transition-colors"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG up to 5MB each
                    </p>
                  </label>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group h-40">
                          <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover rounded-lg"
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
                <h2 className="text-xl font-semibold text-gray-900  pb-2">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(formData.amenities).map(
                    ([amenity, value]) => (
                      <label
                        key={amenity}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-[#ff385c] transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name={`amenities.${amenity}`}
                          checked={value}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-gray-300 text-[#ff385c] focus:ring-[#ff385c]"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {amenity.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* House Rules */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900  pb-2">
                  House Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Allowed
                    </h3>
                    <div className="space-y-3">
                      {["pets", "parties", "smoking"].map((rule) => (
                        <label
                          key={rule}
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-[#ff385c] transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name={`houseRules.${rule}`}
                            checked={formData.houseRules[rule]}
                            onChange={handleChange}
                            className="h-5 w-5 rounded border-gray-300 text-[#ff385c] focus:ring-[#ff385c]"
                          />
                          <span className="text-sm text-gray-700 capitalize">
                            {rule === "pets"
                              ? "Pets allowed"
                              : rule === "parties"
                              ? "Parties/events allowed"
                              : "Smoking allowed"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Check-in/Check-out
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Check-in Time
                        </label>
                        <select
                          name="houseRules.checkInTime"
                          value={formData.houseRules.checkInTime}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
                        >
                          {[
                            "12:00",
                            "13:00",
                            "14:00",
                            "15:00",
                            "16:00",
                            "17:00",
                          ].map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ff385c] focus:border-[#ff385c]"
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
                    className="px-6 py-3 bg-[#ff385c] text-white rounded-lg hover:bg-[#e03148] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Listing...
                      </>
                    ) : (
                      "Create Listing"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
