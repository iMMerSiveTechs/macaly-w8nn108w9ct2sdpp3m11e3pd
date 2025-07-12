"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Home, Sparkles, Brain, Map, Database, 
  Wand2, Eye, Settings, User, ExternalLink, 
  Music, Palette, Globe, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function MasterMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Navigation function to handle scrolling to sections
  const navigateToSection = (href: string, isExternal?: boolean) => {
    setIsOpen(false) // Close menu
    
    if (isExternal) {
      return // External links handled by regular anchor
    }
    
    // Handle hash navigation for same-page sections
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '')
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    
    // Handle regular navigation
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    // For other routes, use regular navigation
    window.location.href = href
  }

  const menuSections = [
    {
      title: "Main Platform",
      items: [
        { name: "Home", href: "/", icon: Home, description: "Landing page and overview" },
        { name: "Login", href: "/login", icon: User, description: "Creator access" },
        { name: "Dashboard", href: "/dashboard", icon: Settings, description: "Creator dashboard" },
        { name: "Dream Machine", href: "/#dream-machine", icon: Sparkles, description: "AI content generation" },
        { name: "AI Copilot", href: "/#ai-copilot", icon: Brain, description: "Intelligent assistant" },
        { name: "Waitlist", href: "/#waitlist-section", icon: User, description: "Join early access" },
      ]
    },
    {
      title: "Creation Tools",
      items: [
        { name: "World Builder", href: "/world-builder", icon: Wand2, description: "3D world creation" },
        { name: "Realm Map", href: "/realm-map", icon: Map, description: "Connected worlds" },
        { name: "Asset Library", href: "/asset-library", icon: Database, description: "3D models & resources" },
        { name: "AR Overlay", href: "/#dream-machine", icon: Eye, description: "Spatial computing" },
      ]
    },
    {
      title: "AI Engines",
      items: [
        { name: "Nemura (Visual)", href: "/#dream-machine", icon: Palette, description: "Visual content AI" },
        { name: "Sonarium (Audio)", href: "/#dream-machine", icon: Music, description: "Audio landscape AI" },
        { name: "Vision Processing", href: "/#dream-machine", icon: Eye, description: "Computer vision" },
        { name: "Neural Core", href: "/#dream-machine", icon: Zap, description: "AI orchestration" },
      ]
    },
    {
      title: "External Links",
      items: [
        { name: "Founding Creator", href: "https://jaytee5644.gumroad.com/l/ntpmhch", icon: ExternalLink, external: true, description: "Investment access" },
        { name: "Discord Community", href: "https://discord.gg/nemurium", icon: ExternalLink, external: true, description: "Join creators" },
        { name: "GitHub", href: "https://github.com/immersive-technologies", icon: ExternalLink, external: true, description: "Open source" },
        { name: "Contact", href: "mailto:immersivetechs@icloud.com", icon: ExternalLink, external: true, description: "Get in touch" },
      ]
    }
  ]

  return (
    <>
      {/* Master Menu Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 w-12 h-12 bg-cosmic-purple/90 backdrop-blur-lg rounded-full flex items-center justify-center border border-cosmic-white/20 hover:bg-cosmic-purple transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </motion.button>

      {/* Master Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full w-96 bg-cosmic-space/95 backdrop-blur-xl border-r border-cosmic-white/20 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-cosmic-gradient rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-cosmic-white font-bold text-lg">Nemurium</h2>
                      <p className="text-cosmic-white/60 text-sm">Master Navigation</p>
                    </div>
                  </div>
                  <div className="h-px bg-cosmic-white/20 w-full"></div>
                </div>

                {/* Menu Sections */}
                <div className="space-y-6">
                  {menuSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                    >
                      <h3 className="text-cosmic-white/80 font-semibold text-sm uppercase tracking-wide mb-3">
                        {section.title}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => {
                          const Icon = item.icon
                          const isExternal = item.external
                          
                          const linkContent = (
                            <motion.div
                              whileHover={{ x: 4 }}
                              className="flex items-center gap-3 p-3 rounded-lg bg-cosmic-white/5 hover:bg-cosmic-white/10 transition-colors group"
                            >
                              <div className="w-8 h-8 bg-cosmic-white/10 rounded-lg flex items-center justify-center group-hover:bg-cosmic-purple/30 transition-colors">
                                <Icon className="h-4 w-4 text-cosmic-white/80" />
                              </div>
                              <div className="flex-1">
                                <div className="text-cosmic-white font-medium text-sm">{item.name}</div>
                                <div className="text-cosmic-white/60 text-xs">{item.description}</div>
                              </div>
                              {isExternal && (
                                <ExternalLink className="h-3 w-3 text-cosmic-white/40" />
                              )}
                            </motion.div>
                          )

                          return (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                            >
                              {isExternal ? (
                                <a 
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {linkContent}
                                </a>
                              ) : (
                                <button 
                                  onClick={() => navigateToSection(item.href, item.external)}
                                  className="w-full text-left"
                                >
                                  {linkContent}
                                </button>
                              )}
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-cosmic-white/20">
                  <div className="text-center">
                    <p className="text-cosmic-white/60 text-xs mb-2">
                      Built by iMMerSive Technologies
                    </p>
                    <p className="text-cosmic-white/40 text-xs">
                      Powered by Nemura & Sonarium AI
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}