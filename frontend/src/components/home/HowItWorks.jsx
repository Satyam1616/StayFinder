import { CalendarDays, KeyRound, PlayCircle, Search, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#ff385c]" />,
      title: "Search Smart",
      description: "Use our AI-powered filters to find exactly what you want",
      highlight: "100+ filters available",
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-[#ff385c]" />,
      title: "Book Seamlessly",
      description: "Instant booking or request with 24-hour response guarantee",
      highlight: "No booking fees",
    },
    {
      icon: <KeyRound className="w-8 h-8 text-[#ff385c]" />,
      title: "Enjoy Your Stay",
      description:
        "Access digital guidebooks and 24/7 support during your trip",
      highlight: "Local tips included",
    },
    {
      icon: <Star className="w-8 h-8 text-[#ff385c]" />,
      title: "Share Your Experience",
      description: "Earn rewards for reviews and help our community grow",
      highlight: "Loyalty program",
    },
  ];

  return (
    <section className="bg-[#f7f7f7] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How <span className="text-[#ff385c]">StayFinder</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From dream to destination in just a few clicks
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          {/* <div className="hidden md:block absolute left-16 right-16 top-16 h-1 bg-gray-200 z-0"></div> */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#ff385c]/10 flex items-center justify-center border-2 border-white shadow-sm">
                  <div className="relative">
                    {step.icon}
                    <span className="absolute -top-3 -right-3 bg-[#ff385c] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <span className="inline-block text-sm px-3 py-1 bg-[#ff385c]/10 text-[#ff385c] rounded-full">
                  {step.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-[#ff385c] text-white rounded-lg font-medium hover:bg-[#e03148] transition-colors shadow-sm hover:shadow-md inline-flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Watch How It Works
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default HowItWorks;
