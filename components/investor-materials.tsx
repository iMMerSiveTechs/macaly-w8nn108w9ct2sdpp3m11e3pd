"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  TrendingUp,
  Target,
  Globe,
  Zap,
  Building,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
  Rocket,
  Brain,
  Gamepad2
} from 'lucide-react'

export function InvestorMaterials() {
  console.log('InvestorMaterials component rendered')

  const marketStats = [
    { label: 'Immersive Economy by 2030', value: '$1T+', icon: Globe },
    { label: 'Game Dev Tools Market', value: '$100B+', icon: Gamepad2 },
    { label: 'Creator Economy Value', value: '$480B+', icon: Users },
    { label: 'EdTech & Training Market', value: '$400B+', icon: Brain }
  ]

  const roiProjections = [
    { multiplier: '3x Valuation', roi: '~540%', color: 'cosmic-cyan' },
    { multiplier: '5x Valuation', roi: '~800%', color: 'cosmic-purple' },
    { multiplier: '7x Valuation', roi: '~1060%', color: 'cosmic-amber' }
  ]

  const roadmapPhases = [
    {
      year: '2025',
      title: 'Launch & Foundation',
      items: [
        'Launch Creator Access',
        'Activate Investor Rounds',
        'No-Code Builder v1',
        'WebXR Deployment'
      ]
    },
    {
      year: '2026',
      title: 'Expansion & Monetization',
      items: [
        'Launch Immersive Marketplace',
        'Monetization Tools for Creators',
        'Partner with headset platforms',
        'Beta: Sonarium Concerts'
      ]
    },
    {
      year: '2027',
      title: 'Scale & Strategic Partnerships',
      items: [
        'Scale to 500K+ Users',
        'Brand Integrations (Sponsorships)',
        'VR Education Pilots',
        'Immersive Sports Streams'
      ]
    },
    {
      year: '2028',
      title: 'Global Integration & Real-World Venues',
      items: [
        'Nemurium-powered Las Vegas Sphere Event',
        'Immersive City Realms',
        'Creator Revenue Exceeds $50M'
      ]
    }
  ]

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-transparent via-cosmic-purple/5 to-transparent">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-cosmic-gradient text-white font-bold px-4 py-2 mb-6">
            <Target className="w-4 h-4 mr-2" />
            Founding Equity Investment
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-cosmic-white mb-6">
            The <span className="text-gradient">Immersive Internet</span> Operating System
          </h2>
          
          <p className="text-xl text-cosmic-white/80 max-w-4xl mx-auto leading-relaxed mb-4">
            Receive Class B shares (non-controlling equity) in Nemurium, with shared revenue but no voting or managerial power.
          </p>
          
          <p className="text-lg text-cosmic-white/70 max-w-4xl mx-auto leading-relaxed">
            Nemurium is building the next-generation Operating System for immersive digital creation. 
            Think YouTube meets Unreal Engine meets GitHub, built for the mixed reality (MR/VR/AR) revolution.
          </p>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-panel border-cosmic-purple/30 p-8 bg-cosmic-purple/5">
            <div className="text-center mb-8">
              <Rocket className="w-12 h-12 text-cosmic-purple mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-cosmic-white mb-4">Our Vision</h3>
            </div>
            
            <p className="text-lg text-cosmic-white/90 leading-relaxed text-center max-w-4xl mx-auto">
              Nemurium enables anyone—from hobbyists to professional studios—to build, share, and monetize 
              fully immersive, interconnected 3D worlds with zero code. Our platform empowers creators to 
              publish their own worlds, connect them into larger Realms, and monetize them through passes, 
              assets, experiences, or sponsorships.
            </p>
          </Card>
        </motion.div>

        {/* Market Opportunity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-black text-cosmic-white text-center mb-8">
            Massive <span className="text-gradient">Market Opportunity</span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-panel border-white/10 p-6 text-center h-full">
                    <Icon className="w-8 h-8 text-cosmic-cyan mx-auto mb-4" />
                    <div className="text-2xl font-black text-gradient mb-2">{stat.value}</div>
                    <p className="text-cosmic-white/70 text-sm leading-tight">{stat.label}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ROI Projections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-black text-cosmic-white text-center mb-4">
            <span className="text-gradient">ROI Projections</span> by Year 3 (2027)
          </h3>
          
          <p className="text-cosmic-white/60 text-center text-sm mb-8 max-w-2xl mx-auto">
            Based on modest growth and industry-standard revenue multiples. Modeled after comparable creator and immersive platforms like Roblox, Gumroad, and Coursera.
          </p>
          
          <Card className="glass-panel border-cosmic-amber/30 p-8 bg-cosmic-amber/5">
            <div className="text-center mb-8">
              <BarChart3 className="w-12 h-12 text-cosmic-amber mx-auto mb-4" />
              <p className="text-cosmic-white/80 max-w-3xl mx-auto">
                Grounded in realistic growth and standard tech platform valuation models.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-black mb-2 text-cosmic-cyan">
                  📈 ~540% ROI
                </div>
                <p className="text-cosmic-white/70 font-medium">Based on reaching 100K creators and a 3x platform valuation</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-black mb-2 text-cosmic-purple">
                  🚀 ~800% ROI
                </div>
                <p className="text-cosmic-white/70 font-medium">With 150K creators and a 5x valuation</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-black mb-2 text-cosmic-amber">
                  🌌 ~1060% ROI
                </div>
                <p className="text-cosmic-white/70 font-medium">If platform grows past 200K creators with full monetization</p>
              </motion.div>
            </div>
            
            <div className="text-center mt-8 pt-6 border-t border-cosmic-amber/20">
              <p className="text-cosmic-white/60 text-sm">
                Estimates use $10/mo average creator revenue, 10–20% platform cut, and multiple income streams including subscriptions, ticketed events, digital assets, and partner integrations.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Strategic Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-black text-cosmic-white text-center mb-8">
            <span className="text-gradient">Strategic Roadmap</span> 2025-2028
          </h3>
          
          <div className="space-y-6">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-panel border-white/10 p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <Badge className="bg-cosmic-gradient text-white font-bold px-4 py-2">
                        {phase.year}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-cosmic-white mb-3">{phase.title}</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {phase.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cosmic-cyan rounded-full flex-shrink-0" />
                            <span className="text-cosmic-white/80 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Funding Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-panel border-cosmic-gradient p-8 cosmic-glow">
            <DollarSign className="w-12 h-12 text-cosmic-amber mx-auto mb-6" />
            <h3 className="text-3xl font-black text-cosmic-white mb-4">
              Funding <span className="text-gradient">Request & Structure</span>
            </h3>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-cosmic-white/90 mb-6">
                We're raising up to $250,000 in exchange for 15% equity split across 3 tiers
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cosmic-cyan mb-1">$2,500</div>
                  <div className="text-sm text-cosmic-white/70">0.05% + NFT badge + future revshare</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cosmic-purple mb-1">$5,000</div>
                  <div className="text-sm text-cosmic-white/70">0.10% + feature access + branding input</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cosmic-amber mb-1">$10,000</div>
                  <div className="text-sm text-cosmic-white/70">0.25% + co-creation influence + early revenue share</div>
                </div>
              </div>
              
              <div className="bg-cosmic-slate/20 border border-cosmic-amber/30 rounded-lg p-4 mt-6">
                <h4 className="text-cosmic-amber font-bold text-sm mb-2">No Control or Voting Rights</h4>
                <p className="text-cosmic-white/70 text-sm">
                  Class B equity shares are non-controlling and do not grant voting rights, board seats, or operational authority. 
                  Investors receive pro-rata revenue share based on total company income post-cash-flow breakeven.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Investor FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass-panel border-white/10 p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-cosmic-white mb-4">
                Investor <span className="text-gradient">FAQ</span>
              </h3>
              <p className="text-cosmic-white/70">
                Common questions about the investment opportunity
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-cosmic-white mb-2">What are Class B shares?</h4>
                  <p className="text-cosmic-white/70 text-sm">
                    Class B shares provide equity ownership with revenue share but no voting rights, board seats, or operational control. You own a piece of the company without decision-making power.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-cosmic-white mb-2">When does revenue sharing begin?</h4>
                  <p className="text-cosmic-white/70 text-sm">
                    Revenue sharing begins quarterly once Nemurium achieves cash-flow positive operations. Payouts are distributed pro-rata based on your equity percentage.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-cosmic-white mb-2">Is my investment refundable?</h4>
                  <p className="text-cosmic-white/70 text-sm">
                    No, all investments are non-refundable. This is early-stage startup equity with inherent risks. Only invest what you can afford to lose.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-cosmic-white mb-2">Will I be contacted after submitting the form?</h4>
                  <p className="text-cosmic-white/70 text-sm">
                    Yes, our team reviews all investor applications and contacts qualified investors within 2-5 business days with next steps and legal documentation.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-cosmic-white mb-2">How will my NFT badge be delivered?</h4>
                  <p className="text-cosmic-white/70 text-sm">
                    After investment confirmation, your unique NFT investor badge will be minted and sent to your provided wallet address or email within 7-14 days.
                  </p>
                </div>
                
                <div className="bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg p-4">
                  <h4 className="text-cosmic-purple font-bold text-sm mb-2">Have more questions?</h4>
                  <p className="text-cosmic-white/70 text-sm">
                    Email us at <span className="text-cosmic-cyan">investors@nemurium.com</span> for detailed answers about terms, timeline, or platform development.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}