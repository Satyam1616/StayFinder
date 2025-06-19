import {
  Shield,
  Sparkles,
  Heart,
  Globe,
  Tag,
  Key,
  Star,
  StarIcon,
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-[#ff385c]" />,
      title: "Verified Listings",
      description:
        "Every property undergoes rigorous verification so you book with confidence.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#ff385c]" />,
      title: "Unique Stays",
      description:
        "Discover treehouses, boutique villas, and homes with character—no generic hotels.",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#ff385c]" />,
      title: "Personalized Matching",
      description: "AI-powered recommendations tailored to your travel style.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#ff385c]" />,
      title: "Global Coverage",
      description: "120+ countries with local experts to guide your stay.",
    },
    {
      icon: <Tag className="w-8 h-8 text-[#ff385c]" />,
      title: "Transparent Pricing",
      description: "No hidden fees—see the total cost upfront.",
    },
    {
      icon: <Key className="w-8 h-8 text-[#ff385c]" />,
      title: "Instant Booking",
      description: "Secure your stay instantly with real-time availability.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-4">
            Why <span className="text-[#ff385c]">StayFinder</span> Stands Out
          </h2>
          <p className="text-lg text-[#717171] max-w-3xl mx-auto">
            We redefine travel by focusing on what really matters—authentic
            experiences and peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#f7f7f7] p-8 rounded-xl hover:shadow-md transition-all border border-[#eeeeee] hover:border-[#ff385c]/20 hover:translate-y-[-0.325rem] duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-[#ff385c]/10 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#111111]">
                  {feature.title}
                </h3>
              </div>
              <p className="text-[#717171] pl-14">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 items-center">
          <div className="text-center px-6 py-3 bg-[#f7f7f7] rounded-lg">
            <p className="text-sm text-[#717171]">
              Rated <strong className="text-[#ff385c]">4.9/5</strong> stars
            </p>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-4 h-4 fill-[#ff385c] text-[#ff385c]"
                />
              ))}
            </div>
          </div>
          <div className="text-center px-6 py-3 bg-[#f7f7f7] rounded-lg">
            <p className="text-sm text-[#717171]">
              <strong className="text-[#ff385c]">10,000+</strong> verified stays
            </p>
          </div>
          <div className="text-center px-6 py-3 bg-[#f7f7f7] rounded-lg">
            <p className="text-sm text-[#717171]">
              <strong className="text-[#ff385c]">24/7</strong> customer support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
