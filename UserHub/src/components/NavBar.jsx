// src/components/Navbar.jsx
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function Navbar() {
  const { theme, toggleTheme } = useContext(UserContext)
  
  return (
    <nav className={`p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white shadow'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">User Manager</Link>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  )
}