import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Shield,
  Heart,
  Calendar,
  Users,
  Globe,
  Check,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();
  const testimonials = [
    {
      id: 1,
      quote:
        "StayFinder helped me discover a hidden gem in Bali. The host verification gave me peace of mind as a solo traveler.",
      author: "Sophia L.",
      role: "Solo Traveler",
      rating: 5,
      location: "Ubud, Bali",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
      highlight: "Verified Hosts",
    },
    {
      id: 2,
      quote:
        "As a host, I've increased my bookings by 60% using StayFinder's smart pricing tools. The dashboard is incredibly intuitive.",
      author: "Miguel R.",
      role: "Superhost",
      rating: 5,
      location: "Barcelona, Spain",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
      highlight: "Host Tools",
    },
    {
      id: 3,
      quote:
        "Found the perfect pet-friendly cabin through StayFinder's advanced filters. Our golden retriever loved it as much as we did!",
      author: "The Chen Family",
      role: "Pet Owners",
      rating: 4,
      location: "Lake Tahoe, USA",
      image:
        "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
      highlight: "Pet-Friendly Stays",
    },
    {
      id: 4,
      quote:
        "The instant booking feature saved our anniversary trip when our original plans fell through. Found a luxury villa in minutes!",
      author: "James & Elena",
      role: "Couple",
      rating: 5,
      location: "Santorini, Greece",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
      highlight: "Instant Booking",
    },
  ];

  const trustStats = [
    {
      icon: <Shield className="w-6 h-6" />,
      value: "10,000+",
      label: "Verified Stays",
    },
    { icon: <Globe className="w-6 h-6" />, value: "120+", label: "Countries" },
    {
      icon: <Heart className="w-6 h-6" />,
      value: "98%",
      label: "Satisfaction",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "50,000+",
      label: "Happy Guests",
    },
    { icon: <Calendar className="w-6 h-6" />, value: "24/7", label: "Support" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="bg-gradient-to-b from-[#f9f9f9] to-[#f0f0f0] py-8 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100 mb-8 md:mb-16">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <div className="md:w-1/2">
              <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
                <img
                  // src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  src="https://images.unsplash.com/photo-1566816235496-11ec3788c8a1?q=80&w=1083&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Happy travelers"
                  className="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-white text-lg font-medium">
                      "Changed how we travel forever"
                    </p>
                    <p className="text-white/80 text-sm">
                      — The Martinez Family
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our <span className="text-[#ff385c]">Unmatched</span> Features
              </h3>

              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff385c] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Smart Pricing Technology
                    </h4>
                    <p className="text-gray-600">
                      Dynamic algorithms ensure you always get fair prices.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff385c] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Virtual Tours</h4>
                    <p className="text-gray-600">
                      360° property views so you know exactly what to expect.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff385c] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Local Experience Packages
                    </h4>
                    <p className="text-gray-600">
                      Book authentic experiences with your stay.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#ff385c] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      Sustainability Verified
                    </h4>
                    <p className="text-gray-600">
                      Eco-friendly stays clearly marked in our listings.
                    </p>
                  </div>
                </li>
              </ul>

              <button
                onClick={() => navigate("/all-listings")}
                className="mt-8 px-6 py-3 bg-[#ff385c] text-white rounded-lg font-medium hover:bg-[#e03148] transition-colors shadow-sm hover:shadow-md"
              >
                Discover the Difference
              </button>
            </div>
          </div>
        </div>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted by <span className="text-[#ff385c]">Travelers</span>{" "}
            Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our community of happy travelers and hosts
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative mb-16 md:mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:bg-[#ff385c] hover:text-white transition-all -ml-2 md:-ml-4"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-white shadow-lg hover:bg-[#ff385c] hover:text-white transition-all -mr-2 md:-mr-4"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden px-1">
            <div
              ref={carouselRef}
              className="carousel-inner flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-3 md:px-6 transition-all duration-300"
                >
                  <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 h-full">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      {/* User Image */}
                      <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 md:mb-4 group">
                          <img
                            src={item.image}
                            alt={item.author}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-[#ff385c]/10 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-gray-900">
                            {item.author}
                          </h4>
                          <p className="text-sm text-gray-500">{item.role}</p>
                          <div className="flex justify-center mt-1 md:mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < item.rating
                                    ? "fill-[#ff385c] text-[#ff385c]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="w-full md:w-2/3 flex flex-col">
                        <div className="flex justify-between items-start mb-3 md:mb-4">
                          <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#ff385c]/20 rotate-180" />
                          <span className="text-xs px-2 py-1 bg-[#ff385c]/10 text-[#ff385c] rounded-full">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-base md:text-lg text-gray-800 mb-4 md:mb-6 flex-grow">
                          "{item.quote}"
                        </p>
                        <div className="flex items-center text-sm text-gray-500 border-t border-gray-100 pt-3 md:pt-4">
                          <MapPin className="w-4 h-4 mr-1 text-[#ff385c]" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-[#ff385c] w-4 md:w-6"
                    : "bg-gray-300 hover:bg-[#ff385c]/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            "Every journey finds its home with{" "}
            <span className="text-[#ff385c]">StayFinder</span>"
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {trustStats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-3 md:p-4 group hover:bg-[#ff385c]/5 rounded-lg transition-colors"
              >
                <div className="p-2 md:p-3 bg-[#ff385c]/10 rounded-full mb-3 md:mb-4 group-hover:bg-[#ff385c]/20 transition-colors">
                  {stat.icon}
                </div>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
