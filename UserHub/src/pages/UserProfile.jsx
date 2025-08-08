// src/pages/UserProfile.jsx
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        setUser(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user:', error)
        setError('Failed to load user data')
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [id])

  if (loading) return <div className="text-center py-8">Loading user...</div>
  if (!user) return <div className="text-center py-8 text-red-500">User not found</div>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <p className="text-lg"><span className="font-semibold">Name:</span> {user.name}</p>
        <p className="text-lg"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="text-lg"><span className="font-semibold">Phone:</span> {user.phone}</p>
      </div>
    </div>
  )
}