"use client"

import { motion } from 'framer-motion'
import { Github, Twitter, Discord, Youtube, Mail, Globe, Heart } from 'lucide-react'

const footerLinks = {
  'Platform': [
    { label: 'Dream Machine', href: '#dream-machine' },
    { label: 'World Builder', href: '#world-builder' },
    { label: 'Asset Library', href: '#asset-library' },
    { label: 'AR Overlay', href: '#ar-overlay' }
  ],
  'AI Engines': [
    { label: 'Nemura (Visual)', href: '#nemura' },
    { label: 'Sonarium (Audio)', href: '#sonarium' },
    { label: 'Vision Processing', href: '#vision' },
    { label: 'Neural Networks', href: '#neural' }
  ],
  'Community': [
    { label: 'Discord Server', href: 'https://discord.gg/nemurium' },
    { label: 'GitHub', href: 'https://github.com/nemurium' },
    { label: 'Documentation', href: '#docs' },
    { label: 'Support', href: '#support' }
  ],
  'Company': [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#blog' },
    { label: 'Press Kit', href: '#press' }
  ]
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/nemurium', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/nemurium', label: 'Twitter' },
  { icon: Discord, href: 'https://discord.gg/nemurium', label: 'Discord' },
  { icon: Youtube, href: 'https://youtube.com/@nemurium', label: 'YouTube' },
  { icon: Mail, href: 'mailto:hello@nemurium.com', label: 'Email' }
]

export function Footer() {
  return (
    <footer className="relative py-20 px-6 border-t border-cosmic-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-cosmic-radial opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gradient mb-4">Nemurium</h3>
              <p className="text-cosmic-white/70 mb-6 leading-relaxed">
                The future of immersive content creation. Build, connect, and publish 
                worlds with AI-powered tools designed for the next generation of creators.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-cosmic-white/5 border border-cosmic-white/10 rounded-lg hover:bg-cosmic-purple/20 hover:border-cosmic-purple/30 transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5 text-cosmic-white/70 hover:text-cosmic-white" />
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={category} className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-cosmic-white mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-cosmic-white/60 hover:text-cosmic-cyan transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-cosmic-white/10"
        >
          {/* Copyright */}
          <div className="text-cosmic-white/60 text-sm">
            © 2025 iMMerSive Technologies™ - All rights reserved
          </div>

          {/* Brand Attribution */}
          <div className="flex items-center gap-6 text-cosmic-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Built by iMMerSive Technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Powered by Nemura & Sonarium</span>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-cosmic-white/60 text-sm">
            <a href="#privacy" className="hover:text-cosmic-cyan transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-cosmic-cyan transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>

        {/* Brand Details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-cosmic-white/5"
        >
          <div className="grid gap-3 text-xs text-cosmic-white/40 text-center">
            <p>🧠 <strong>Nemura™</strong> powers cinematic visual AI scenes.</p>
            <p>🎧 <strong>Sonarium™</strong> generates immersive audio environments.</p>
            <p>🌐 <strong>Nemurium™</strong> is the core worldbuilder and interface engine.</p>
            <p>🏢 <strong>iMMerSive™</strong> is the master company — powering the Immersive Internet.</p>
            <p className="text-cosmic-white/30 mt-4">
              Nemurium™, Sonarium™, Nemura™, and the Immersive Internet™ are trademarks of iMMerSive Technologies.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}