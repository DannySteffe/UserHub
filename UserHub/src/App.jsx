// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/NavBar";
import { UserProvider } from "./context/hello";

export default function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}
