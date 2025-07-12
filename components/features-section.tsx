"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Box, 
  Palette, 
  Link, 
  Users, 
  Smartphone, 
  DollarSign,
  Zap,
  Globe,
  Upload,
  Settings,
  PlayCircle,
  Share
} from 'lucide-react'

export function FeaturesSection() {
  console.log('FeaturesSection component rendered')

  const mainFeatures = [
    {
      icon: Box,
      title: 'No-Code World Builder',
      description: 'Drag-and-drop 3D builder for creating immersive environments with zero coding required.',
      color: 'cosmic-purple',
      features: [
        'Visual object placement',
        'Terrain sculpting tools', 
        'Interactive triggers',
        'Animation timeline'
      ]
    },
    {
      icon: Link,
      title: 'Realm Linking',
      description: 'Connect your worlds into larger multiverses and collaborative experiences.',
      color: 'cosmic-cyan',
      features: [
        'Portal creation',
        'World clustering',
        'Shared universes',
        'Cross-realm events'
      ]
    },
    {
      icon: DollarSign,
      title: 'Creator Economy',
      description: 'Monetize your creations through passes, assets, and shared experiences.',
      color: 'cosmic-amber',
      features: [
        'Asset marketplace',
        'World monetization',
        'Revenue sharing',
        'Creator subscriptions'
      ]
    }
  ]

  const additionalFeatures = [
    {
      icon: Palette,
      title: 'Asset Library',
      description: 'Comprehensive library of 3D models, textures, sounds, and effects'
    },
    {
      icon: Upload,
      title: 'Custom Uploads',
      description: 'Upload your own 3D models, textures, and audio files'
    },
    {
      icon: Users,
      title: 'Real-time Collaboration',
      description: 'Work together with other creators in shared building sessions'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Export',
      description: 'Publish to Apple Vision Pro, Meta Quest, mobile AR, and web'
    },
    {
      icon: Settings,
      title: 'Visual Logic Builder',
      description: 'Create interactions and behaviors without writing code'
    },
    {
      icon: Globe,
      title: 'Universal Discovery',
      description: 'Share and discover worlds through our integrated marketplace'
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
            <Zap className="w-4 h-4 mr-2" />
            Platform Features
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black text-cosmic-white mb-6">
            Everything You Need to Build <span className="text-gradient">Immersive Worlds</span>
          </h2>
          
          <p className="text-xl text-cosmic-white/80 max-w-4xl mx-auto leading-relaxed">
            From no-code world building to cross-platform publishing, Nemurium provides all the tools 
            you need to create, connect, and monetize immersive 3D experiences.
          </p>
        </motion.div>

        {/* Main Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-panel border-white/10 p-8 h-full floating-card cosmic-glow">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${feature.color}/20 border-2 border-${feature.color}/30 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-${feature.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-black text-cosmic-white mb-3">{feature.title}</h3>
                    <p className="text-cosmic-white/70 mb-6">{feature.description}</p>
                  </div>

                  <div className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <PlayCircle className={`w-4 h-4 text-${feature.color} flex-shrink-0`} />
                        <span className="text-cosmic-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-panel border-white/10 p-6 h-full floating-card hover:cosmic-glow transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-cosmic-white mb-2">{feature.title}</h4>
                      <p className="text-cosmic-white/70 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Badge className="bg-cosmic-amber/20 text-cosmic-amber border border-cosmic-amber/30 px-6 py-3 text-lg">
            <Share className="w-4 h-4 mr-2" />
            More features launching with early access
          </Badge>
        </motion.div>
      </div>
    </div>
  )
}