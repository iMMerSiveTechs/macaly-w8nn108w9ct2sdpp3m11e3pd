"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Pin, 
  Lock, 
  Star, 
  ChevronRight,
  Plus,
  Search,
  Filter,
  Clock,
  Eye,
  Crown,
  Zap,
  Globe,
  Music,
  Code,
  Palette,
  Gamepad2
} from 'lucide-react'
import { auth, db } from '../firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

interface ForumCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
  threads: number
  posts: number
  lastActivity: string
  moderators: string[]
  isPrivate?: boolean
}

interface Thread {
  id: string
  title: string
  content: string
  author: string
  authorAvatar: string
  categoryId: string
  isPinned: boolean
  isLocked: boolean
  views: number
  replies: number
  likes: number
  lastReply: string
  tags: string[]
  type: 'discussion' | 'showcase' | 'help' | 'marketplace'
}

export default function CommunityForums() {
  const [user] = useAuthState(auth)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [threads, setThreads] = useState<Thread[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest')

  const categories: ForumCategory[] = [
    {
      id: 'general',
      name: 'General Discussion',
      description: 'Chat about anything immersive',
      icon: MessageSquare,
      color: 'text-cosmic-cyan',
      threads: 1247,
      posts: 15892,
      lastActivity: '2 minutes ago',
      moderators: ['admin', 'maya_chen']
    },
    {
      id: 'worlds',
      name: 'World Building',
      description: 'Share and discuss world creations',
      icon: Globe,
      color: 'text-cosmic-purple',
      threads: 892,
      posts: 12043,
      lastActivity: '5 minutes ago',
      moderators: ['jethro_creates', 'world_master']
    },
    {
      id: 'music',
      name: 'Sonarium & Music',
      description: 'Audio creation and sound design',
      icon: Music,
      color: 'text-cosmic-green',
      threads: 634,
      posts: 8921,
      lastActivity: '12 minutes ago',
      moderators: ['audio_wizard', 'sonarium_team']
    },
    {
      id: 'dev',
      name: 'Development & APIs',
      description: 'Technical discussions and coding',
      icon: Code,
      color: 'text-cosmic-pink',
      threads: 421,
      posts: 6754,
      lastActivity: '1 hour ago',
      moderators: ['dev_team', 'api_guru']
    },
    {
      id: 'showcase',
      name: 'Creator Showcase',
      description: 'Show off your best work',
      icon: Palette,
      color: 'text-cosmic-orange',
      threads: 1156,
      posts: 9832,
      lastActivity: '8 minutes ago',
      moderators: ['curator_prime']
    },
    {
      id: 'gaming',
      name: 'Immersive Gaming',
      description: 'Games built in Nemurium',
      icon: Gamepad2,
      color: 'text-cosmic-yellow',
      threads: 723,
      posts: 11245,
      lastActivity: '15 minutes ago',
      moderators: ['game_master']
    },
    {
      id: 'marketplace',
      name: 'Creator Marketplace',
      description: 'Buy, sell, and trade assets',
      icon: Crown,
      color: 'text-cosmic-gold',
      threads: 345,
      posts: 4521,
      lastActivity: '3 hours ago',
      moderators: ['market_admin'],
      isPrivate: true
    }
  ]

  const mockThreads: Thread[] = [
    {
      id: '1',
      title: 'How to create realistic water effects in your worlds?',
      content: 'Looking for tips on creating convincing water physics and visuals...',
      author: 'maya_dreamscape',
      authorAvatar: '/avatars/maya.jpg',
      categoryId: 'worlds',
      isPinned: true,
      isLocked: false,
      views: 2847,
      replies: 34,
      likes: 156,
      lastReply: '2 hours ago',
      tags: ['water', 'physics', 'tutorial'],
      type: 'help'
    },
    {
      id: '2',
      title: 'Sonarium: New ambient sound generation features!',
      content: 'Excited to share the latest updates to our audio engine...',
      author: 'sonarium_team',
      authorAvatar: '/avatars/team.jpg',
      categoryId: 'music',
      isPinned: true,
      isLocked: false,
      views: 1923,
      replies: 67,
      likes: 289,
      lastReply: '45 minutes ago',
      tags: ['sonarium', 'update', 'features'],
      type: 'discussion'
    },
    {
      id: '3',
      title: '[SHOWCASE] My cyberpunk city - 6 months of work!',
      content: 'Finally finished my massive cyberpunk metropolis. Check it out...',
      author: 'neon_architect',
      authorAvatar: '/avatars/neon.jpg',
      categoryId: 'showcase',
      isPinned: false,
      isLocked: false,
      views: 5621,
      replies: 128,
      likes: 892,
      lastReply: '20 minutes ago',
      tags: ['cyberpunk', 'city', 'architecture'],
      type: 'showcase'
    }
  ]

  useEffect(() => {
    setThreads(mockThreads)
  }, [])

  const filteredThreads = threads.filter(thread => {
    const matchesCategory = activeCategory === 'all' || thread.categoryId === activeCategory
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes
      case 'trending':
        return b.views - a.views
      default:
        return 0 // Would use timestamp in real implementation
    }
  })

  const getThreadTypeColor = (type: string) => {
    switch (type) {
      case 'showcase': return 'bg-cosmic-purple/20 text-cosmic-purple'
      case 'help': return 'bg-cosmic-cyan/20 text-cosmic-cyan'
      case 'marketplace': return 'bg-cosmic-gold/20 text-cosmic-gold'
      default: return 'bg-cosmic-white/10 text-cosmic-white/70'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Community Forums</h1>
          <p className="text-cosmic-white/70">Connect, share, and learn with fellow creators</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all">
          <Plus className="h-5 w-5" />
          New Thread
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmic-white/50" />
          <input
            type="text"
            placeholder="Search forums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
          />
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-cosmic-white mb-4">Categories</h3>
            
            <div className="space-y-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  activeCategory === 'all' 
                    ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                    : 'hover:bg-cosmic-white/10 text-cosmic-white/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5" />
                  <div>
                    <div className="font-medium">All Categories</div>
                    <div className="text-xs opacity-70">
                      {categories.reduce((sum, cat) => sum + cat.threads, 0)} threads
                    </div>
                  </div>
                </div>
              </button>
              
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeCategory === category.id 
                        ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                        : 'hover:bg-cosmic-white/10 text-cosmic-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`h-5 w-5 ${category.color}`} />
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {category.name}
                          {category.isPrivate && <Lock className="h-3 w-3" />}
                        </div>
                        <div className="text-xs opacity-70">
                          {category.threads} threads • {category.posts} posts
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Forum Content */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {sortedThreads.map((thread) => (
              <motion.div
                key={thread.id}
                layout
                className="glass-panel p-6 hover:bg-cosmic-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cosmic-purple rounded-full flex items-center justify-center flex-shrink-0">
                    {thread.author.charAt(0).toUpperCase()}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {thread.isPinned && <Pin className="h-4 w-4 text-cosmic-purple" />}
                        {thread.isLocked && <Lock className="h-4 w-4 text-cosmic-white/50" />}
                        <span className={`px-2 py-1 rounded-full text-xs ${getThreadTypeColor(thread.type)}`}>
                          {thread.type}
                        </span>
                        <h3 className="text-lg font-semibold text-cosmic-white hover:text-cosmic-purple transition-all">
                          {thread.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-cosmic-white/70 mb-3 line-clamp-2">{thread.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {thread.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-cosmic-white/10 text-cosmic-white/70 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-cosmic-white/70">
                        <span>by @{thread.author}</span>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {thread.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {thread.replies}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {thread.likes}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-cosmic-white/50">
                        <Clock className="h-4 w-4" />
                        Last reply {thread.lastReply}
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-cosmic-white/30 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg text-cosmic-white transition-all">
              Load More Threads
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}