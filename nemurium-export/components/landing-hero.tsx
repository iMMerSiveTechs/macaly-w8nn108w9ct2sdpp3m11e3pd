"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Globe, Users } from 'lucide-react'
import { useState } from 'react'

interface LandingHeroProps {
  onGetStarted: () => void
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 cosmic-radial opacity-50" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-cosmic-purple/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-cosmic-cyan/10 rounded-full blur-xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-full text-sm text-cosmic-white/90 mb-8"
        >
          <Sparkles className="h-4 w-4 text-cosmic-cyan" />
          The Future of Immersive Creation Starts Here
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          data-macaly="hero-title"
        >
          <span className="text-gradient">Create</span>
          <br />
          <span className="text-cosmic-white">Immersive</span>
          <br />
          <span className="text-cosmic-cyan">Worlds</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-cosmic-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          data-macaly="hero-subtitle"
        >
          Build, connect, and publish immersive experiences with AI-powered tools. 
          From 3D worlds to cinematic content, bring your imagination to life.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-2 text-cosmic-white/70">
            <Users className="h-5 w-5 text-cosmic-cyan" />
            <span className="text-lg font-semibold">1,000+</span>
            <span>Creators</span>
          </div>
          <div className="flex items-center gap-2 text-cosmic-white/70">
            <Globe className="h-5 w-5 text-cosmic-purple" />
            <span className="text-lg font-semibold">5,000+</span>
            <span>Worlds Built</span>
          </div>
          <div className="flex items-center gap-2 text-cosmic-white/70">
            <Sparkles className="h-5 w-5 text-cosmic-amber" />
            <span className="text-lg font-semibold">AI-Powered</span>
            <span>Creation</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 bg-cosmic-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cosmic-purple/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Start Creating
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="group px-8 py-4 bg-transparent border border-cosmic-white/20 text-cosmic-white font-semibold rounded-xl hover:bg-cosmic-white/5 transition-all duration-300 flex items-center gap-2"
          >
            <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </button>
        </motion.div>

        {/* Demo Video Modal */}
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative bg-cosmic-space rounded-xl overflow-hidden max-w-4xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center text-cosmic-white/60">
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto mb-4" />
                  <p>Demo video coming soon...</p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 p-2 bg-cosmic-space/50 rounded-lg text-cosmic-white hover:bg-cosmic-space/70 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-cosmic-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-cosmic-gradient rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}