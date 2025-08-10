// src/pages/UserProfile.jsx
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/hello";

export default function UserProfile() {
  const { id } = useParams();
  const { theme } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  // Load user data (API + localStorage overrides)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch original data from API
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        let userData = response.data;

        // Check for saved edits in localStorage
        const savedEdits = localStorage.getItem(`user-${id}-edits`);
        if (savedEdits) {
          const parsedEdits = JSON.parse(savedEdits);
          userData = { ...userData, ...parsedEdits };
        }

        setUser(userData);
        setEditedUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle company name change
  const handleCompanyChange = (value) => {
    setEditedUser((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        name: value,
      },
    }));
  };

  // Save changes to localStorage
  const handleSave = () => {
    const editsToSave = {
      name: editedUser.name,
      email: editedUser.email,
      phone: editedUser.phone,
      website: editedUser.website,
      company: {
        name: editedUser.company?.name || "",
      },
    };

    // Save to localStorage
    localStorage.setItem(`user-${id}-edits`, JSON.stringify(editsToSave));

    // Update the user state
    setUser(editedUser);
    setIsEditing(false);

    // Show save confirmation
    setSaveMessage("Profile updated successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUser(user); // Reset to original data
    setIsEditing(false);
  };

  // Reset to original data
  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all changes? This will restore the original profile data."
      )
    ) {
      localStorage.removeItem(`user-${id}-edits`);

      // Refetch original data
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data);
          setEditedUser(response.data);
          setSaveMessage("Profile reset to original data!");
          setTimeout(() => setSaveMessage(""), 3000);
        })
        .catch((error) => {
          console.error("Error resetting user data:", error);
        });
    }
  };

  if (loading)
    return (
      <div
        className={`text-center py-8 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <div className="inline-block animate-pulse">
          <svg
            className="animate-spin h-8 w-8 mx-auto text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-2">Loading user profile...</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div
        className={`text-center py-8 ${
          theme === "dark" ? "text-red-400" : "text-red-500"
        }`}
      >
        User not found
      </div>
    );

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Profile</h1>
          <div className="flex space-x-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={handleReset}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-gray-600 hover:bg-gray-700 text-white"
                      : "bg-gray-500 hover:bg-gray-600 text-white"
                  }`}
                >
                  🔄 Reset
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  ❌ Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div
            className={`mb-4 p-3 rounded-lg border ${
              theme === "dark"
                ? "bg-green-900 border-green-700 text-green-200"
                : "bg-green-100 border-green-400 text-green-700"
            }`}
          >
            {saveMessage}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            className={`mb-4 p-3 rounded border ${
              theme === "dark"
                ? "bg-red-900 border-red-700 text-red-200"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
          >
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  placeholder="Enter full name"
                />
              ) : (
                <p
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  } text-lg`}
                >
                  {user.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  placeholder="Enter email address"
                />
              ) : (
                <p
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  } text-lg`}
                >
                  {user.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  placeholder="Enter phone number"
                />
              ) : (
                <p
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  } text-lg`}
                >
                  {user.phone}
                </p>
              )}
            </div>

            {/* Website Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={editedUser.website || ""}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className={`w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  placeholder="Enter website URL"
                />
              ) : (
                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  {user.website ? (
                    <a
                      href={`http://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-lg ${
                        theme === "dark"
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-800"
                      } underline`}
                    >
                      {user.website}
                    </a>
                  ) : (
                    <span className="text-lg text-gray-500">No website</span>
                  )}
                </div>
              )}
            </div>

            {/* Company Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Company</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.company?.name || ""}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  className={`w-full p-3 rounded-lg border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                  placeholder="Enter company name"
                />
              ) : (
                <p
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                  } text-lg`}
                >
                  {user.company?.name || "No company"}
                </p>
              )}
            </div>
          </div>

          {/* Edit Mode Info */}
          {isEditing && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                theme === "dark"
                  ? "bg-blue-900/20 border border-blue-800"
                  : "bg-blue-50 border border-blue-200"
              }`}
            >
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-blue-300" : "text-blue-700"
                }`}
              >
                💡 <strong>Editing Mode:</strong> Make your changes and click
                "Save Changes" to persist them. Your edits will be saved locally
                and persist even after page refresh.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
