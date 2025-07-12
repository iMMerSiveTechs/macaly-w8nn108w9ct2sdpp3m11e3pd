"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  Users, 
  MessageCircle, 
  TrendingUp, 
  User, 
  Settings,
  Search,
  Bell,
  Plus,
  Star,
  Crown,
  Zap
} from 'lucide-react'
import SocialHub from '@/components/social-hub'
import CommunityForums from '@/components/community-forums'
import DirectMessages from '@/components/direct-messages'
import { auth } from '../../firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

type SocialSection = 'feed' | 'forums' | 'messages' | 'trending' | 'profile'

export default function SocialPlatform() {
  const [user] = useAuthState(auth)
  const [activeSection, setActiveSection] = useState<SocialSection>('feed')
  const [notifications, setNotifications] = useState(12)

  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home, description: 'Social timeline' },
    { id: 'forums', label: 'Forums', icon: Users, description: 'Community discussions' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, description: 'Direct messages' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, description: 'Popular content' },
    { id: 'profile', label: 'Profile', icon: User, description: 'Your creator profile' }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'feed':
        return <SocialHub />
      case 'forums':
        return <CommunityForums />
      case 'messages':
        return <DirectMessages />
      case 'trending':
        return <TrendingContent />
      case 'profile':
        return <CreatorProfile />
      default:
        return <SocialHub />
    }
  }

  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white">
      {/* Top Navigation */}
      <div className="sticky top-0 bg-cosmic-space/80 backdrop-blur-sm border-b border-cosmic-white/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cosmic-purple to-cosmic-cyan rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold">N</span>
                </div>
                <h1 className="text-xl font-bold text-gradient">Nemurium Social</h1>
              </div>
              
              {/* Navigation Pills */}
              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id as SocialSection)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeSection === item.id
                          ? 'bg-cosmic-purple text-white'
                          : 'text-cosmic-white/70 hover:text-white hover:bg-cosmic-white/10'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.id === 'messages' && notifications > 0 && (
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{notifications > 9 ? '9+' : notifications}</span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cosmic-white/50" />
                <input
                  type="text"
                  placeholder="Search creators, worlds..."
                  className="pl-10 pr-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple w-64"
                />
              </div>
              
              {/* Quick Actions */}
              <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                <Plus className="h-5 w-5" />
              </button>
              
              <button className="relative p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </button>
              
              <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                <Settings className="h-5 w-5" />
              </button>
              
              {/* User Avatar */}
              <div className="w-8 h-8 bg-cosmic-purple rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden mt-4">
            <div className="flex overflow-x-auto gap-2 pb-2">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SocialSection)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      activeSection === item.id
                        ? 'bg-cosmic-purple text-white'
                        : 'text-cosmic-white/70 hover:text-white bg-cosmic-white/10'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Trending Content Component
