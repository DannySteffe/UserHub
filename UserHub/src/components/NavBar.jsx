// src/components/Navbar.jsx
import React from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/hello";
import { ImageOff, Import } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(UserContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`p-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white shadow"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          User Manager
        </Link>
        <div className="flex items-center space-x-4">
          {/* Only show theme toggle on home page */}
          {isHomePage && (
            <button
              onClick={toggleTheme}
              className={`px-3 py-1 rounded transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-gray-600 hover:bg-gray-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
