"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  Box, 
  Users, 
  Library, 
  Settings, 
  User, 
  Bell,
  Search,
  Plus,
  Globe,
  Sparkles,
  Zap
} from 'lucide-react'

interface NavigationProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  console.log('Navigation rendered with currentView:', currentView)

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'builder', label: 'World Builder', icon: Box },
    { id: 'realms', label: 'My Realms', icon: Globe },
    { id: 'assets', label: 'Asset Library', icon: Library },
    { id: 'collaborate', label: 'Collaborate', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="h-full glass-panel border-r border-white/10">
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <motion.div 
            className="flex items-center gap-3"
            layout
          >
            <div className="w-8 h-8 bg-cosmic-gradient rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="text-lg font-bold text-gradient">Nemurium</h1>
                <p className="text-xs text-cosmic-white/60">World Builder</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-white/10">
          <Button 
            onClick={() => onViewChange('builder')}
            className="w-full btn-cosmic text-white font-medium"
            size={isExpanded ? "default" : "icon"}
          >
            <Plus className="w-4 h-4" />
            {isExpanded && <span className="ml-2">New World</span>}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple/30' 
                      : 'text-cosmic-white/70 hover:bg-white/5 hover:text-cosmic-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isActive && isExpanded && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <Badge variant="secondary" className="bg-cosmic-purple/20 text-cosmic-purple text-xs">
                        Active
                      </Badge>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cosmic-gradient rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-cosmic-white truncate">Creator Pro</p>
                <p className="text-xs text-cosmic-white/60 truncate">Premium Plan</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}