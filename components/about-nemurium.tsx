"use client"

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Code, 
  Globe2, 
  Upload, 
  DollarSign, 
  Rocket,
  Users,
  Building2,
  Wand2
} from 'lucide-react'

export function AboutNemurium() {
  console.log('AboutNemurium component rendered')

  const features = [
    {
      icon: Wand2,
      title: 'Build Without Code',
      description: 'Use drag-and-drop tools to place assets, characters, triggers, and logic',
      emoji: '🛠️'
    },
    {
      icon: Globe2,
      title: 'Connect Realms',
      description: 'Link your worlds into growing multiverses',
      emoji: '🌌'
    },
    {
      icon: Upload,
      title: 'Use or Upload Assets',
      description: 'Choose from built-in models, sounds, and VFX — or upload your own',
      emoji: '🎭'
    },
    {
      icon: DollarSign,
      title: 'Monetize Everything',
      description: 'Sell assets, experiences, or realm access',
      emoji: '💰'
    },
    {
      icon: Rocket,
      title: 'Play Anywhere',
      description: 'Export your world to Apple Vision Pro, Meta Quest, or browser-based AR',
      emoji: '🚀'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Join our Creator Waitlist or support as a Founding Creator',
      color: 'cosmic-purple'
    },
    {
      number: '2', 
      title: 'Get access to behind-the-scenes previews + Discord',
      color: 'cosmic-cyan'
    },
    {
      number: '3',
      title: 'Be the first to test the platform',
      color: 'cosmic-amber'
    },
    {
      number: '4',
      title: 'Build your world, connect Realms, and publish your immersive creation',
      color: 'cosmic-purple'
    }
  ]

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* What Is Nemurium Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black text-cosmic-white mb-8">
            What Is <span className="text-gradient">Nemurium?</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-cosmic-white/80 leading-relaxed">
              Nemurium is a powerful, easy-to-use creation suite for building immersive MR/VR worlds — without any code. 
              Think of it as the <strong className="text-cosmic-purple">"YouTube + Unreal Engine"</strong> of the immersive era.
            </p>
            <p className="text-lg text-cosmic-white/70 leading-relaxed">
              Users can drag-and-drop assets, shape interactive experiences, and link worlds together into shared universes we call Realms. 
              These creations can be published across devices like Apple Vision Pro, Meta Quest, and mobile AR platforms.
            </p>
            <p className="text-lg text-cosmic-cyan font-medium">
              We're building the infrastructure for the immersive internet — and you're invited to help lead it.
            </p>
          </div>
        </motion.div>

        {/* Core Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-cosmic-white text-center mb-16">
            What You'll Be Able to <span className="text-gradient">Do</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-panel border-white/10 p-8 h-full floating-card text-center">
                    <div className="text-4xl mb-4">{feature.emoji}</div>
                    <Icon className="w-8 h-8 text-cosmic-cyan mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-cosmic-white mb-4">{feature.title}</h3>
                    <p className="text-cosmic-white/70 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-cosmic-white mb-4">
            How Nemurium <span className="text-gradient">Works</span>
          </h2>
          <Badge className="bg-cosmic-amber/20 text-cosmic-amber mb-12">Coming Soon</Badge>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-6 p-6 glass-panel border-white/10 rounded-xl ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.color === 'cosmic-purple' ? 'bg-cosmic-purple/20 border-2 border-cosmic-purple/30' :
                    step.color === 'cosmic-cyan' ? 'bg-cosmic-cyan/20 border-2 border-cosmic-cyan/30' :
                    'bg-cosmic-amber/20 border-2 border-cosmic-amber/30'
                  }`}>
                    <span className={`text-2xl font-black ${
                      step.color === 'cosmic-purple' ? 'text-cosmic-purple' :
                      step.color === 'cosmic-cyan' ? 'text-cosmic-cyan' :
                      'text-cosmic-amber'
                    }`}>{step.number}</span>
                  </div>
                  <p className="text-lg text-cosmic-white font-medium text-left flex-1">
                    {step.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}