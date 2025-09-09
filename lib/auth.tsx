"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  provider: "google" | "facebook" | "email"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (provider: "google" | "facebook") => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("pathao_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (provider: "google" | "facebook") => {
    setLoading(true)
    try {
      // Simulate social login - in real app, this would integrate with OAuth providers
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: provider === "google" ? "John Doe" : "Jane Smith",
        email: provider === "google" ? "john@gmail.com" : "jane@facebook.com",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        provider,
      }

      setUser(mockUser)
      localStorage.setItem("pathao_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate email login
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        provider: "email",
      }

      setUser(mockUser)
      localStorage.setItem("pathao_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Email sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate email signup
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        provider: "email",
      }

      setUser(mockUser)
      localStorage.setItem("pathao_user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("pathao_user")
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithEmail, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
