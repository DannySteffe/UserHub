// src/pages/UserList.jsx
import React from "react";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { UserContext } from "../context/hello";

export default function UserList() {
  // State management with useState hook
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Using Context API
  const { theme } = useContext(UserContext);

  // Using Redux
  const authUser = useSelector((state) => state.auth.user);

  // Fetching data with axios (API call)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Array methods (filter, map)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Conditional rendering
  if (loading) {
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
          <p className="mt-2">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Logged in as:{" "}
            <span className="font-medium">{authUser || "Guest"}</span>
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <label
            htmlFor="filter"
            className={`block mb-2 text-lg font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Filter Users
          </label>
          <input
            type="text"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`p-3 border rounded-lg w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
            }`}
            placeholder="Search by name..."
          />
        </div>

        {/* User Grid */}
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`rounded-xl p-5 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700 hover:border-gray-600"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold ${
                      theme === "dark"
                        ? "bg-blue-900 text-blue-200"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold truncate">
                      {user.name}
                    </h2>
                    <p
                      className={`text-sm truncate ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-4 pt-4 border-t ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className={`h-5 w-5 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{user.phone}</span>
                  </div>

                  <a
                    href={`/user/${user.id}`}
                    className={`mt-3 inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-blue-800 text-blue-100 hover:bg-blue-700"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}
                  >
                    View Profile
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-12 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium">No users found</h3>
            <p
              className={`mt-1 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
