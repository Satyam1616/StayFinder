import {
  LineChart,
  ShieldCheck,
  Users2,
  Zap,
  BadgeCheck,
  Clock,
  DollarSign,
  Globe,
  Home,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HostBenefits = () => {
  const benefits = [
    {
      icon: <LineChart className="w-8 h-8 text-[#ff385c]" />,
      title: "Maximize Earnings",
      description:
        "Our smart pricing tool adjusts rates based on demand, seasonality, and local events",
      stat: "30% higher average income",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#ff385c]" />,
      title: "Full Protection",
      description:
        "$1M property damage protection and liability coverage included at no extra cost",
      stat: "Risk-free hosting",
    },
    {
      icon: <Zap className="w-8 h-8 text-[#ff385c]" />,
      title: "Instant Visibility",
      description: "Get listed in our global marketplace within minutes",
      stat: "2M+ monthly travelers",
    },
    {
      icon: <Users2 className="w-8 h-8 text-[#ff385c]" />,
      title: "Quality Guests",
      description:
        "Verified ID, payment screening, and review system ensure respectful guests",
      stat: "4.9/5 host satisfaction",
    },
    // NEW BENEFITS ADDED BELOW
    {
      icon: <BadgeCheck className="w-8 h-8 text-[#ff385c]" />,
      title: "Superhost Program",
      description:
        "Earn badges, better placement, and exclusive perks as you build your reputation",
      stat: "20% more bookings",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#ff385c]" />,
      title: "Flexible Control",
      description:
        "Set your own availability, minimum stays, and cancellation policies",
      stat: "100% calendar control",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-[#ff385c]" />,
      title: "Fast Payouts",
      description:
        "Get paid via direct deposit, PayPal, or wire transfer within 24 hours of check-in",
      stat: "No hidden fees",
    },
    {
      icon: <Globe className="w-8 h-8 text-[#ff385c]" />,
      title: "Global Reach",
      description:
        "Connect with travelers from 120+ countries with built-in translation for 20 languages",
      stat: "International exposure",
    },
  ];

  const premiumFeatures = [
    {
      icon: <Home className="w-6 h-6 text-[#ff385c]" />,
      text: "Professional photography service",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#ff385c]" />,
      text: "Priority customer support",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#ff385c]" />,
      text: "Exclusive discount on cleaning services",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div className="sticky top-24">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                <span className="text-[#ff385c]">Host</span> With Confidence
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Join 500,000+ hosts earning an average of $15,000/year on our
                platform
              </p>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="Happy host"
                className="rounded-xl shadow-sm mb-6"
                loading="lazy"
              />

              <div className="bg-[#f7f7f7] p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">
                  Premium Host Perks
                </h4>
                <ul className="space-y-2">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-[#ff385c]">{feature.icon}</span>
                      <span className="text-gray-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-[#f7f7f7] p-6 rounded-xl hover:bg-white hover:shadow-md transition-all border border-gray-100 group"
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-[#ff385c]/10 rounded-full group-hover:bg-[#ff385c]/20 transition-colors">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {benefit.description}
                      </p>
                      <span className="inline-block text-sm font-medium text-[#ff385c] bg-[#ff385c]/10 px-3 py-1 rounded-full">
                        {benefit.stat}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-[#ff385c]/5 to-[#ff914d]/5 p-8 rounded-xl border border-[#ff385c]/10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2 text-xl">
                    Start earning in 3 easy steps
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Create your listing (10 minutes)</li>
                    <li>Set your availability and pricing</li>
                    <li>Welcome your first guest</li>
                  </ol>
                </div>
                <button
                  onClick={() => navigate("/host/create-listing")}
                  className="px-6 py-3 bg-[#ff385c] text-white rounded-lg font-medium hover:bg-[#e03148] transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostBenefits;