function TrendingContent() {
  const trendingTopics = [
    { tag: '#NemuriuCreators', posts: 1247, growth: '+23%' },
    { tag: '#VRWorlds', posts: 892, growth: '+15%' },
    { tag: '#SonariumBeats', posts: 634, growth: '+31%' },
    { tag: '#CyberpunkArt', posts: 421, growth: '+8%' },
    { tag: '#ImmersiveMusic', posts: 356, growth: '+19%' }
  ]

  const featuredCreators = [
    { name: 'Maya Chen', specialty: 'VR Architect', followers: '15.2K', verified: true },
    { name: 'Neon Builder', specialty: 'Cyberpunk Artist', followers: '12.8K', verified: false },
    { name: 'Audio Wizard', specialty: 'Sound Designer', followers: '9.4K', verified: true },
    { name: 'Space Creator', specialty: 'Sci-Fi Worlds', followers: '7.1K', verified: false }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Trending Now</h2>
        <p className="text-cosmic-white/70">Discover what's popular in the immersive creator community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Topics */}
        <div className="glass-panel p-6">
          <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-cosmic-purple" />
            Trending Topics
          </h3>
          
          <div className="space-y-4">
            {trendingTopics.map((topic, index) => (
              <div key={topic.tag} className="flex items-center justify-between p-3 bg-cosmic-white/5 rounded-lg hover:bg-cosmic-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-cosmic-purple">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-cosmic-white">{topic.tag}</div>
                    <div className="text-sm text-cosmic-white/70">{topic.posts} posts</div>
                  </div>
                </div>
                <div className="text-cosmic-green font-medium">{topic.growth}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Creators */}
        <div className="glass-panel p-6">
          <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-cosmic-cyan" />
            Featured Creators
          </h3>
          
          <div className="space-y-4">
            {featuredCreators.map((creator) => (
              <div key={creator.name} className="flex items-center justify-between p-3 bg-cosmic-white/5 rounded-lg hover:bg-cosmic-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cosmic-cyan rounded-full flex items-center justify-center">
                    {creator.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-cosmic-white">{creator.name}</span>
                      {creator.verified && <Star className="h-4 w-4 text-cosmic-purple" />}
                    </div>
                    <div className="text-sm text-cosmic-white/70">{creator.specialty}</div>
                  </div>
                </div>
                <div className="text-cosmic-white/70">{creator.followers}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Events */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-cosmic-pink" />
          Live Events
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-cosmic-pink/10 border border-cosmic-pink/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-cosmic-pink">LIVE NOW</span>
            </div>
            <h4 className="font-semibold text-cosmic-white mb-1">VR Concert Series</h4>
            <p className="text-sm text-cosmic-white/70 mb-3">Maya hosting live in Crystal Cave</p>
            <button className="text-xs px-3 py-1 bg-cosmic-pink/20 text-cosmic-pink rounded-full">
              Join Live (247 watching)
            </button>
          </div>
          
          <div className="p-4 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-cosmic-purple" />
              <span className="text-sm font-medium text-cosmic-purple">PREMIUM EVENT</span>
            </div>
            <h4 className="font-semibold text-cosmic-white mb-1">Masterclass: World Building</h4>
            <p className="text-sm text-cosmic-white/70 mb-3">Advanced techniques with pros</p>
            <button className="text-xs px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple rounded-full">
              Starting in 2hrs
            </button>
          </div>
          
          <div className="p-4 bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-cosmic-cyan" />
              <span className="text-sm font-medium text-cosmic-cyan">COMMUNITY</span>
            </div>
            <h4 className="font-semibold text-cosmic-white mb-1">Weekly Creator Hangout</h4>
            <p className="text-sm text-cosmic-white/70 mb-3">Open discussion & feedback</p>
            <button className="text-xs px-3 py-1 bg-cosmic-cyan/20 text-cosmic-cyan rounded-full">
              Tomorrow 8PM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Creator Profile Component
function CreatorProfile() {
  return (
    <div className="space-y-8">
      <div className="glass-panel p-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-cosmic-purple rounded-full flex items-center justify-center">
            <User className="h-12 w-12" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-cosmic-white">Jethro Gordon</h2>
              <Star className="h-6 w-6 text-cosmic-purple" />
              <Crown className="h-6 w-6 text-cosmic-purple" />
            </div>
            
            <p className="text-cosmic-white/70 mb-4">Building the immersive internet, one world at a time 🌍</p>
            
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="font-semibold text-cosmic-white">15.2K</span>
                <span className="text-cosmic-white/70 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold text-cosmic-white">284</span>
                <span className="text-cosmic-white/70 ml-1">Following</span>
              </div>
              <div>
                <span className="font-semibold text-cosmic-white">23</span>
                <span className="text-cosmic-white/70 ml-1">Worlds</span>
              </div>
            </div>
          </div>
          
          <button className="px-6 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all">
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Profile content sections would go here */}
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-cosmic-white mb-2">Profile Coming Soon</h3>
        <p className="text-cosmic-white/70">Full creator profiles with world showcases, stats, and more</p>
      </div>
    </div>
  )
}