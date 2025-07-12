"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Download, 
  Calendar,
  Bell,
  ExternalLink,
  ArrowLeft,
  Lock,
  BarChart3,
  FileText,
  Globe
} from 'lucide-react'

export function Dashboard() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative py-20 cosmic-bg" data-macaly="investor-dashboard">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-cosmic-gradient">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-cosmic-white mb-4">
              Investor <span className="text-gradient">Dashboard Preview</span>
            </h1>
            <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto mb-6">
              Secure portal for founding investors with real-time metrics, updates, and exclusive perks.
            </p>
            <Badge className="bg-cosmic-gradient text-white px-4 py-2 text-sm">
              Preview Mode - Full Dashboard Coming Soon
            </Badge>
          </div>

          {/* Dashboard Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Secure Login */}
            <Card className="glass-panel border-cosmic-cyan/30 p-6 cosmic-glow">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-cosmic-cyan mr-3" />
                <h3 className="text-lg font-bold text-cosmic-white">🔐 Secure Login</h3>
              </div>
              <p className="text-cosmic-white/70 text-sm mb-4">
                OAuth / Wallet verification for verified investor tiers.
              </p>
              <Button variant="outline" size="sm" className="border-cosmic-cyan/30 text-cosmic-cyan hover:bg-cosmic-cyan/10">
                <Lock className="w-4 h-4 mr-2" />
                Login Portal
              </Button>
            </Card>

            {/* Tier Recognition */}
            <Card className="glass-panel border-cosmic-purple/30 p-6 cosmic-glow">
              <div className="flex items-center mb-4">
                <Badge className="bg-cosmic-gradient text-white mr-3">TIER</Badge>
                <h3 className="text-lg font-bold text-cosmic-white">🏆 Tier Recognition</h3>
              </div>
              <p className="text-cosmic-white/70 text-sm mb-4">
                Auto-detect investor status via NFT badge or email whitelist.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-cosmic-white/80">Bronze Supporter</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                  <span className="text-cosmic-white/80">Silver Contributor</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full mr-2"></div>
                  <span className="text-cosmic-white/80">Gold Partner</span>
                </div>
              </div>
            </Card>

            {/* Platform Metrics */}
            <Card className="glass-panel border-green-500/30 p-6 cosmic-glow">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-lg font-bold text-cosmic-white">📈 Platform Metrics</h3>
              </div>
              <p className="text-cosmic-white/70 text-sm mb-4">
                Real-time stats: user signups, creator uploads, engagement.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-cosmic-white/80">User Growth</span>
                    <span className="text-green-400">+24%</span>
                  </div>
                  <Progress value={67} className="h-2 bg-cosmic-white/10" />
                </div>
                <div className="text-xs text-cosmic-white/60">
                  Last 30 days: +2,847 new creators
                </div>
              </div>
            </Card>

            {/* Investor Perks */}
            <Card className="glass-panel border-cosmic-white/30 p-6 cosmic-glow">
              <div className="flex items-center mb-4">
                <Download className="w-8 h-8 text-cosmic-white mr-3" />
                <h3 className="text-lg font-bold text-cosmic-white">🎁 Investor Perks</h3>
              </div>
              <p className="text-cosmic-white/70 text-sm mb-4">
                Private call invites, early access, dashboard downloads.
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10">
                  <FileText className="w-4 h-4 mr-2" />
                  Pitch Deck PDF
                </Button>
                <Button variant="outline" size="sm" className="w-full border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10">
                  <Calendar className="w-4 h-4 mr-2" />
                  Strategy Call Access
                </Button>
              </div>
            </Card>

            {/* Update Feed */}
            <Card className="glass-panel border-blue-500/30 p-6 cosmic-glow">
              <div className="flex items-center mb-4">
                <Bell className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-lg font-bold text-cosmic-white">📡 Update Feed</h3>
              </div>
              <p className="text-cosmic-white/70 text-sm mb-4">
                Investor-only news, founder letters, roadmap releases.
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-cosmic-white/5 rounded border border-cosmic-white/10">
                  <div className="text-sm text-cosmic-white/90 font-medium">Platform Beta v1.2 Released</div>
                  <div className="text-xs text-cosmic-white/60 mt-1">2 days ago</div>
                </div>
                <div className="p-3 bg-cosmic-white/5 rounded border border-cosmic-white/10">
                  <div className="text-sm text-cosmic-white/90 font-medium">Q1 Metrics Report Available</div>
                  <div className="text-xs text-cosmic-white/60 mt-1">1 week ago</div>
                </div>
              </div>
            </Card>

            {/* Live Metrics */}
            <Card className="glass-panel border-cosmic-gradient p-6 cosmic-glow">
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-cosmic-cyan mr-3" />
                <h3 className="text-lg font-bold text-cosmic-white">🌍 Live Metrics</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-cosmic-white/80 text-sm">Total Users</span>
                  <span className="text-cosmic-white font-bold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cosmic-white/80 text-sm">Active Creators</span>
                  <span className="text-cosmic-white font-bold">3,421</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cosmic-white/80 text-sm">Worlds Created</span>
                  <span className="text-cosmic-white font-bold">8,932</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cosmic-white/80 text-sm">Revenue (MTD)</span>
                  <span className="text-green-400 font-bold">$18,340</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Coming Soon Section */}
          <Card className="glass-panel border-cosmic-gradient/50 p-8 text-center cosmic-glow mb-8">
            <h3 className="text-2xl font-bold text-cosmic-white mb-4">
              🚀 Full Dashboard <span className="text-gradient">Coming Soon</span>
            </h3>
            <p className="text-cosmic-white/80 mb-6 max-w-2xl mx-auto">
              We're building a comprehensive investor portal with Softr that will include secure login, 
              tier-based access, real-time metrics, downloadable resources, and exclusive community features.
            </p>
            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              <div className="text-left">
                <h4 className="text-cosmic-white font-semibold text-sm mb-2">Full Features:</h4>
                <ul className="text-cosmic-white/70 text-sm space-y-1">
                  <li>• Secure OAuth login</li>
                  <li>• NFT badge verification</li>
                  <li>• Tier-based content access</li>
                  <li>• Revenue share tracking</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="text-cosmic-white font-semibold text-sm mb-2">Exclusive Perks:</h4>
                <ul className="text-cosmic-white/70 text-sm space-y-1">
                  <li>• Private strategy calls</li>
                  <li>• Early access features</li>
                  <li>• Downloadable resources</li>
                  <li>• Community access</li>
                </ul>
              </div>
            </div>
            <Badge className="bg-cosmic-gradient text-white px-4 py-2 mb-4">
              Expected Launch: Q2 2025
            </Badge>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => scrollToSection('hero')}
              className="border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('founding-investor')}
              className="border-cosmic-white/30 text-cosmic-white hover:bg-cosmic-white/10"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Become an Investor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}