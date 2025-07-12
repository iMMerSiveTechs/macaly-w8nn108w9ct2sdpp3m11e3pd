"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, LogIn, LogOut, Shield, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FirebaseUser {
  uid: string
  isAnonymous: boolean
  email?: string
  displayName?: string
}

export function FirebaseAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [firebaseLoaded, setFirebaseLoaded] = useState(false)

  useEffect(() => {
    // Load Firebase dynamically
    if (typeof window !== 'undefined' && !window.firebase) {
      loadFirebase()
    } else if (window.firebase) {
      setFirebaseLoaded(true)
      initializeAuth()
    }
  }, [])

  const loadFirebase = async () => {
    try {
      // Load Firebase scripts dynamically
      const appScript = document.createElement('script')
      appScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js'
      document.head.appendChild(appScript)

      appScript.onload = () => {
        const authScript = document.createElement('script')
        authScript.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js'
        document.head.appendChild(authScript)

        authScript.onload = () => {
          initializeFirebase()
        }
      }
    } catch (error) {
      console.error('Failed to load Firebase:', error)
    }
  }

  const initializeFirebase = () => {
    try {
      const firebaseConfig = {
        apiKey: "AIzaSyDemoKeyForNemurium123456789",
        authDomain: "nemurium-immersive.firebaseapp.com", 
        projectId: "nemurium-immersive",
        storageBucket: "nemurium-immersive.appspot.com",
        messagingSenderId: "123456789012",
        appId: "1:123456789012:web:abcdef123456789012345"
      }

      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig)
      }

      setFirebaseLoaded(true)
      initializeAuth()
    } catch (error) {
      console.error('Firebase initialization failed:', error)
    }
  }

  const initializeAuth = () => {
    if (!window.firebase?.auth) return

    const auth = window.firebase.auth()
    
    // Listen for auth state changes
    auth.onAuthStateChanged((firebaseUser: any) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }

  const signInAnonymously = async () => {
    if (!firebaseLoaded || !window.firebase?.auth) {
      console.error('Firebase not loaded')
      return
    }

    setLoading(true)
    try {
      const auth = window.firebase.auth()
      await auth.signInAnonymously()
      console.log('✅ Anonymous sign-in successful')
    } catch (error: any) {
      console.error('Anonymous sign-in failed:', error)
      alert(`Sign-in failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    if (!firebaseLoaded || !window.firebase?.auth) return

    setLoading(true)
    try {
      const auth = window.firebase.auth()
      await auth.signOut()
      console.log('✅ Sign-out successful')
    } catch (error: any) {
      console.error('Sign-out failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveToUserProfile = () => {
    if (!user) return

    const userData = {
      uid: user.uid,
      signInTime: new Date().toISOString(),
      isAnonymous: user.isAnonymous,
      email: user.email || 'anonymous',
      displayName: user.displayName || 'Anonymous Creator'
    }

    // Save to localStorage for demo (in production, use Firestore)
    localStorage.setItem(`nemurium_user_${user.uid}`, JSON.stringify(userData))
    console.log('✅ User data saved:', userData)
  }

  return (
    <div className="glass-panel p-6 rounded-xl border border-cosmic-white/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-cosmic-purple/20 rounded-lg flex items-center justify-center">
          <Shield className="h-5 w-5 text-cosmic-purple" />
        </div>
        <div>
          <h3 className="text-cosmic-white font-semibold">Creator Authentication</h3>
          <p className="text-cosmic-white/60 text-sm">Secure login to save your progress</p>
        </div>
      </div>

      {!firebaseLoaded ? (
        <div className="text-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-cosmic-purple border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-cosmic-white/70 text-sm">Loading authentication...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {user ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* User Info */}
              <div className="bg-cosmic-white/5 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cosmic-purple rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-cosmic-white font-medium text-sm">
                      {user.displayName || 'Anonymous Creator'}
                    </p>
                    <p className="text-cosmic-white/60 text-xs">
                      {user.isAnonymous ? 'Anonymous Session' : user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={saveToUserProfile}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-cosmic-purple/50 text-cosmic-purple hover:bg-cosmic-purple/10"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Save Progress
                </Button>
                
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="border-cosmic-white/20 text-cosmic-white hover:bg-cosmic-white/10"
                  disabled={loading}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-green-500/20 border border-green-500/30 rounded p-2 text-center">
                  <div className="text-green-400 font-medium">✓ Authenticated</div>
                </div>
                <div className="bg-cosmic-purple/20 border border-cosmic-purple/30 rounded p-2 text-center">
                  <div className="text-cosmic-purple font-medium">🔐 Secure</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="text-center">
                <p className="text-cosmic-white/70 text-sm mb-4">
                  Sign in to save your creations and access advanced features
                </p>
                
                <Button
                  onClick={signInAnonymously}
                  disabled={loading}
                  className="w-full bg-cosmic-purple hover:bg-cosmic-purple/80 text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {loading ? 'Signing In...' : 'Quick Anonymous Sign-In'}
                </Button>
              </div>

              {/* Features List */}
              <div className="space-y-2 text-xs text-cosmic-white/60">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-cosmic-purple rounded-full"></div>
                  <span>Save prompts and generated assets</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-cosmic-purple rounded-full"></div>
                  <span>Access to creator dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-cosmic-purple rounded-full"></div>
                  <span>Cloud sync across devices</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Technical Note */}
      <div className="mt-4 pt-4 border-t border-cosmic-white/10">
        <p className="text-cosmic-white/40 text-xs">
          <strong>Demo Mode:</strong> Using Firebase anonymous authentication. 
          In production, this would connect to your Firebase project with real user management.
        </p>
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    firebase: any
  }
}