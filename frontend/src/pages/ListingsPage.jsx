import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import PropertyGrid from "../components/PropertyGrid";
import FilterSidebar from "../components/FilterSidebar";
import useListings from "../hooks/useListings.js";

export default function ListingsPage() {
  const [searchParams] = useSearchParams();
  //const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const { listings, getListings, loading } = useListings();
  useEffect(() => {
    getListings();
    console.log(activeFilters);
    console.log(filteredListings);
    // Initialize filters from URL params
    const initialFilters = {};
    const location = searchParams.get("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const guests = searchParams.get("guests");

    if (location) initialFilters.location = location;
    if (minPrice) initialFilters.minPrice = parseInt(minPrice);
    if (maxPrice) initialFilters.maxPrice = parseInt(maxPrice);
    if (guests) initialFilters.guests = parseInt(guests);

    if (Object.keys(initialFilters).length > 0) {
      setActiveFilters(initialFilters);
    }
  }, [searchParams]);

  useEffect(() => {
    if (listings.length > 0 && filteredListings.length === 0) {
      // Apply any active filters to the newly loaded listings
      if (Object.keys(activeFilters).length > 0) {
        applyFilters(activeFilters);
      } else {
        // If no filters, show all listings
        setFilteredListings(listings);
      }
    }
  }, [listings]);

  const convertAmenitiesToList = (amenitiesObj) => {
    return Object.entries(amenitiesObj)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);
  };

  const applyFilters = (filters) => {
    let filtered = [...listings];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchTerm) ||
          listing.description.toLowerCase().includes(searchTerm)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((listing) =>
        listing.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(
        (listing) =>
          listing.title
            .toLowerCase()
            .includes(filters.category.toLowerCase()) ||
          listing.description
            .toLowerCase()
            .includes(filters.category.toLowerCase())
      );
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(
        (listing) => listing.price >= filters.minPrice
      );
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (listing) => listing.price <= filters.maxPrice
      );
    }

    // Guests filter
    if (filters.guests) {
      filtered = filtered.filter((listing) => listing.guests >= filters.guests);
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter((listing) => {
        const listingAmenities = convertAmenitiesToList(listing.amenities);
        return filters.amenities.every((amenity) =>
          listingAmenities.includes(amenity)
        );
      });
    }

    // Sort filter
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filtered.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "popular":
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          // relevance - keep original order
          break;
      }
    }

    setFilteredListings(filtered);
    setActiveFilters(filters);
  };

  const clearFilters = () => {
    setFilteredListings(listings);
    setActiveFilters({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.search) count++;
    if (activeFilters.location) count++;
    if (activeFilters.category && activeFilters.category !== "all") count++;
    if (activeFilters.minPrice && activeFilters.minPrice > 0) count++;
    if (activeFilters.maxPrice && activeFilters.maxPrice < 1000) count++;
    if (activeFilters.guests && activeFilters.guests > 1) count++;
    if (activeFilters.amenities && activeFilters.amenities.length > 0) count++;
    if (activeFilters.sortBy && activeFilters.sortBy !== "relevance") count++;
    return count;
  };

  const removeFilter = (filterKey) => {
    const updatedFilters = { ...activeFilters };
    delete updatedFilters[filterKey];
    setActiveFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b rounded-2xl border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>

              <div className="h-6 w-px bg-gray-300 hidden sm:block" />

              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {loading
                    ? "Loading..."
                    : `${filteredListings.length} Properties`}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  Find your perfect stay
                </p>
              </div>
            </div>

            
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-white text-teal-600 text-xs px-2 py-1 rounded-full font-medium">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div> */}
      {/* <div className="lg:hidden bg-white border-b rounded-2xl border-gray-200 sticky top-0 z-30 p-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors w-full justify-center"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-white text-primary text-xs px-2 py-1 rounded-full font-medium">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
   
    

   <div className="lg:hidden bg-white border-b rounded-2xl border-gray-200 sticky top-0 z-20 p-4">
    <button
      onClick={() => setShowMobileFilters(true)}
      className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors w-full justify-center"
    >
      <SlidersHorizontal className="h-5 w-5" />
      <span>Filters</span>
      {getActiveFilterCount() > 0 && (
        <span className="bg-white text-teal-600 text-xs px-2 py-1 rounded-full font-medium">
          {getActiveFilterCount()}
        </span>
      )}
    </button>
  </div>

  {/* Mobile Filter Sidebar (slides in from left) */}
      <div className="lg:hidden  sticky top-0 z-20 p-4 flex flex-col items-center">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors w-full justify-center"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-white text-primary text-xs px-2 py-1 rounded-full font-medium">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      </div>
      {showMobileFilters && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0  bg-opacity-80"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Sidebar with animation */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <FilterSidebar
              isOpen={showMobileFilters}
              onClose={() => setShowMobileFilters(false)}
              onFilter={applyFilters}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                isOpen={true}
                onClose={() => {}}
                onFilter={applyFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Active Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary-hover font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeFilters.search && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-primary-hover">
                      <span>Search: "{activeFilters.search}"</span>
                      <button
                        onClick={() => removeFilter("search")}
                        className="ml-2 text-primary hover:text-primary-hover"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {activeFilters.location && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      <span>Location: {activeFilters.location}</span>
                      <button
                        onClick={() => removeFilter("location")}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {activeFilters.category &&
                    activeFilters.category !== "all" && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                        <span>Type: {activeFilters.category}</span>
                        <button
                          onClick={() => removeFilter("category")}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </div>
                    )}

                  {((activeFilters.minPrice && activeFilters.minPrice > 0) ||
                    (activeFilters.maxPrice &&
                      activeFilters.maxPrice < 1000)) && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      <span>
                        Price: ${activeFilters.minPrice || 0} - $
                        {activeFilters.maxPrice || 1000}
                      </span>
                      <button
                        onClick={() => {
                          removeFilter("minPrice");
                          removeFilter("maxPrice");
                        }}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {activeFilters.guests && activeFilters.guests > 1 && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                      <span>{activeFilters.guests} guests</span>
                      <button
                        onClick={() => removeFilter("guests")}
                        className="ml-2 text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {activeFilters.amenities &&
                    activeFilters.amenities.length > 0 && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                        <span>{activeFilters.amenities.length} amenities</span>
                        <button
                          onClick={() => removeFilter("amenities")}
                          className="ml-2 text-indigo-600 hover:text-indigo-800"
                        >
                          ×
                        </button>
                      </div>
                    )}

                  {activeFilters.sortBy &&
                    activeFilters.sortBy !== "relevance" && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                        <span>Sort: {activeFilters.sortBy}</span>
                        <button
                          onClick={() => removeFilter("sortBy")}
                          className="ml-2 text-gray-600 hover:text-gray-800"
                        >
                          ×
                        </button>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {loading
                      ? "Loading properties..."
                      : filteredListings.length === 0
                      ? "No properties found"
                      : `${filteredListings.length} ${
                          filteredListings.length === 1
                            ? "property"
                            : "properties"
                        } available`}
                  </h2>
                  {!loading && filteredListings.length > 0 && (
                    <p className="text-gray-600 mt-1">
                      Book unique places to stay from local hosts
                    </p>
                  )}
                </div>

                {/* Quick Sort on Desktop */}
                <div className="hidden lg:block">
                  <select
                    value={activeFilters.sortBy || "relevance"}
                    onChange={(e) =>
                      applyFilters({ ...activeFilters, sortBy: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            <PropertyGrid listings={filteredListings} loading={loading} />

            {/* No Results State */}
            {!loading &&
              filteredListings.length === 0 &&
              listings.length > 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No properties match your filters
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search criteria or clearing some
                      filters to see more results.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover cursor-pointer transition-colors font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        onFilter={(filters) => {
          applyFilters(filters);
          setShowMobileFilters(false);
        }}
        onClearFilters={() => {
          clearFilters();
          setShowMobileFilters(false);
        }}
      />
    </div>
  );
}
