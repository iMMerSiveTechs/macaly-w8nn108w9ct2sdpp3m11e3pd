"use client"

import { motion } from 'framer-motion'
import { 
  Hammer, 
  Globe, 
  Package, 
  Eye, 
  Palette, 
  Music, 
  Cpu, 
  Glasses,
  ArrowRight,
  Sparkles
} from 'lucide-react'

const features = [
  {
    category: 'Creation Tools',
    items: [
      {
        icon: Hammer,
        title: 'World Builder',
        description: '3D world creation with drag-and-drop interface and real-time preview',
        color: 'cosmic-purple'
      },
      {
        icon: Globe,
        title: 'Realm Network',
        description: 'Connect your worlds and create immersive multi-dimensional experiences',
        color: 'cosmic-cyan'
      },
      {
        icon: Package,
        title: 'Asset Library',
        description: 'Comprehensive library of 3D models, environments, and interactive elements',
        color: 'cosmic-amber'
      },
      {
        icon: Eye,
        title: 'AR Overlay',
        description: 'Spatial computing tools for augmented reality experiences',
        color: 'neonflare'
      }
    ]
  },
  {
    category: 'AI Engines',
    items: [
      {
        icon: Palette,
        title: 'Nemura (Visual)',
        description: 'AI-powered visual content generation for cinematic scenes and artwork',
        color: 'cosmic-purple'
      },
      {
        icon: Music,
        title: 'Sonarium (Audio)',
        description: 'Intelligent audio landscape creation with immersive soundscapes',
        color: 'cosmic-cyan'
      },
      {
        icon: Cpu,
        title: 'Neural Processing',
        description: 'Advanced computer vision and intelligent content analysis',
        color: 'cosmic-amber'
      },
      {
        icon: Glasses,
        title: 'Vision Intelligence',
        description: 'Smart AR/VR optimization for next-generation hardware',
        color: 'neonflare'
      }
    ]
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-full text-sm text-cosmic-white/90 mb-6">
            <Sparkles className="h-4 w-4" />
            Immersive Creation Platform
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Everything You Need to Create
          </h2>
          <p className="text-xl text-cosmic-white/70 max-w-3xl mx-auto">
            Professional-grade tools and AI engines designed for creators building the next generation of immersive experiences
          </p>
        </motion.div>

        {/* Feature Categories */}
        <div className="space-y-16">
          {features.map((category, categoryIndex) => (
            <div key={category.category}>
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-cosmic-cyan mb-2">
                  {category.category}
                </h3>
                <div className="w-20 h-1 bg-cosmic-gradient rounded-full" />
              </motion.div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((feature, featureIndex) => {
                  const IconComponent = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: (categoryIndex * 0.1) + (featureIndex * 0.1) 
                      }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="glass-panel p-6 rounded-xl h-full hover:shadow-lg hover:shadow-cosmic-purple/20 transition-all duration-300 hover:scale-105 cursor-pointer">
                        {/* Icon */}
                        <div className={`inline-flex p-3 rounded-lg bg-${feature.color}/20 border border-${feature.color}/30 mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className={`h-6 w-6 text-${feature.color}`} />
                        </div>

                        {/* Content */}
                        <h4 className="text-lg font-semibold text-cosmic-white mb-3">
                          {feature.title}
                        </h4>
                        <p className="text-cosmic-white/70 text-sm leading-relaxed mb-4">
                          {feature.description}
                        </p>

                        {/* Learn More Link */}
                        <div className="flex items-center text-cosmic-cyan text-sm font-medium group-hover:text-cosmic-white transition-colors">
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-panel p-8 rounded-2xl border border-cosmic-purple/30">
            <h3 className="text-2xl font-bold text-cosmic-white mb-4">
              Ready to Start Creating?
            </h3>
            <p className="text-cosmic-white/70 mb-6 max-w-2xl mx-auto">
              Join thousands of creators already building immersive experiences with Nemurium's AI-powered platform
            </p>
            <button className="px-8 py-4 bg-cosmic-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cosmic-purple/25 transition-all duration-300 hover:scale-105">
              Get Early Access
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}