// src/context/UserContext.jsx
import React from "react";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("userHubTheme");
    return savedTheme || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      // Save theme preference to localStorage
      localStorage.setItem("userHubTheme", newTheme);
      return newTheme;
    });
  };

  // Global theme application
  useEffect(() => {
    // Apply theme class to html element for global coverage
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <UserContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
}
