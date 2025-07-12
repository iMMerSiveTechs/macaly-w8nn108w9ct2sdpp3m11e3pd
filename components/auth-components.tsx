"use client"

import { useState, useEffect } from 'react'
import { SubscriptionTier } from '@/lib/subscription-system'

// JWT payload interface
interface JWTPayload {
  userId: string
  email: string
  subscriptionTier: SubscriptionTier
  isActive: boolean
  iat: number
  exp: number
}

// Auth utility functions
class AuthUtils {
  static hasRequiredTier(userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
    const tierPriority = {
      [SubscriptionTier.FREE]: 0,
      [SubscriptionTier.SUPPORTER]: 1,
      [SubscriptionTier.FOUNDING_CREATOR]: 2,
      [SubscriptionTier.INNER_CIRCLE]: 3,
      [SubscriptionTier.LIFETIME]: 4
    }
    
    return tierPriority[userTier] >= tierPriority[requiredTier]
  }
}

// Hook for client-side authentication
export function useAuth() {
  const [user, setUser] = useState<JWTPayload | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      // Verify token on client side
      fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user)
          } else {
            localStorage.removeItem('auth-token')
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        localStorage.setItem('auth-token', data.token)
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    setUser(null)
  }

  return { user, loading, login, logout }
}

// React component for route protection
interface ProtectedRouteProps {
  children: React.ReactNode
  requiredTier?: SubscriptionTier
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  requiredTier = SubscriptionTier.FREE,
  fallback = null 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cosmic-purple"></div>
    </div>
  }

  if (!user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-cosmic-white/70 mb-6">Please log in to access this content</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="btn-cosmic px-6 py-3 rounded-lg font-semibold"
          >
            Log In
          </button>
        </div>
      </div>
    )
  }

  if (!AuthUtils.hasRequiredTier(user.subscriptionTier, requiredTier)) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Upgrade Required</h2>
          <p className="text-cosmic-white/70 mb-6">
            This feature requires {requiredTier.replace('_', ' ')} tier or higher
          </p>
          <button 
            onClick={() => window.location.href = '/pricing'} 
            className="btn-cosmic px-6 py-3 rounded-lg font-semibold"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Login form component
export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await login(email, password)
    
    if (result.success) {
      window.location.href = '/dashboard'
    } else {
      setError(result.error || 'Login failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cosmic-space via-cosmic-void to-cosmic-space">
      <div className="w-full max-w-md">
        <div className="glass-panel border-white/10 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Welcome Back
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cosmic-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple/50"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-cosmic-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple/50"
                placeholder="Enter your password"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-cosmic text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-cosmic-white/70">
              Don't have an account?{' '}
              <a href="/register" className="text-cosmic-cyan hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Subscription status badge component
export function SubscriptionBadge() {
  const { user } = useAuth()
  
  if (!user) return null
  
  const tierColors = {
    [SubscriptionTier.FREE]: 'bg-gray-500',
    [SubscriptionTier.SUPPORTER]: 'bg-blue-500',
    [SubscriptionTier.FOUNDING_CREATOR]: 'bg-purple-500',
    [SubscriptionTier.INNER_CIRCLE]: 'bg-yellow-500',
    [SubscriptionTier.LIFETIME]: 'bg-gradient-to-r from-purple-500 to-yellow-500'
  }
  
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${tierColors[user.subscriptionTier]}`}>
      {user.subscriptionTier.replace('_', ' ')}
    </div>
  )
}

export type AuthenticatedUser = JWTPayload