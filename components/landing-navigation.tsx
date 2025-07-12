"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Sparkles,
  Users,
  Zap
} from 'lucide-react'

export function LandingNavigation() {
  console.log('LandingNavigation component rendered')
  
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Dream Machine', href: '#dream-machine' },
    { label: 'Pricing', href: '#investor' },
    { label: 'Join Waitlist', href: '#waitlist' }
  ]

  const scrollToSection = (href: string) => {
    console.log('Scrolling to section:', href)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-cosmic-space/95 backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <div className="w-8 h-8 bg-cosmic-gradient rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-gradient">Nemurium</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="text-cosmic-white/80 hover:text-cosmic-white font-medium transition-colors duration-200 hover:text-cosmic-cyan"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.nav>

          {/* Desktop CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center gap-3"
          >
            <Button
              onClick={() => scrollToSection('#waitlist')}
              variant="outline"
              className="border-cosmic-cyan/50 text-cosmic-cyan hover:bg-cosmic-cyan/10"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Waitlist
            </Button>
            <Button
              onClick={() => scrollToSection('#investor')}
              className="btn-cosmic text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Invest Now
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-cosmic-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/10 mt-2 pt-4 pb-6"
          >
            <div className="flex flex-col gap-4">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-cosmic-white/80 hover:text-cosmic-cyan font-medium transition-colors duration-200 text-left py-2"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button
                  onClick={() => scrollToSection('#waitlist')}
                  variant="outline"
                  className="border-cosmic-cyan/50 text-cosmic-cyan hover:bg-cosmic-cyan/10 w-full"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
                <Button
                  onClick={() => scrollToSection('#investor')}
                  className="btn-cosmic text-white w-full"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Invest Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}