import React, { useContext, useState } from "react";
import { Lock, Eye, EyeOff, Save } from "lucide-react";
import axios from "axios";
import AppContext from "../context/AuthContext";
import { toast } from "sonner";
import { data } from "react-router-dom";

const ChangePassword = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/user/change-password`,
        {
          oldPassword: currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setMessage(data.message);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setError(data.error);
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-6 ">
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
      <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>

      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showPasswords.current ? "text" : "password"}
            required
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg "
            placeholder="Enter current password"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({
                ...showPasswords,
                current: !showPasswords.current,
              })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.current ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showPasswords.new ? "text" : "password"}
            required
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg "
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({ ...showPasswords, new: !showPasswords.new })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.new ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type={showPasswords.confirm ? "text" : "password"}
            required
            value={passwordData.confirmPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg"
            placeholder="Confirm new password"
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({
                ...showPasswords,
                confirm: !showPasswords.confirm,
              })
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.confirm ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2   bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg  transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-5 w-5" />
          <span>{loading ? "Updating..." : "Update Password"}</span>
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
