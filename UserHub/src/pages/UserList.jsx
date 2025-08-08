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
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div
      className={`p-4 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <p className="mb-4">Logged in as: {authUser || "Guest"}</p>

      {/* Form handling */}
      <div className="mb-6">
        <label htmlFor="filter" className="block mb-2">
          Filter Users:
        </label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded w-full max-w-md"
          placeholder="Type to filter..."
        />
      </div>

      {/* JSX with Tailwind styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm">{user.phone}</p>
              <a
                href={`/user/${user.id}`}
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          ))
        ) : (
          <p>No users found matching your filter.</p>
        )}
      </div>
    </div>
  );
}

