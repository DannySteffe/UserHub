// src/App.jsx
import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserList1 from "./pages/UserList1";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/NavBar";
import { UserProvider, UserContext } from "./context/hello";

function AppContent() {
  const { theme } = useContext(UserContext);

  // Apply theme to document body for full page coverage
  useEffect(() => {
    if (theme === "dark") {
      document.body.className = "bg-gray-900 text-gray-100";
    } else {
      document.body.className = "bg-gray-50 text-gray-800";
    }

    // Cleanup function to reset body class
    return () => {
      document.body.className = "";
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
