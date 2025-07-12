"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, 
  Target, 
  BarChart3, 
  Eye, 
  Click, 
  Users, 
  Globe,
  Calendar,
  TrendingUp,
  Plus,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  Crown,
  Zap,
  Star
} from 'lucide-react'
import { auth, db } from '../firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'

interface AdCampaign {
  id: string
  name: string
  type: 'world_banner' | 'feed_post' | 'immersive_placement' | 'sponsored_world'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  status: 'active' | 'paused' | 'completed' | 'draft'
  startDate: Date
  endDate: Date
  targeting: {
    interests: string[]
    demographics: string[]
    locations: string[]
  }
  creativeAssets: {
    images: string[]
    videos?: string[]
    worldId?: string
  }
  ctr: number
  cpm: number
  roas: number
}

interface AdSpace {
  id: string
  type: 'banner' | 'portal' | 'skybox' | 'interactive_object'
  worldId: string
  worldName: string
  creatorName: string
  price: number
  dimensions?: string
  views: number
  engagement: number
  isAvailable: boolean
  category: string[]
}

export default function AdvertisingSystem() {
  const [user] = useAuthState(auth)
  const [activeTab, setActiveTab] = useState<'campaigns' | 'spaces' | 'analytics' | 'create'>('campaigns')
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([])
  const [adSpaces, setAdSpaces] = useState<AdSpace[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalImpressions, setTotalImpressions] = useState(0)

  const mockCampaigns: AdCampaign[] = [
    {
      id: 'camp1',
      name: 'Cyberpunk Fashion Brand Campaign',
      type: 'immersive_placement',
      budget: 5000,
      spent: 2847,
      impressions: 45892,
      clicks: 1247,
      conversions: 89,
      status: 'active',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
      targeting: {
        interests: ['cyberpunk', 'fashion', 'virtual_worlds'],
        demographics: ['18-35', 'tech_enthusiasts'],
        locations: ['global']
      },
      creativeAssets: {
        images: ['/ads/cyberpunk-fashion-1.jpg', '/ads/cyberpunk-fashion-2.jpg'],
        videos: ['/ads/cyberpunk-fashion-video.mp4']
      },
      ctr: 2.72,
      cpm: 6.21,
      roas: 3.2
    },
    {
      id: 'camp2',
      name: 'VR Headset Launch',
      type: 'sponsored_world',
      budget: 15000,
      spent: 8934,
      impressions: 67234,
      clicks: 2156,
      conversions: 156,
      status: 'active',
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-02-15'),
      targeting: {
        interests: ['vr', 'gaming', 'technology'],
        demographics: ['21-45', 'early_adopters'],
        locations: ['US', 'EU', 'JP']
      },
      creativeAssets: {
        worldId: 'vr_showroom_2025'
      },
      ctr: 3.21,
      cpm: 13.29,
      roas: 2.8
    }
  ]

  const mockAdSpaces: AdSpace[] = [
    {
      id: 'space1',
      type: 'banner',
      worldId: 'cyberpunk_city',
      worldName: 'Cyberpunk Metropolis',
      creatorName: 'maya_dreamscape',
      price: 50,
      dimensions: '1024x256',
      views: 12847,
      engagement: 8.4,
      isAvailable: true,
      category: ['cyberpunk', 'urban', 'neon']
    },
    {
      id: 'space2',
      type: 'portal',
      worldId: 'forest_sanctuary',
      worldName: 'Mystical Forest',
      creatorName: 'nature_builder',
      price: 25,
      views: 8932,
      engagement: 12.1,
      isAvailable: true,
      category: ['nature', 'peaceful', 'meditation']
    },
    {
      id: 'space3',
      type: 'interactive_object',
      worldId: 'music_venue',
      worldName: 'Concert Hall Supreme',
      creatorName: 'audio_architect',
      price: 75,
      views: 23456,
      engagement: 15.7,
      isAvailable: false,
      category: ['music', 'entertainment', 'social']
    }
  ]

  useEffect(() => {
    setCampaigns(mockCampaigns)
    setAdSpaces(mockAdSpaces)
    setTotalRevenue(24750)
    setTotalImpressions(156000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-cosmic-green bg-cosmic-green/20'
      case 'paused': return 'text-cosmic-yellow bg-cosmic-yellow/20'
      case 'completed': return 'text-cosmic-cyan bg-cosmic-cyan/20'
      case 'draft': return 'text-cosmic-white/70 bg-cosmic-white/10'
      default: return 'text-cosmic-white/50 bg-cosmic-white/5'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cosmic-white">My Campaigns</h2>
        <button 
          onClick={() => setActiveTab('create')}
          className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-6 w-6 text-cosmic-green" />
            <h3 className="font-semibold text-cosmic-white">Total Revenue</h3>
          </div>
          <div className="text-3xl font-bold text-cosmic-green">{formatCurrency(totalRevenue)}</div>
          <div className="text-sm text-cosmic-white/70">+12.5% from last month</div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-6 w-6 text-cosmic-cyan" />
            <h3 className="font-semibold text-cosmic-white">Total Impressions</h3>
          </div>
          <div className="text-3xl font-bold text-cosmic-cyan">{formatNumber(totalImpressions)}</div>
          <div className="text-sm text-cosmic-white/70">+8.2% from last month</div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-6 w-6 text-cosmic-purple" />
            <h3 className="font-semibold text-cosmic-white">Avg. CTR</h3>
          </div>
          <div className="text-3xl font-bold text-cosmic-purple">2.94%</div>
          <div className="text-sm text-cosmic-white/70">+0.3% from last month</div>
        </div>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            layout
            className="glass-panel p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-cosmic-white">{campaign.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-cosmic-white/70 text-sm mb-2">
                  {campaign.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
                <div className="flex items-center gap-4 text-sm text-cosmic-white/70">
                  <span>Budget: {formatCurrency(campaign.budget)}</span>
                  <span>•</span>
                  <span>Spent: {formatCurrency(campaign.spent)}</span>
                  <span>•</span>
                  <span>CTR: {campaign.ctr}%</span>
                  <span>•</span>
                  <span>ROAS: {campaign.roas}x</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {campaign.status === 'active' ? (
                  <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                    <Pause className="h-4 w-4" />
                  </button>
                ) : (
                  <button className="p-2 bg-cosmic-green/20 hover:bg-cosmic-green/40 rounded-lg transition-all">
                    <Play className="h-4 w-4 text-cosmic-green" />
                  </button>
                )}
                <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmic-purple">{formatNumber(campaign.impressions)}</div>
                <div className="text-xs text-cosmic-white/70">Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmic-cyan">{formatNumber(campaign.clicks)}</div>
                <div className="text-xs text-cosmic-white/70">Clicks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmic-green">{campaign.conversions}</div>
                <div className="text-xs text-cosmic-white/70">Conversions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmic-pink">{formatCurrency(campaign.cpm)}</div>
                <div className="text-xs text-cosmic-white/70">CPM</div>
              </div>
            </div>

            <div className="w-full bg-cosmic-white/20 rounded-full h-2">
              <div 
                className="bg-cosmic-purple h-2 rounded-full transition-all duration-500"
                style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-cosmic-white/70 mt-1">
              <span>Budget Progress</span>
              <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAdSpaces = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cosmic-white">Available Ad Spaces</h2>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white">
            <option value="all">All Categories</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="nature">Nature</option>
            <option value="music">Music</option>
            <option value="gaming">Gaming</option>
          </select>
          <select className="px-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white">
            <option value="all">All Types</option>
            <option value="banner">Banner</option>
            <option value="portal">Portal</option>
            <option value="interactive">Interactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adSpaces.map((space) => (
          <motion.div
            key={space.id}
            whileHover={{ scale: 1.02 }}
            className={`glass-panel p-6 ${space.isAvailable ? 'hover:bg-cosmic-white/10' : 'opacity-60'} transition-all cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-cosmic-cyan" />
                <span className="font-medium text-cosmic-white">{space.type.replace('_', ' ')}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                space.isAvailable 
                  ? 'bg-cosmic-green/20 text-cosmic-green' 
                  : 'bg-cosmic-red/20 text-cosmic-red'
              }`}>
                {space.isAvailable ? 'Available' : 'Occupied'}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-cosmic-white mb-1">{space.worldName}</h3>
            <p className="text-cosmic-white/70 text-sm mb-4">by @{space.creatorName}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-cosmic-white/70">Price per day</span>
                <span className="font-semibold text-cosmic-green">{formatCurrency(space.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cosmic-white/70">Daily views</span>
                <span className="text-cosmic-white">{formatNumber(space.views)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-cosmic-white/70">Engagement rate</span>
                <span className="text-cosmic-cyan">{space.engagement}%</span>
              </div>
              {space.dimensions && (
                <div className="flex justify-between text-sm">
                  <span className="text-cosmic-white/70">Dimensions</span>
                  <span className="text-cosmic-white">{space.dimensions}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {space.category.map((cat) => (
                <span key={cat} className="px-2 py-1 bg-cosmic-purple/20 text-cosmic-purple rounded-full text-xs">
                  {cat}
                </span>
              ))}
            </div>

            <button 
              disabled={!space.isAvailable}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                space.isAvailable
                  ? 'bg-cosmic-purple hover:bg-cosmic-purple/80 text-white'
                  : 'bg-cosmic-white/10 text-cosmic-white/50 cursor-not-allowed'
              }`}
            >
              {space.isAvailable ? 'Book Ad Space' : 'Currently Occupied'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cosmic-white">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-5 w-5 text-cosmic-purple" />
            <h3 className="font-semibold text-cosmic-white">Revenue Today</h3>
          </div>
          <div className="text-2xl font-bold text-cosmic-green">{formatCurrency(1247)}</div>
          <div className="text-sm text-cosmic-green">+15.2% vs yesterday</div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="h-5 w-5 text-cosmic-cyan" />
            <h3 className="font-semibold text-cosmic-white">Impressions</h3>
          </div>
          <div className="text-2xl font-bold text-cosmic-cyan">{formatNumber(23847)}</div>
          <div className="text-sm text-cosmic-cyan">+8.7% vs yesterday</div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-3">
            <Click className="h-5 w-5 text-cosmic-pink" />
            <h3 className="font-semibold text-cosmic-white">Clicks</h3>
          </div>
          <div className="text-2xl font-bold text-cosmic-pink">{formatNumber(892)}</div>
          <div className="text-sm text-cosmic-pink">+12.1% vs yesterday</div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-cosmic-yellow" />
            <h3 className="font-semibold text-cosmic-white">Conversions</h3>
          </div>
          <div className="text-2xl font-bold text-cosmic-yellow">67</div>
          <div className="text-sm text-cosmic-yellow">+23.5% vs yesterday</div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-cosmic-white mb-4">Performance Over Time</h3>
        <div className="h-64 bg-cosmic-white/5 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-cosmic-white/50 mx-auto mb-2" />
            <p className="text-cosmic-white/70">Interactive charts coming soon</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCreateCampaign = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cosmic-white">Create New Campaign</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-cosmic-white mb-4">Campaign Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cosmic-white mb-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="Enter campaign name"
                  className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cosmic-white mb-2">Campaign Type</label>
                <select className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple">
                  <option value="world_banner">World Banner</option>
                  <option value="feed_post">Social Feed Post</option>
                  <option value="immersive_placement">Immersive Placement</option>
                  <option value="sponsored_world">Sponsored World</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cosmic-white mb-2">Budget</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cosmic-white mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cosmic-white mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-cosmic-white mb-4">Targeting</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cosmic-white mb-2">Interests</label>
                <input
                  type="text"
                  placeholder="cyberpunk, gaming, vr, music..."
                  className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cosmic-white mb-2">Age Range</label>
                <select className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple">
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-45">36-45</option>
                  <option value="46+">46+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cosmic-white mb-2">Locations</label>
                <input
                  type="text"
                  placeholder="Global, US, EU, etc."
                  className="w-full px-4 py-3 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-cosmic-white mb-4">Creative Assets</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-cosmic-white/30 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-cosmic-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-cosmic-purple" />
                </div>
                <h4 className="font-medium text-cosmic-white mb-2">Upload Creative Assets</h4>
                <p className="text-sm text-cosmic-white/70 mb-4">
                  Upload images, videos, or select a world for sponsored placement
                </p>
                <button className="px-6 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all">
                  Choose Files
                </button>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-cosmic-white mb-4">Campaign Estimate</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-cosmic-white/70">Estimated Reach</span>
                <span className="text-cosmic-white font-medium">25,000 - 45,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cosmic-white/70">Expected Impressions</span>
                <span className="text-cosmic-white font-medium">150,000 - 200,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cosmic-white/70">Estimated CTR</span>
                <span className="text-cosmic-white font-medium">2.5% - 3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cosmic-white/70">Cost Per Click</span>
                <span className="text-cosmic-white font-medium">$0.15 - $0.25</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-cosmic-white/20">
              <button className="w-full py-3 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg font-medium transition-all">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Advertising Hub</h1>
          <p className="text-cosmic-white/70">Monetize your worlds and run immersive ad campaigns</p>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-cosmic-gold/20 rounded-full">
          <Crown className="h-4 w-4 text-cosmic-gold" />
          <span className="text-cosmic-gold text-sm font-medium">Premium Feature</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-cosmic-white/20">
        {[
          { id: 'campaigns', label: 'My Campaigns', icon: Target },
          { id: 'spaces', label: 'Ad Spaces', icon: Globe },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'create', label: 'Create Campaign', icon: Plus }
        ].map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-cosmic-purple/20 text-cosmic-purple border-b-2 border-cosmic-purple'
                  : 'text-cosmic-white/70 hover:text-white hover:bg-cosmic-white/10'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'campaigns' && renderCampaigns()}
          {activeTab === 'spaces' && renderAdSpaces()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'create' && renderCreateCampaign()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}