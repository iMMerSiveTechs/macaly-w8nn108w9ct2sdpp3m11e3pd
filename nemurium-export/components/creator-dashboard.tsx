"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  LogIn, 
  Plus, 
  Folder, 
  Star, 
  Download, 
  Share2, 
  Settings,
  Crown,
  Zap,
  Brain,
  Sparkles
} from 'lucide-react'
import { auth, db } from '../firebase-config'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs 
} from 'firebase/firestore'

interface Project {
  id: string
  name: string
  description: string
  createdAt: string
  lastModified: string
  thumbnail?: string
  type: 'world' | 'asset' | 'experience'
  status: 'draft' | 'published' | 'archived'
  aiGenerated: boolean
  dimensions: '2d' | '3d' | 'immersive'
}

interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  tier: 'free' | 'pro' | 'founding_creator'
  credits: number
  projectsCreated: number
  aiGenerationsUsed: number
  joinedAt: string
  lastActive: string
}

export default function CreatorDashboard() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewProject, setShowNewProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectType, setNewProjectType] = useState<'world' | 'asset' | 'experience'>('world')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid)
        setUser(userProfile)
        loadUserProjects(firebaseUser.uid)
      } else {
        setUser(null)
        setProjects([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const getUserProfile = async (uid: string): Promise<UserProfile> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      
      if (userDoc.exists()) {
        const data = userDoc.data()
        return {
          ...data,
          lastActive: new Date().toISOString()
        } as UserProfile
      } else {
        const newUser: UserProfile = {
          uid,
          email: auth.currentUser?.email || '',
          displayName: auth.currentUser?.displayName || 'Creator',
          photoURL: auth.currentUser?.photoURL || undefined,
          tier: 'free',
          credits: 100, // Welcome credits
          projectsCreated: 0,
          aiGenerationsUsed: 0,
          joinedAt: new Date().toISOString(),
          lastActive: new Date().toISOString()
        }
        
        await setDoc(doc(db, 'users', uid), newUser)
        return newUser
      }
    } catch (error) {
      console.error('Error getting user profile:', error)
      throw error
    }
  }

  const loadUserProjects = async (uid: string) => {
    try {
      const projectsQuery = query(
        collection(db, 'projects'),
        where('userId', '==', uid),
        orderBy('lastModified', 'desc')
      )
      
      const querySnapshot = await getDocs(projectsQuery)
      const userProjects: Project[] = []
      
      querySnapshot.forEach((doc) => {
        userProjects.push({ id: doc.id, ...doc.data() } as Project)
      })
      
      setProjects(userProjects)
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  const createNewProject = async () => {
    if (!user || !newProjectName.trim()) return

    const projectId = `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const newProject: Omit<Project, 'id'> = {
      name: newProjectName.trim(),
      description: `AI-Generated ${newProjectType} created in Nemurium`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      type: newProjectType,
      status: 'draft',
      aiGenerated: true,
      dimensions: '2d' // Start with 2D, can upgrade to 3D/immersive
    }

    try {
      await setDoc(doc(db, 'projects', projectId), {
        ...newProject,
        userId: user.uid
      })

      // Update user stats
      await setDoc(doc(db, 'users', user.uid), {
        ...user,
        projectsCreated: user.projectsCreated + 1,
        lastActive: new Date().toISOString()
      }, { merge: true })

      setProjects([{ id: projectId, ...newProject }, ...projects])
      setShowNewProject(false)
      setNewProjectName('')
      
      // Navigate to AI generation for this project
      window.location.href = `/ai-generator?project=${projectId}`
      
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Failed to create project. Please try again.')
    }
  }

  const openProject = (projectId: string) => {
    window.location.href = `/world-builder?project=${projectId}`
  }

  const upgradeProject = async (projectId: string, newDimension: '3d' | 'immersive') => {
    if (!user) return

    try {
      await setDoc(doc(db, 'projects', projectId), {
        dimensions: newDimension,
        lastModified: new Date().toISOString()
      }, { merge: true })

      // Update local state
      setProjects(projects.map(p => 
        p.id === projectId 
          ? { ...p, dimensions: newDimension, lastModified: new Date().toISOString() }
          : p
      ))

      console.log(`🚀 Project upgraded to ${newDimension}!`)
      
    } catch (error) {
      console.error('Error upgrading project:', error)
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'founding_creator':
        return { icon: Crown, label: 'Founding Creator', color: 'text-yellow-400 bg-yellow-400/20' }
      case 'pro':
        return { icon: Zap, label: 'Pro', color: 'text-cosmic-purple bg-cosmic-purple/20' }
      default:
        return { icon: User, label: 'Free', color: 'text-cosmic-cyan bg-cosmic-cyan/20' }
    }
  }

  const getProjectIcon = (type: string, dimensions: string) => {
    if (dimensions === 'immersive') return '🌍'
    if (dimensions === '3d') return '📦'
    if (type === 'world') return '🏞️'
    if (type === 'asset') return '🎨'
    return '⭐'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-space flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cosmic-white text-lg">Loading your creative universe...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cosmic-space flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-10 w-10 text-cosmic-purple" />
              <h1 className="text-3xl font-bold text-gradient">Nemurium</h1>
              <Sparkles className="h-10 w-10 text-cosmic-cyan" />
            </div>
            <p className="text-cosmic-white/80">
              Sign in to start creating with the most advanced AI system
            </p>
          </div>
          
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full py-4 px-6 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan rounded-lg font-semibold text-white hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-center gap-3">
              <LogIn className="h-5 w-5" />
              Sign In to Create
            </div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Welcome back, {user.displayName}
            </h1>
            <div className="flex items-center gap-4 text-cosmic-white/70">
              <span>{user.credits} credits</span>
              <span>•</span>
              <span>{projects.length} projects</span>
              <span>•</span>
              <div className={`px-3 py-1 rounded-full text-sm ${getTierBadge(user.tier).color}`}>
                {getTierBadge(user.tier).label}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowNewProject(true)}
              className="flex items-center gap-2 px-6 py-3 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg font-semibold transition-all"
            >
              <Plus className="h-5 w-5" />
              New Project
            </button>
            <button className="p-3 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold text-cosmic-purple mb-2">
              {user.aiGenerationsUsed}
            </div>
            <div className="text-cosmic-white/70 text-sm">AI Generations</div>
          </div>
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold text-cosmic-cyan mb-2">
              {projects.filter(p => p.status === 'published').length}
            </div>
            <div className="text-cosmic-white/70 text-sm">Published</div>
          </div>
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold text-cosmic-pink mb-2">
              {projects.filter(p => p.dimensions === 'immersive').length}
            </div>
            <div className="text-cosmic-white/70 text-sm">Immersive</div>
          </div>
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold text-cosmic-green mb-2">
              {user.credits}
            </div>
            <div className="text-cosmic-white/70 text-sm">Credits Left</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="glass-panel p-6 hover:bg-cosmic-white/10 transition-all cursor-pointer group"
              onClick={() => openProject(project.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">
                  {getProjectIcon(project.type, project.dimensions)}
                </div>
                <div className="flex gap-2">
                  {project.dimensions !== 'immersive' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        upgradeProject(
                          project.id, 
                          project.dimensions === '2d' ? '3d' : 'immersive'
                        )
                      }}
                      className="px-3 py-1 bg-cosmic-purple/20 hover:bg-cosmic-purple/40 text-cosmic-purple text-xs rounded-full transition-all"
                    >
                      {project.dimensions === '2d' ? 'Make 3D' : 'Make Immersive'}
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.share?.({ 
                        title: project.name,
                        url: `${window.location.origin}/project/${project.id}`
                      })
                    }}
                    className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-cosmic-white mb-2">
                {project.name}
              </h3>
              
              <p className="text-cosmic-white/70 text-sm mb-4">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-cosmic-white/50">
                <span>{project.type} • {project.dimensions}</span>
                <span>{new Date(project.lastModified).toLocaleDateString()}</span>
              </div>
              
              {project.aiGenerated && (
                <div className="mt-3 flex items-center gap-1 text-xs text-cosmic-purple">
                  <Brain className="h-3 w-3" />
                  AI Generated
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-cosmic-white mb-2">
              Ready to create your first project?
            </h3>
            <p className="text-cosmic-white/70 mb-6">
              Use our advanced AI to generate anything from 2D art to immersive 3D worlds
            </p>
            <button
              onClick={() => setShowNewProject(true)}
              className="px-8 py-4 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan rounded-lg font-semibold text-white hover:shadow-lg transition-all"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {showNewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowNewProject(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-cosmic-space border border-cosmic-white/20 rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-cosmic-white mb-4">
                Create New Project
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-cosmic-white mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="My AI Creation"
                    className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-cosmic-white mb-2">
                    Project Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['world', 'asset', 'experience'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewProjectType(type as any)}
                        className={`p-3 rounded-lg border transition-all ${
                          newProjectType === type
                            ? 'bg-cosmic-purple border-cosmic-purple text-white'
                            : 'bg-cosmic-white/5 border-cosmic-white/20 text-cosmic-white/70 hover:bg-cosmic-white/10'
                        }`}
                      >
                        <div className="text-lg mb-1">
                          {type === 'world' ? '🌍' : type === 'asset' ? '🎨' : '⭐'}
                        </div>
                        <div className="text-xs capitalize">{type}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewProject(false)}
                  className="flex-1 px-4 py-3 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewProject}
                  disabled={!newProjectName.trim()}
                  className="flex-1 px-4 py-3 bg-cosmic-purple hover:bg-cosmic-purple/80 disabled:opacity-50 rounded-lg transition-all"
                >
                  Create & Generate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}