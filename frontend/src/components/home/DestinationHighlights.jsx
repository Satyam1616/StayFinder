import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DestinationHighlights = () => {
  const destinations = [
    {
      image:
        "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      title: "Beach Getaways",
      count: "1,200+ properties",
      gradient: "from-blue-500/80 to-teal-400/80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      title: "Mountain Retreats",
      count: "850+ properties",
      gradient: "from-amber-500/80 to-rose-400/80",
    },
    {
      image:
        "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      title: "Urban Escapes",
      count: "2,300+ properties",
      gradient: "from-purple-500/80 to-pink-400/80",
    },
  ];
  const navigate = useNavigate();

  return (
    <section className="bg-[#f7f7f7] py-12 md:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trending <span className="text-[#ff385c]">Destinations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover stays in the world's most sought-after locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group relative h-80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              onClick={() => navigate("all-listings")}
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b ${destination.gradient} flex flex-col justify-end p-6`}
              >
                <h3 className="text-2xl font-bold text-white mb-1">
                  {destination.title}
                </h3>
                <p className="text-white/90">{destination.count}</p>
                <button className="mt-3 text-left text-white font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore now <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            onClick={() => navigate("all-listings")}
            href="#"
            className="inline-flex items-center text-[#ff385c] font-medium hover:text-[#e03148] transition-colors"
          >
            View all destinations <ChevronRight className="ml-1 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DestinationHighlights;
