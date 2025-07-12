"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, Music, Eye, Zap, Sparkles, 
  Volume2, Image, Video, Mic, Layers,
  Brain, Atom, Cpu, Network
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type AIModule = 'nemura' | 'sonarium' | 'neural' | 'vision'

interface ModuleConfig {
  id: AIModule
  name: string
  subtitle: string
  description: string
  icon: React.ElementType
  color: string
  gradient: string
  capabilities: string[]
  examples: string[]
}

export function AIModules() {
  const [activeModule, setActiveModule] = useState<AIModule>('nemura')

  const modules: ModuleConfig[] = [
    {
      id: 'nemura',
      name: 'Nemura',
      subtitle: 'Visual Intelligence',
      description: 'Advanced visual content generation and artistic creation powered by state-of-the-art AI models.',
      icon: Palette,
      color: 'text-diamond',
      gradient: 'from-diamond to-neonflare',
      capabilities: [
        'High-resolution image generation',
        'Artistic style transfer',
        'Concept art creation',
        'Environment design',
        'Character visualization'
      ],
      examples: [
        'Generate a mystical forest temple',
        'Create character concept art',
        'Design futuristic architecture',
        'Visualize abstract concepts'
      ]
    },
    {
      id: 'sonarium',
      name: 'Sonarium',
      subtitle: 'Audio Landscape',
      description: 'Immersive audio generation creating soundscapes, music, and ambient environments.',
      icon: Music,
      color: 'text-immersiveblue',
      gradient: 'from-immersiveblue to-realmglow',
      capabilities: [
        'Ambient soundscape creation',
        'Musical composition',
        'Spatial audio design',
        'Voice synthesis',
        'Audio-reactive visuals'
      ],
      examples: [
        'Generate ethereal ambient music',
        'Create forest sound environment',
        'Design UI interaction sounds',
        'Compose cinematic themes'
      ]
    },
    {
      id: 'neural',
      name: 'Neural Core',
      subtitle: 'AI Orchestration',
      description: 'Central intelligence hub that coordinates all AI modules and provides advanced reasoning.',
      icon: Brain,
      color: 'text-cosmic-purple',
      gradient: 'from-cosmic-purple to-cosmic-cyan',
      capabilities: [
        'Multi-modal AI coordination',
        'Intelligent prompt analysis',
        'Creative workflow optimization',
        'Context-aware suggestions',
        'Adaptive learning systems'
      ],
      examples: [
        'Coordinate visual + audio creation',
        'Optimize creative workflows',
        'Suggest prompt improvements',
        'Analyze user preferences'
      ]
    },
    {
      id: 'vision',
      name: 'Vision',
      subtitle: 'Spatial Computing',
      description: 'Computer vision and spatial understanding for AR/VR experiences and 3D content.',
      icon: Eye,
      color: 'text-realmglow',
      gradient: 'from-realmglow to-cosmic-amber',
      capabilities: [
        '3D scene understanding',
        'Object recognition',
        'Spatial mapping',
        'AR overlay placement',
        'Real-time tracking'
      ],
      examples: [
        'Map 3D environments',
        'Track hand gestures',
        'Identify objects in space',
        'Generate AR overlays'
      ]
    }
  ]

  const currentModule = modules.find(m => m.id === activeModule)!

  return (
    <div className="space-y-6" id="ai-modules">
      {/* Module Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <motion.button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                activeModule === module.id
                  ? `bg-gradient-to-r ${module.gradient} text-white border-transparent`
                  : 'bg-cosmic-white/5 hover:bg-cosmic-white/10 text-cosmic-white/70 border-cosmic-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{module.name}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Module Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-panel p-8 rounded-xl border border-cosmic-white/20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Module Info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${currentModule.gradient} rounded-xl flex items-center justify-center`}>
                  <currentModule.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cosmic-white">{currentModule.name}</h3>
                  <p className={`text-lg ${currentModule.color} font-medium`}>{currentModule.subtitle}</p>
                </div>
              </div>
              
              <p className="text-cosmic-white/80 mb-6 leading-relaxed">
                {currentModule.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-3">
                <h4 className="text-cosmic-white font-semibold">Core Capabilities:</h4>
                <ul className="space-y-2">
                  {currentModule.capabilities.map((capability, index) => (
                    <motion.li
                      key={capability}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-cosmic-white/70"
                    >
                      <Sparkles className="h-3 w-3 text-cosmic-purple" />
                      <span className="text-sm">{capability}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Examples & Actions */}
            <div className="space-y-6">
              {/* Example Prompts */}
              <div>
                <h4 className="text-cosmic-white font-semibold mb-4">Try These Examples:</h4>
                <div className="space-y-2">
                  {currentModule.examples.map((example, index) => (
                    <motion.button
                      key={example}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full text-left p-3 bg-cosmic-white/5 hover:bg-cosmic-white/10 rounded-lg border border-cosmic-white/10 transition-colors group"
                      onClick={() => {
                        // Trigger the example in Dream Machine
                        const dreamMachine = document.getElementById('dream-machine')
                        if (dreamMachine) {
                          dreamMachine.scrollIntoView({ behavior: 'smooth' })
                          // You could dispatch an event to populate the prompt
                          window.dispatchEvent(new CustomEvent('setPrompt', { detail: example }))
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-cosmic-white/80 text-sm">{example}</span>
                        <Zap className="h-3 w-3 text-cosmic-white/40 group-hover:text-cosmic-purple transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Module Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentModule.color}`}>
                    {activeModule === 'nemura' ? '25K+' : 
                     activeModule === 'sonarium' ? '12K+' : 
                     activeModule === 'neural' ? '99.9%' : '8K+'}
                  </div>
                  <div className="text-xs text-cosmic-white/60">
                    {activeModule === 'nemura' ? 'Images Generated' : 
                     activeModule === 'sonarium' ? 'Audio Tracks' : 
                     activeModule === 'neural' ? 'Accuracy' : 'Objects Tracked'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentModule.color}`}>
                    {activeModule === 'nemura' ? '4K' : 
                     activeModule === 'sonarium' ? '48kHz' : 
                     activeModule === 'neural' ? '5.2s' : '60fps'}
                  </div>
                  <div className="text-xs text-cosmic-white/60">
                    {activeModule === 'nemura' ? 'Max Resolution' : 
                     activeModule === 'sonarium' ? 'Audio Quality' : 
                     activeModule === 'neural' ? 'Avg Response' : 'Processing Speed'}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${currentModule.color}`}>
                    {activeModule === 'nemura' ? '150+' : 
                     activeModule === 'sonarium' ? '40+' : 
                     activeModule === 'neural' ? '12' : '6DOF'}
                  </div>
                  <div className="text-xs text-cosmic-white/60">
                    {activeModule === 'nemura' ? 'Art Styles' : 
                     activeModule === 'sonarium' ? 'Genres' : 
                     activeModule === 'neural' ? 'Models' : 'Tracking'}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <Button
                onClick={() => {
                  const dreamMachine = document.getElementById('dream-machine')
                  if (dreamMachine) {
                    dreamMachine.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className={`w-full bg-gradient-to-r ${currentModule.gradient} hover:opacity-90 text-white font-medium py-3`}
              >
                Start Creating with {currentModule.name}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}