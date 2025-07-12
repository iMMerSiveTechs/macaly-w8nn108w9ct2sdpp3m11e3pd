"use client"

import { motion } from 'framer-motion'
import { Sparkles, Zap, Layers, Atom } from 'lucide-react'

interface EnhancedLoadingProps {
  type?: 'image' | 'video' | '3d' | 'voiceover' | 'soundscape' | 'ar-layer'
  progress?: number
  message?: string
}

export function EnhancedLoading({ 
  type = 'image', 
  progress = 0,
  message 
}: EnhancedLoadingProps) {
  
  const getLoadingConfig = () => {
    switch (type) {
      case 'image':
        return {
          icon: Sparkles,
          color: 'from-diamond to-neonflare',
          bgColor: 'bg-diamond/20',
          message: message || 'Generating AI artwork...',
          particles: ['✨', '🎨', '🌟', '💫']
        }
      case 'video':
        return {
          icon: Zap,
          color: 'from-immersiveblue to-realmglow',
          bgColor: 'bg-immersiveblue/20',
          message: message || 'Rendering cinematic sequence...',
          particles: ['🎬', '⚡', '🎭', '🌊']
        }
      case '3d':
        return {
          icon: Layers,
          color: 'from-realmglow to-cosmic-purple',
          bgColor: 'bg-realmglow/20',
          message: message || 'Building 3D model...',
          particles: ['🏗️', '📐', '🔮', '⚙️']
        }
      case 'voiceover':
        return {
          icon: Atom,
          color: 'from-neonflare to-cosmic-amber',
          bgColor: 'bg-neonflare/20',
          message: message || 'Synthesizing voice...',
          particles: ['🎤', '🔊', '🎵', '🗣️']
        }
      case 'soundscape':
        return {
          icon: Zap,
          color: 'from-cosmic-purple to-diamond',
          bgColor: 'bg-cosmic-purple/20',
          message: message || 'Creating audio landscape...',
          particles: ['🎶', '🌊', '🔥', '🌙']
        }
      default:
        return {
          icon: Sparkles,
          color: 'from-cosmic-gradient',
          bgColor: 'bg-cosmic-purple/20',
          message: message || 'Processing...',
          particles: ['✨', '🌟', '💫', '⭐']
        }
    }
  }

  const config = getLoadingConfig()
  const Icon = config.icon

  return (
    <div className="relative py-16 px-8">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {config.particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-20"
            initial={{ 
              x: Math.random() * 400,
              y: Math.random() * 300,
              scale: 0
            }}
            animate={{
              y: [null, -50, 50],
              x: [null, Math.random() * 50 - 25],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          >
            {particle}
          </motion.div>
        ))}
      </div>

      <div className="relative text-center">
        {/* Main Loading Icon */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className={`w-20 h-20 mx-auto mb-6 rounded-full ${config.bgColor} border-4 border-white/20 flex items-center justify-center`}
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>

        {/* Loading Message */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-cosmic-white font-semibold text-xl mb-4"
        >
          {config.message}
        </motion.h3>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="bg-cosmic-space/50 rounded-full h-3 overflow-hidden border border-white/10">
            <motion.div
              className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-cosmic-white/60 text-sm mt-2">
            <span>Processing</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-cosmic-white/50 text-sm"
        >
          <p className="mb-2">✨ Did you know?</p>
          <motion.p
            key={type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="italic"
          >
            {type === 'image' && "AI can generate artwork in styles that never existed before."}
            {type === 'video' && "Each frame is carefully composed using advanced neural networks."}
            {type === '3d' && "3D models can be optimized for VR, AR, and spatial computing."}
            {type === 'voiceover' && "AI voices can speak in any style, tone, or emotion."}
            {type === 'soundscape' && "Immersive audio creates emotional connections in virtual worlds."}
            {type === 'ar-layer' && "AR overlays bridge the gap between digital and physical reality."}
          </motion.p>
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r ${config.color} opacity-20`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
}