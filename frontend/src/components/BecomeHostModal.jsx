import React, { useContext, useState } from "react";
import {
  X,
  Home,
  DollarSign,
  Users,
  Shield,
  Star,
  Calendar,
  Globe,
  TrendingUp,
  Award,
  Heart,
  CheckCircle,
} from "lucide-react";

import AppContext from "../context/AuthContext";
import useHost from "../hooks/useHost";

const BecomeHostModal = ({ isOpen, onClose }) => {
  const { becomeHost } = useHost();
  const [loading, setLoading] = useState(false);
  const { token, backendUrl } = useContext(AppContext);
  const handleBecomeHost = async () => {
    try {
      setLoading(true);
      await becomeHost(backendUrl, token);
      onClose();
    } catch (error) {
      console.error("Failed to become host:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Earn Extra Income",
      description:
        "Make money from your unused space. Hosts earn an average of $924 per month.",
      highlight: "$924/month",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Meet Amazing People",
      description:
        "Connect with travelers from around the world and create lasting friendships.",
      highlight: "Global Community",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Host Protection",
      description:
        "We've got you covered with $1M liability insurance and 24/7 support.",
      highlight: "$1M Coverage",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Build Your Reputation",
      description:
        "Earn great reviews and become a Superhost to unlock exclusive benefits.",
      highlight: "Superhost Status",
    },
    {
      icon: <Calendar className="h-8 w-8 text-teal-500" />,
      title: "Flexible Schedule",
      description:
        "Host on your own terms. You control when your space is available.",
      highlight: "Your Schedule",
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
      title: "Global Reach",
      description:
        "List your property on our platform and reach millions of travelers worldwide.",
      highlight: "Millions of Guests",
    },
  ];

  const stats = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "4M+",
      label: "Active Hosts",
    },
    { icon: <Award className="h-6 w-6" />, value: "150+", label: "Countries" },
    {
      icon: <Heart className="h-6 w-6" />,
      value: "500M+",
      label: "Guest Arrivals",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-8 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Home className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-2">
              Become a StayFinder Host
            </h2>
            <p className="text-teal-100 text-lg">
              Turn your space into an income stream and join millions of hosts
              worldwide
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center text-primary mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why host with StayFinder?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {benefit.description}
                    </p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      {benefit.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">
              Getting started is easy
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h5 className="font-medium text-gray-900 mb-1">
                  Share your space
                </h5>
                <p className="text-sm text-gray-600">
                  Tell us about your place with photos and details
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h5 className="font-medium text-gray-900 mb-1">
                  Set your price
                </h5>
                <p className="text-sm text-gray-600">
                  Choose your nightly rate and house rules
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h5 className="font-medium text-gray-900 mb-1">
                  Start earning
                </h5>
                <p className="text-sm text-gray-600">
                  Welcome guests and start earning money
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-green-900 mb-2">
                  You're protected every step of the way
                </h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>$1M liability insurance coverage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Guest identity verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBecomeHost}
              disabled={loading}
              className="flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
              <Home className="h-6 w-6" />
              <span>{loading ? "Setting up..." : "Become a Host"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            By becoming a host, you agree to our Terms of Service and Host
            Guarantee terms. Earnings are not guaranteed and depend on various
            factors including location, property type, and market demand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostModal;
