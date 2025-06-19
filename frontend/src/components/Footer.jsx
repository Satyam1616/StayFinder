import {
  Home,
  MapPin,
  Shield,
  HelpCircle,
  MessageSquare,
  Globe,
  Heart,
  User,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Calendar,
  Star,
  CreditCard,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] py-14 border-t border-[#2a2a2a] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-white">
              <span className="text-[#ff385c]">Stay</span>Finder
            </h3>
            <p className="text-[#a3a3a3] text-sm leading-relaxed flex items-start">
              <MapPin className="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
              Discover unique experiences and places to stay around the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#a3a3a3] hover:text-[#ff385c] transition-colors p-2 rounded-full hover:bg-[#2a2a2a]"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#a3a3a3] hover:text-[#ff385c] transition-colors p-2 rounded-full hover:bg-[#2a2a2a]"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#a3a3a3] hover:text-[#ff385c] transition-colors p-2 rounded-full hover:bg-[#2a2a2a]"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold text-lg flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                {
                  name: "Destinations",
                  icon: <MapPin className="w-4 h-4 mr-2" />,
                },
                {
                  name: "Experiences",
                  icon: <Heart className="w-4 h-4 mr-2" />,
                },
                {
                  name: "Trust & Safety",
                  icon: <Shield className="w-4 h-4 mr-2" />,
                },
                {
                  name: "Travel Guides",
                  icon: <MessageSquare className="w-4 h-4 mr-2" />,
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className="text-[#a3a3a3] hover:text-white text-sm transition-colors flex items-center"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Host Resources */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold text-lg flex items-center">
              <User className="w-5 h-5 mr-2" />
              Hosting
            </h4>
            <ul className="space-y-3">
              {[
                {
                  name: "Become a Host",
                  icon: <Home className="w-4 h-4 mr-2" />,
                },
                {
                  name: "Host Resources",
                  icon: <HelpCircle className="w-4 h-4 mr-2" />,
                },
                {
                  name: "Community Forum",
                  icon: <MessageSquare className="w-4 h-4 mr-2" />,
                },
                {
                  name: "Safety Tips",
                  icon: <Shield className="w-4 h-4 mr-2" />,
                },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className="text-[#a3a3a3] hover:text-white text-sm transition-colors flex items-center"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & App */}
          <div className="space-y-5">
            <h4 className="text-white font-semibold text-lg flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Stay Updated
            </h4>
            <p className="text-[#a3a3a3] text-sm flex items-start">
              <Star className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
              Subscribe for travel tips and exclusive deals
            </p>
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="pl-10 pr-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff385c] placeholder-[#6b6b6b] text-sm w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-[#ff385c] hover:bg-[#e0274d] text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#2a2a2a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-[#6b6b6b] text-sm mb-4 md:mb-0 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />© {new Date().getFullYear()}{" "}
            StayFinder, Inc.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Privacy", "Terms", "Sitemap", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#6b6b6b] hover:text-[#a3a3a3] text-sm transition-colors flex items-center"
              >
                {item === "Privacy" && <Shield className="w-3 h-3 mr-1" />}
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
