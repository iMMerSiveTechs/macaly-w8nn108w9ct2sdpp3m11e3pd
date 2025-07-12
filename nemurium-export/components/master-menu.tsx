"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  Globe, 
  Brain, 
  Map, 
  FolderOpen, 
  Camera, 
  Target, 
  Menu, 
  X, 
  Crown,
  Star,
  ChevronRight 
} from 'lucide-react'

const menuItems = [
  { 
    id: 'home', 
    label: 'Home', 
    icon: Home, 
    description: 'Landing page and overview',
    href: '/'
  },
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    description: 'Creator dashboard and projects',
    href: '/dashboard',
    requiresAuth: true
  },
  { 
    id: 'social', 
    label: 'Social Hub', 
    icon: Users, 
    description: 'Social feed, forums, and community',
    href: '/social'
  },
  { 
    id: 'world-builder', 
    label: 'World Builder', 
    icon: Globe, 
    description: '3D world creation studio',
    href: '/world-builder'
  },
  { 
    id: 'ai-generator', 
    label: 'AI Generator', 
    icon: Brain, 
    description: 'Advanced AI content creation',
    href: '/ai-generator'
  },
  { 
    id: 'realm-map', 
    label: 'Realm Map', 
    icon: Map, 
    description: 'Connected worlds and multiverses',
    href: '/realm-map'
  },
  { 
    id: 'asset-library', 
    label: 'Asset Library', 
    icon: FolderOpen, 
    description: '3D models and resources',
    href: '/asset-library'
  },
  { 
    id: 'ar-overlay', 
    label: 'AR Overlay', 
    icon: Camera, 
    description: 'Augmented reality interface',
    href: '/ar-overlay'
  },
  { 
    id: 'advertising', 
    label: 'Advertising', 
    icon: Target, 
    description: 'Monetization and ad campaigns',
    href: '/advertising',
    requiresAuth: true,
    premium: true
  }
]

interface MasterMenuProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export function MasterMenu({ activeSection, onSectionChange }: MasterMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = (item: typeof menuItems[0]) => {
    console.log('Navigation to:', item.id)
    
    if (item.href && item.href.startsWith('/') && item.href !== '/') {
      // External route
      onSectionChange(item.href)
    } else {
      // Internal section
      onSectionChange(item.id)
    }
    
    setIsOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.getElementById('master-menu')
      if (menuElement && !menuElement.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 p-3 bg-cosmic-purple/20 backdrop-blur-md border border-cosmic-purple/30 rounded-xl text-cosmic-white hover:bg-cosmic-purple/30 transition-all duration-300 cosmic-glow"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="master-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-0 h-full w-80 bg-cosmic-space/95 backdrop-blur-xl border-r border-cosmic-purple/20 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cosmic-purple/20">
              <div>
                <h2 className="text-xl font-bold text-gradient">Nemurium</h2>
                <p className="text-sm text-cosmic-white/60">Master Navigation</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-cosmic-purple/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleItemClick(item)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left group ${
                      isActive 
                        ? 'bg-cosmic-purple/20 text-cosmic-purple' 
                        : 'hover:bg-cosmic-purple/10 text-cosmic-white'
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 group-hover:scale-110 transition-transform ${
                      isActive ? 'text-cosmic-purple' : 'text-cosmic-cyan'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium group-hover:text-cosmic-cyan transition-colors ${
                        isActive ? 'text-cosmic-purple' : ''
                      }`}>
                        {item.label}
                        {item.premium && <Crown className="inline h-3 w-3 ml-1" />}
                      </div>
                      <div className="text-xs text-cosmic-white/60 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-cosmic-white/30" />
                  </motion.button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-cosmic-purple/20 mt-auto">
              <p className="text-xs text-cosmic-white/40 text-center">
                Built by iMMerSive Technologies
                <br />
                Powered by Nemura & Sonarium
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}