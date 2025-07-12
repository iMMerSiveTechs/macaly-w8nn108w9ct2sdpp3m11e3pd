"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Users, 
  Zap,
  Headset,
  Smartphone,
  Monitor
} from 'lucide-react'

interface LandingHeroProps {
  onGetStarted: () => void
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  console.log('LandingHero component rendered')

  const stats = [
    { label: 'Worlds Created', value: '50K+', icon: Globe },
    { label: 'Active Creators', value: '12K+', icon: Users },
    { label: 'Assets Shared', value: '200K+', icon: Sparkles },
  ]

  const platforms = [
    { name: 'Vision Pro', icon: Headset, status: 'Available' },
    { name: 'Meta Quest', icon: Headset, status: 'Available' },
    { name: 'Mobile AR', icon: Smartphone, status: 'Beta' },
    { name: 'Desktop', icon: Monitor, status: 'Available' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-cosmic-purple/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-cosmic-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Beta Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="bg-cosmic-gradient text-white font-medium px-4 py-2 text-sm">
              <Zap className="w-4 h-4 mr-2" />
              Early Access - Join the Future of World Building
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
          >
            The Future of <span className="text-gradient">Immersive Creation</span>
            <br />
            Starts Here
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-cosmic-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Nemurium empowers anyone to build and monetize interactive 3D realms in mixed reality — <strong className="text-cosmic-white">no code, no limits.</strong>
            <br />
            <span className="text-cosmic-cyan font-medium">You don't just build a world — you build the next internet.</span>
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              onClick={() => window.location.href = '/world-builder'}
              size="lg" 
              className="btn-cosmic text-white font-bold text-lg px-8 py-6 h-auto"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/login'}
              variant="outline" 
              size="lg"
              className="border-cosmic-cyan/50 text-cosmic-cyan hover:bg-cosmic-cyan/10 font-medium text-lg px-8 py-6 h-auto"
            >
              <Users className="w-5 h-5 mr-2" />
              Creator Login
            </Button>
            
            <Button 
              onClick={() => {
                const waitlistSection = document.getElementById('waitlist')
                if (waitlistSection) {
                  waitlistSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              variant="outline" 
              size="lg"
              className="border-cosmic-purple/50 text-cosmic-purple hover:bg-cosmic-purple/10 font-medium text-lg px-8 py-6 h-auto"
            >
              <Zap className="w-5 h-5 mr-2" />
              Join Waitlist
            </Button>
          </motion.div>

          {/* Platform Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <p className="text-cosmic-white/60 text-sm mb-6 uppercase tracking-wide font-medium">
              Cross-Platform Support
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {platforms.map((platform, index) => {
                const Icon = platform.icon
                return (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3"
                  >
                    <Icon className="w-5 h-5 text-cosmic-cyan" />
                    <span className="text-cosmic-white font-medium">{platform.name}</span>
                    <Badge 
                      variant={platform.status === 'Available' ? 'default' : 'secondary'}
                      className={`text-xs ${platform.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-cosmic-amber/20 text-cosmic-amber'}`}
                    >
                      {platform.status}
                    </Badge>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="glass-panel rounded-2xl p-8 floating-card">
                    <Icon className="w-8 h-8 text-cosmic-cyan mx-auto mb-4" />
                    <p className="text-3xl md:text-4xl font-black text-gradient mb-2">
                      {stat.value}
                    </p>
                    <p className="text-cosmic-white/70 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  )
}