"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Users, Zap, Crown, Sparkles, ExternalLink } from 'lucide-react'

interface DiscordStats {
  memberCount: number
  onlineCount: number
  recentActivity: string[]
}

export default function DiscordCommunity() {
  const [stats, setStats] = useState<DiscordStats>({
    memberCount: 847,
    onlineCount: 156,
    recentActivity: [
      "🎨 @CreatorX just shared their neon forest realm!",
      "🚀 @DevMike released new AI tools update",
      "💎 @ArtistY became a Founding Creator",
      "🌟 Weekly creation challenge starts tomorrow!"
    ]
  })

  const [showJoinModal, setShowJoinModal] = useState(false)
  const [userRole, setUserRole] = useState<'visitor' | 'creator' | 'founding_creator'>('visitor')

  const discordInviteUrl = process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg/nemurium'

  const communityFeatures = [
    {
      icon: MessageCircle,
      title: "Creator Chat",
      description: "Connect with fellow creators, share ideas, and get instant feedback on your worlds",
      channels: ["#general-chat", "#world-showcase", "#collaboration"]
    },
    {
      icon: Zap,
      title: "AI Updates",
      description: "Be the first to know about new AI features, beta access, and platform updates",
      channels: ["#announcements", "#ai-updates", "#beta-testing"]
    },
    {
      icon: Crown,
      title: "Founding Creator Access",
      description: "Exclusive channels for early supporters with special perks and direct dev access",
      channels: ["#founding-creators", "#vip-support", "#roadmap-input"]
    },
    {
      icon: Sparkles,
      title: "Weekly Challenges",
      description: "Participate in creation challenges, win prizes, and get featured on our platform",
      channels: ["#challenges", "#submissions", "#winners-circle"]
    }
  ]

  const communityRoles = [
    {
      name: "Cosmic Creator",
      color: "text-cosmic-purple",
      description: "Active world builders",
      perks: ["Access to beta features", "Creator spotlight opportunities"]
    },
    {
      name: "Realm Pioneer",
      color: "text-cosmic-cyan", 
      description: "Early platform adopters",
      perks: ["Special badge", "Priority support"]
    },
    {
      name: "Founding Creator",
      color: "text-yellow-400",
      description: "Limited founding members",
      perks: ["Lifetime Pro features", "Revenue sharing", "Direct dev access"]
    }
  ]

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        onlineCount: prev.onlineCount + Math.floor(Math.random() * 3) - 1,
        memberCount: prev.memberCount + (Math.random() > 0.8 ? 1 : 0)
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const joinDiscord = () => {
    // Track Discord join event
    console.log('🎮 User joining Discord community')
    
    // Open Discord invite in new tab
    window.open(discordInviteUrl, '_blank')
    
    // Show success message
    setShowJoinModal(true)
    setTimeout(() => setShowJoinModal(false), 3000)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'founding_creator': return '👑'
      case 'creator': return '🎨'
      default: return '🌟'
    }
  }

  return (
    <div className="space-y-8">
      {/* Community Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageCircle className="h-8 w-8 text-cosmic-purple" />
          <h2 className="text-3xl font-bold text-gradient">Join Our Discord</h2>
          <Users className="h-8 w-8 text-cosmic-cyan" />
        </div>
        <p className="text-cosmic-white/80 max-w-2xl mx-auto">
          Connect with a thriving community of creators, get early access to features, 
          and shape the future of immersive content creation.
        </p>
      </motion.div>

      {/* Live Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-cosmic-purple mb-2">
            {stats.memberCount.toLocaleString()}
          </div>
          <div className="text-cosmic-white/70">Total Members</div>
          <div className="text-sm text-green-400 mt-1">
            +{Math.floor(Math.random() * 5) + 1} today
          </div>
        </div>
        
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-cosmic-cyan mb-2">
            {stats.onlineCount}
          </div>
          <div className="text-cosmic-white/70">Online Now</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">Live</span>
          </div>
        </div>
        
        <div className="glass-panel p-6 text-center">
          <div className="text-3xl font-bold text-cosmic-pink mb-2">
            24/7
          </div>
          <div className="text-cosmic-white/70">Active Community</div>
          <div className="text-sm text-cosmic-pink mt-1">
            Always Creating
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6"
      >
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-cosmic-cyan" />
          Live Community Activity
        </h3>
        <div className="space-y-3">
          {stats.recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 p-3 bg-cosmic-white/5 rounded-lg"
            >
              <div className="w-2 h-2 bg-cosmic-cyan rounded-full animate-pulse" />
              <span className="text-cosmic-white/80 text-sm">{activity}</span>
              <span className="text-cosmic-white/50 text-xs ml-auto">
                {Math.floor(Math.random() * 60) + 1}m ago
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {communityFeatures.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <div key={index} className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cosmic-purple/20 rounded-lg">
                  <IconComponent className="h-6 w-6 text-cosmic-purple" />
                </div>
                <h3 className="text-lg font-semibold text-cosmic-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-cosmic-white/70 mb-4">
                {feature.description}
              </p>
              <div className="space-y-1">
                {feature.channels.map((channel, channelIndex) => (
                  <div key={channelIndex} className="text-sm text-cosmic-cyan">
                    {channel}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Community Roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-panel p-6"
      >
        <h3 className="text-xl font-semibold text-cosmic-white mb-6 text-center">
          Community Roles & Perks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communityRoles.map((role, index) => (
            <div key={index} className="text-center p-4 bg-cosmic-white/5 rounded-lg">
              <div className={`text-2xl font-bold ${role.color} mb-2`}>
                {role.name}
              </div>
              <div className="text-cosmic-white/70 text-sm mb-3">
                {role.description}
              </div>
              <div className="space-y-1">
                {role.perks.map((perk, perkIndex) => (
                  <div key={perkIndex} className="text-xs text-cosmic-white/60 flex items-center justify-center gap-1">
                    <span>✨</span>
                    {perk}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Join Discord CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <div className="glass-panel p-8">
          <h3 className="text-2xl font-bold text-cosmic-white mb-4">
            Ready to Join the Community?
          </h3>
          <p className="text-cosmic-white/70 mb-6 max-w-md mx-auto">
            Get instant access to our Discord server, connect with creators, 
            and be part of building the Immersive Internet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={joinDiscord}
              className="flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-lg font-semibold text-white transition-all transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              Join Discord Community
              <ExternalLink className="h-4 w-4" />
            </button>
            
            <div className="flex items-center gap-2 text-cosmic-white/60 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              Free • Instant Access • No Verification Required
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-cosmic-white/50">
            <div className="flex items-center gap-1">
              {getRoleIcon(userRole)}
              <span>Your role: {userRole.replace('_', ' ')}</span>
            </div>
            <div>•</div>
            <div>24/7 Community Support</div>
            <div>•</div>
            <div>Weekly Events & Challenges</div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      {showJoinModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>Opening Discord... Welcome to the community! 🎉</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}