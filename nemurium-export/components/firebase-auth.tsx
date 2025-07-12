"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, LogIn, UserPlus, LogOut, Crown } from 'lucide-react'
import { auth, db } from '../firebase-config'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

interface AuthUser {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  tier: 'free' | 'pro' | 'founding_creator'
  credits: number
  worldsCreated: number
  joinedAt: string
}

export default function FirebaseAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user profile from Firestore
        const userProfile = await getUserProfile(firebaseUser.uid)
        setUser(userProfile)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getUserProfile = async (uid: string): Promise<AuthUser> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      
      if (userDoc.exists()) {
        return userDoc.data() as AuthUser
      } else {
        // Create new user profile
        const newUser: AuthUser = {
          uid,
          email: auth.currentUser?.email || '',
          displayName: auth.currentUser?.displayName || 'Creator',
          photoURL: auth.currentUser?.photoURL || undefined,
          tier: 'free',
          credits: 10, // Free tier credits
          worldsCreated: 0,
          joinedAt: new Date().toISOString()
        }
        
        await setDoc(doc(db, 'users', uid), newUser)
        return newUser
      }
    } catch (error) {
      console.error('Error getting user profile:', error)
      throw error
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (authMode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password)
        
        // Track signup event
        console.log('🎉 New user signed up:', email)
        
        // Add to waitlist/community
        await addToWaitlist(email)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        console.log('👋 User signed in:', email)
      }
      
      setShowAuth(false)
      setEmail('')
      setPassword('')
    } catch (error: any) {
      setError(getErrorMessage(error.code))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleAuth = async () => {
    setError('')
    setIsSubmitting(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      console.log('🎉 Google auth successful:', result.user.email)
      
      // Add to waitlist if new user
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        await addToWaitlist(result.user.email || '')
      }
      
      setShowAuth(false)
    } catch (error: any) {
      setError(getErrorMessage(error.code))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      console.log('👋 User signed out')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const addToWaitlist = async (email: string) => {
    try {
      // Add to waitlist collection
      await setDoc(doc(db, 'waitlist', email), {
        email,
        joinedAt: new Date().toISOString(),
        source: 'direct_signup'
      })
      
      console.log('📧 Added to waitlist:', email)
    } catch (error) {
      console.error('Error adding to waitlist:', error)
    }
  }

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email'
      case 'auth/wrong-password':
        return 'Incorrect password'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists'
      case 'auth/weak-password':
        return 'Password should be at least 6 characters'
      case 'auth/invalid-email':
        return 'Please enter a valid email address'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'founding_creator':
        return { icon: Crown, label: 'Founding Creator', color: 'text-yellow-400 bg-yellow-400/20' }
      case 'pro':
        return { icon: Crown, label: 'Pro', color: 'text-cosmic-purple bg-cosmic-purple/20' }
      default:
        return { icon: User, label: 'Free', color: 'text-cosmic-cyan bg-cosmic-cyan/20' }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cosmic-purple border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      {user ? (
        // Authenticated User Display
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-cosmic-white">
                {user.displayName}
              </div>
              <div className="text-xs text-cosmic-white/70">
                {user.credits} credits • {user.worldsCreated} worlds
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs ${getTierBadge(user.tier).color}`}>
              {getTierBadge(user.tier).label}
            </div>
          </div>
          
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-cosmic-purple hover:bg-cosmic-purple/80 transition-all flex items-center justify-center">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-white" />
              )}
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-12 w-48 bg-cosmic-space border border-cosmic-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-3 border-b border-cosmic-white/20">
                <div className="font-medium text-cosmic-white">{user.displayName}</div>
                <div className="text-sm text-cosmic-white/70">{user.email}</div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full text-left px-3 py-2 text-sm text-cosmic-white hover:bg-cosmic-white/10 rounded"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => window.location.href = '/worlds'}
                  className="w-full text-left px-3 py-2 text-sm text-cosmic-white hover:bg-cosmic-white/10 rounded"
                >
                  My Worlds
                </button>
                <button
                  onClick={() => window.location.href = '/settings'}
                  className="w-full text-left px-3 py-2 text-sm text-cosmic-white hover:bg-cosmic-white/10 rounded"
                >
                  Settings
                </button>
                <hr className="my-2 border-cosmic-white/20" />
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Sign In Button
        <button
          onClick={() => setShowAuth(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </button>
      )}

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowAuth(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-cosmic-space border border-cosmic-white/20 rounded-xl p-6 w-full max-w-md"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-cosmic-white mb-2">
                  {authMode === 'signin' ? 'Welcome Back' : 'Join iMMerSive'}
                </h2>
                <p className="text-cosmic-white/70">
                  {authMode === 'signin' 
                    ? 'Sign in to access your worlds and creations'
                    : 'Create an account to start building immersive worlds'
                  }
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cosmic-white mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmic-white/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cosmic-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmic-white/50" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-cosmic-purple hover:bg-cosmic-purple/80 disabled:opacity-50 rounded-lg font-medium text-white transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {authMode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {authMode === 'signin' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                      {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                    </div>
                  )}
                </button>
              </form>

              <div className="my-4 flex items-center">
                <div className="flex-1 border-t border-cosmic-white/20" />
                <span className="px-3 text-cosmic-white/50 text-sm">or</span>
                <div className="flex-1 border-t border-cosmic-white/20" />
              </div>

              <button
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
                className="w-full py-3 bg-white hover:bg-gray-100 disabled:opacity-50 rounded-lg font-medium text-gray-900 transition-all flex items-center justify-center gap-2"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="text-cosmic-purple hover:text-cosmic-purple/80 text-sm transition-all"
                >
                  {authMode === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}