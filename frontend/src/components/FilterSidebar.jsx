import React, { useState } from "react";
import {
  Search,
  Users,
  DollarSign,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  Mountain,
  Umbrella,
  Building2,
  Castle,
  TreePine,
  Landmark,
  Sparkles,
  Tent,
} from "lucide-react";

const FilterSidebar = ({ isOpen, onClose, onFilter, onClearFilters }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 1000,
    guests: 1,
    amenities: [],
    sortBy: "relevance",
  });

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    amenities: false,
    guests: true,
    sort: true,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    { id: "all", name: "All Properties", icon: <Home className="h-4 w-4" /> },
    { id: "Beach", name: "Beach", icon: <Umbrella className="h-4 w-4" /> },
    {
      id: "Mountain",
      name: "Mountain",
      icon: <Mountain className="h-4 w-4" />,
    },
    { id: "City", name: "City", icon: <Building2 className="h-4 w-4" /> },
    {
      id: "Countryside",
      name: "Countryside",
      icon: <TreePine className="h-4 w-4" />,
    },
    { id: "Luxury", name: "Luxury", icon: <Sparkles className="h-4 w-4" /> },
    { id: "Budget", name: "Budget", icon: <DollarSign className="h-4 w-4" /> },
    {
      id: "Historical",
      name: "Historical",
      icon: <Landmark className="h-4 w-4" />,
    },
    { id: "Adventure", name: "Adventure", icon: <Tent className="h-4 w-4" /> },
  ];

  const amenitiesList = [
    "wifi",
    "kitchen",
    "parking",
    "tv",
    "fireplace",
    "balcony",
    "heating",
    "bbq",
    "airConditioning",
    "pool",
    "hotTub",
    "garden",
    "workspace",
    "beachAccess",
    "mountainView",
  ];

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = filters.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];

    handleFilterChange("amenities", updatedAmenities);
  };

  const handleApplyFilters = () => {
    const finalFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    };
    onFilter(finalFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "all",
      minPrice: 0,
      maxPrice: 1000,
      guests: 1,
      amenities: [],
      sortBy: "relevance",
    };
    setFilters(clearedFilters);
    setPriceRange([0, 1000]);
    onClearFilters();
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value;

    if (index === 0 && value > priceRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < priceRange[0]) {
      newRange[0] = value;
    }

    setPriceRange(newRange);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-8rem)] lg:max-h-[600px] w-80 bg-white shadow-xl z-50 rounded-md overflow-y-auto [&::-webkit-scrollbar]:hidden
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Properties
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg "
                placeholder="Search by title or description..."
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <span className="text-sm font-medium text-gray-700">
                Property Type
              </span>
              {expandedSections.category ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {expandedSections.category && (
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleFilterChange("category", category.id)}
                    className={`p-3 rounded-lg border-2 transition-colors flex items-center space-x-2 ${
                      filters.category === category.id
                        ? "border-primary bg-red-50 text-primary-hover"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {category.icon}
                    <span className="text-xs font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <span className="text-sm font-medium text-gray-700">
                Price Range
              </span>
              {expandedSections.price ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {expandedSections.price && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    ${priceRange[0]} - ${priceRange[1]} per night
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Minimum Price
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceRangeChange(0, parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Maximum Price
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) =>
                        handlePriceRangeChange(1, parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Min
                    </label>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceRangeChange(0, parseInt(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm "
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Max
                    </label>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        handlePriceRangeChange(1, parseInt(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm "
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("guests")}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <span className="text-sm font-medium text-gray-700">Guests</span>
              {expandedSections.guests ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {expandedSections.guests && (
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleFilterChange(
                        "guests",
                        Math.max(1, filters.guests - 1)
                      )
                    }
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {filters.guests}
                  </span>
                  <button
                    onClick={() =>
                      handleFilterChange("guests", filters.guests + 1)
                    }
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">guests</span>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("amenities")}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <span className="text-sm font-medium text-gray-700">
                Amenities{" "}
                {filters.amenities.length > 0 && (
                  <span className="ml-1 text-xs bg-red-100 text-primary-hover px-2 py-1 rounded-full">
                    {filters.amenities.length}
                  </span>
                )}
              </span>
              {expandedSections.amenities ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {expandedSections.amenities && (
              <div className="max-h-48 overflow-y-auto space-y-2">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded border-gray-300 text-primary"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection("sort")}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <span className="text-sm font-medium text-gray-700">Sort By</span>
              {expandedSections.sort ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {expandedSections.sort && (
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <button
              onClick={handleApplyFilters}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
