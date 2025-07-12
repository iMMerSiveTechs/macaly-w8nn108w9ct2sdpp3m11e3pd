"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  Users, 
  Globe, 
  Camera,
  Music,
  Video,
  Crown,
  Star,
  Zap,
  Send,
  Plus,
  Settings,
  Bell
} from 'lucide-react'
import { auth, db } from '../firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  increment,
  arrayUnion,
  serverTimestamp
} from 'firebase/firestore'

interface Post {
  id: string
  userId: string
  username: string
  avatar: string
  type: 'text' | 'world' | 'video' | 'audio' | 'image'
  content: string
  mediaUrl?: string
  worldId?: string
  likes: number
  comments: number
  shares: number
  likedBy: string[]
  timestamp: any
  verified?: boolean
  premium?: boolean
}

interface Creator {
  id: string
  username: string
  displayName: string
  avatar: string
  bio: string
  followers: number
  following: number
  worldsCreated: number
  verified: boolean
  premium: boolean
  backgroundWorld?: string
}

export default function SocialHub() {
  const [user] = useAuthState(auth)
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [postType, setPostType] = useState<'text' | 'world' | 'video' | 'audio'>('text')
  const [trendingCreators, setTrendingCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Real-time posts feed
    const postsQuery = query(
      collection(db, 'social_posts'),
      orderBy('timestamp', 'desc'),
      limit(50)
    )

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[]
      
      setPosts(postsData)
      setLoading(false)
    })

    // Load trending creators
    loadTrendingCreators()

    return () => unsubscribe()
  }, [])

  const loadTrendingCreators = async () => {
    // Mock trending creators for now
    setTrendingCreators([
      {
        id: '1',
        username: 'jethro_creates',
        displayName: 'Jethro Gordon',
        avatar: '/avatars/jethro.jpg',
        bio: 'Building the immersive internet 🌍',
        followers: 15420,
        following: 284,
        worldsCreated: 23,
        verified: true,
        premium: true,
        backgroundWorld: 'cosmic-studio'
      },
      {
        id: '2', 
        username: 'maya_dreamscape',
        displayName: 'Maya Chen',
        avatar: '/avatars/maya.jpg',
        bio: 'VR artist & world architect ✨',
        followers: 8930,
        following: 156,
        worldsCreated: 41,
        verified: true,
        premium: false
      }
    ])
  }

  const createPost = async () => {
    if (!user || !newPost.trim()) return

    try {
      await addDoc(collection(db, 'social_posts'), {
        userId: user.uid,
        username: user.displayName || 'Creator',
        avatar: user.photoURL || '/default-avatar.png',
        type: postType,
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        likedBy: [],
        verified: false, // Check user's verified status
        premium: false, // Check user's premium status
        timestamp: serverTimestamp()
      })

      setNewPost('')
      console.log('📝 Post created successfully')
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const likePost = async (postId: string, currentLikes: number, likedBy: string[]) => {
    if (!user) return

    const isLiked = likedBy.includes(user.uid)
    const postRef = doc(db, 'social_posts', postId)

    try {
      if (isLiked) {
        // Unlike
        await updateDoc(postRef, {
          likes: increment(-1),
          likedBy: likedBy.filter(id => id !== user.uid)
        })
      } else {
        // Like
        await updateDoc(postRef, {
          likes: increment(1),
          likedBy: arrayUnion(user.uid)
        })
      }
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'world': return <Globe className="h-4 w-4 text-cosmic-purple" />
      case 'video': return <Video className="h-4 w-4 text-cosmic-pink" />
      case 'audio': return <Music className="h-4 w-4 text-cosmic-cyan" />
      default: return null
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const PostHeader = ({ post }: { post: Post }) => (
    <div className="flex items-center gap-2 mb-2">
      <span className="font-semibold text-cosmic-white">{post.username}</span>
      {post.verified && <Star className="h-4 w-4 text-cosmic-purple" />}
      {post.premium && <Crown className="h-4 w-4 text-cosmic-purple" />}
      {getPostIcon(post.type)}
      <span className="text-cosmic-white/50 text-sm">
        • {post.timestamp?.toDate?.()?.toRelativeTime?.() || 'now'}
      </span>
    </div>
  )

  const PostActions = ({ post }: { post: Post }) => (
    <div className="flex items-center gap-6">
      <button
        onClick={() => likePost(post.id, post.likes, post.likedBy)}
        className={`flex items-center gap-2 transition-all ${
          user && post.likedBy.includes(user.uid)
            ? 'text-red-500'
            : 'text-cosmic-white/70 hover:text-red-500'
        }`}
      >
        <Heart className={`h-5 w-5 ${
          user && post.likedBy.includes(user.uid) ? 'fill-current' : ''
        }`} />
        <span className="text-sm">{formatNumber(post.likes)}</span>
      </button>
      
      <button className="flex items-center gap-2 text-cosmic-white/70 hover:text-cosmic-cyan transition-all">
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm">{formatNumber(post.comments)}</span>
      </button>
      
      <button className="flex items-center gap-2 text-cosmic-white/70 hover:text-cosmic-green transition-all">
        <Share2 className="h-5 w-5" />
        <span className="text-sm">{formatNumber(post.shares)}</span>
      </button>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-space flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cosmic-white text-lg">Loading social feed...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white">
      {/* Header */}
      <div className="sticky top-0 bg-cosmic-space/80 backdrop-blur-sm border-b border-cosmic-white/20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gradient">iMMerSive Social</h1>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <button className="hover:text-cosmic-purple transition-all">Home</button>
                <button className="hover:text-cosmic-cyan transition-all">Trending</button>
                <button className="hover:text-cosmic-pink transition-all">Communities</button>
                <button className="hover:text-cosmic-green transition-all">Live</button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                <Settings className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-cosmic-purple rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Trending Creators Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-cosmic-white mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-cosmic-purple" />
                Trending Creators
              </h3>
              
              <div className="space-y-4">
                {trendingCreators.map((creator) => (
                  <motion.div
                    key={creator.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-cosmic-white/5 rounded-lg hover:bg-cosmic-white/10 transition-all cursor-pointer"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-cosmic-purple to-cosmic-cyan rounded-full p-0.5">
                        <div className="w-full h-full bg-cosmic-space rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-cosmic-white" />
                        </div>
                      </div>
                      {creator.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cosmic-purple rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-cosmic-white">{creator.displayName}</span>
                        {creator.premium && <Crown className="h-3 w-3 text-cosmic-purple" />}
                      </div>
                      <div className="text-xs text-cosmic-white/70">@{creator.username}</div>
                      <div className="text-xs text-cosmic-white/50">
                        {formatNumber(creator.followers)} followers
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 px-4 bg-cosmic-purple/20 hover:bg-cosmic-purple/40 rounded-lg text-cosmic-purple font-medium transition-all">
                View All Creators
              </button>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 mb-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cosmic-purple rounded-full flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your immersive creation..."
                      className="w-full bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg p-4 text-cosmic-white placeholder-cosmic-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                      rows={3}
                    />
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        {['text', 'world', 'video', 'audio'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setPostType(type as any)}
                            className={`px-3 py-1 rounded-full text-xs transition-all ${
                              postType === type
                                ? 'bg-cosmic-purple text-white'
                                : 'bg-cosmic-white/10 text-cosmic-white/70 hover:bg-cosmic-white/20'
                            }`}
                          >
                            {getPostIcon(type)}
                            <span className="ml-1 capitalize">{type}</span>
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={createPost}
                        disabled={!newPost.trim()}
                        className="flex items-center gap-2 px-6 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 disabled:opacity-50 rounded-lg transition-all"
                      >
                        <Send className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              <AnimatePresence>
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-panel p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-cosmic-cyan rounded-full flex items-center justify-center">
                        <User className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <PostHeader post={post} />
                        
                        <p className="text-cosmic-white mb-4">{post.content}</p>
                        
                        {/* Media Content */}
                        {post.type === 'world' && (
                          <div className="mb-4 p-4 bg-cosmic-white/5 rounded-lg border border-cosmic-purple/30">
                            <div className="flex items-center gap-2 text-cosmic-purple mb-2">
                              <Globe className="h-4 w-4" />
                              <span className="text-sm font-medium">Immersive World</span>
                            </div>
                            <button className="w-full py-3 bg-cosmic-purple/20 hover:bg-cosmic-purple/40 rounded-lg text-cosmic-purple font-medium transition-all">
                              🌍 Enter World
                            </button>
                          </div>
                        )}
                        
                        {post.type === 'video' && post.mediaUrl && (
                          <div className="mb-4 aspect-video bg-cosmic-white/5 rounded-lg flex items-center justify-center">
                            <Play className="h-12 w-12 text-cosmic-pink" />
                          </div>
                        )}
                        
                        {post.type === 'audio' && post.mediaUrl && (
                          <div className="mb-4 p-4 bg-cosmic-cyan/10 rounded-lg">
                            <div className="flex items-center gap-4">
                              <button className="w-12 h-12 bg-cosmic-cyan rounded-full flex items-center justify-center">
                                <Play className="h-6 w-6" />
                              </button>
                              <div className="flex-1">
                                <div className="w-full h-2 bg-cosmic-white/20 rounded-full">
                                  <div className="w-1/3 h-full bg-cosmic-cyan rounded-full" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Engagement Actions */}
                        <PostActions post={post} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar - Live Activity */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-cosmic-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-cosmic-cyan" />
                Live Activity
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-cosmic-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Live Now</span>
                  </div>
                  <p className="text-sm text-cosmic-white/80">
                    Maya is hosting a VR concert in Crystal Cave
                  </p>
                  <button className="mt-2 text-xs px-3 py-1 bg-cosmic-pink/20 text-cosmic-pink rounded-full">
                    Join Live
                  </button>
                </div>
                
                <div className="p-3 bg-cosmic-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-cosmic-purple" />
                    <span className="text-sm font-medium">Popular Today</span>
                  </div>
                  <p className="text-sm text-cosmic-white/80">
                    #NemuriuMCreators is trending with 1.2K posts
                  </p>
                </div>
                
                <div className="p-3 bg-cosmic-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-cosmic-green" />
                    <span className="text-sm font-medium">Featured World</span>
                  </div>
                  <p className="text-sm text-cosmic-white/80">
                    "Cyberpunk Marketplace" by @neon_architect
                  </p>
                  <button className="mt-2 text-xs px-3 py-1 bg-cosmic-green/20 text-cosmic-green rounded-full">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}