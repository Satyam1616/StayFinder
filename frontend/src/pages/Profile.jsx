import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  Camera,
  Shield,
  Bell,
  Phone,
} from "lucide-react";
import { useContext } from "react";
import AppContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import ChangePassword from "../components/ChangePassword";
import TailSpinLoader from "../components/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const { backendUrl, token, user, loadUserData } = useContext(AppContext);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    profileImage: "",
  });

  const [image, setImage] = useState(null);

  // Load user data on component mount
  useEffect(() => {
    if (token) {
      loadUserData(backendUrl, token);
    }
  }, [token]);

  // Set profile data when user data is available
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        gender: user.gender || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file (JPEG, PNG)");
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setImage(file);
  };

  const updateUserData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      formData.append("bio", profileData.bio);
      formData.append("gender", profileData.gender);

      if (image) {
        formData.append("profileImage", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        setMessage("Profile updated successfully");
        await loadUserData();
        setImage(null); // Reset image state after successful upload
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || "Failed to update profile");
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <TailSpinLoader className="h-screen" />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="px-8 py-12 bg-gradient-to-r from-gray-900 to-slate-800 p-6 rounded-t-xl text-white">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : profileData.profileImage ? (
                    <img
                      src={profileData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-white" />
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="cursor-pointer absolute bottom-0 right-0 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-teal-100 text-lg">{user?.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  {/* <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user?.role === "host"
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-blue-400 text-blue-900"
                    }`}
                  >
                    {user?.role === "host" ? "Host" : "Guest"}
                  </span> */}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-yellow-900">
                    Host
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "profile"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "security"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "profile" && (
              <form onSubmit={updateUserData} className="space-y-6">
                {message && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        required
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        required
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={profileData.gender}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          gender: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="h-5 w-5" />
                    <span>{loading ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
