// src/App.jsx
import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import UserList1 from "./pages/UserList1";
import Navbar from "./components/NavBar";
import { UserProvider, UserContext } from "./context/hello";

import "./App.css"; // Assuming you have some global styles

function AppContent() {
  const { theme } = useContext(UserContext);

  // Apply theme to document body for full page coverage
  useEffect(() => {
    if (theme === "dark") {
      document.body.className = "bg-gray-900 text-gray-100 min-h-screen";
      document.documentElement.style.backgroundColor = "#111827"; // gray-900
      document.documentElement.classList.add("dark");
    } else {
      document.body.className = "bg-gray-50 text-gray-800 min-h-screen";
      document.documentElement.style.backgroundColor = "#f9fafb"; // gray-50
      document.documentElement.classList.remove("dark");
    }

    // Cleanup function to reset body class
    return () => {
      document.body.className = "";
      document.documentElement.style.backgroundColor = "";
      document.documentElement.classList.remove("dark");
    };
  }, [theme]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList1 />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
