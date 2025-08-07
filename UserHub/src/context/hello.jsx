// src/context/UserContext.jsx
import React from 'react'
import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <UserContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  )
}