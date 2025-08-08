import { createContext, useContext, useState, useEffect } from 'react'

// Load from .env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setUser(storedUser)
      setToken(storedToken)
    }
  }, [])

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }, [user, token])

  const login = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, BACKEND_URL }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
