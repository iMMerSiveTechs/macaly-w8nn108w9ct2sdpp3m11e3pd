/*
 * Nemurium Footer Component
 * Built by Nemurium AI Engine
 * Copyright (c) 2025 iMMerSive Technologies, LLC
 * All rights reserved. Unauthorized reproduction prohibited.
 */

"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Sparkles, 
  Twitter, 
  Github, 
  Mail, 
  MessageSquare,
  Globe,
  Crown,
  Users
} from 'lucide-react'

export function Footer() {
  console.log('Footer component rendered')

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'About', href: 'https://nemurium.com/about' },
        { name: 'Vision', href: 'https://nemurium.com/vision' },
        { name: 'Features', href: '#features' },
        { name: 'Roadmap', href: 'https://nemurium.com/roadmap' }
      ]
    },
    {
      title: 'Creators',
      links: [
        { name: 'Creator Access', href: '/world-builder' },
        { name: 'Founding Program', href: 'https://jaytee5644.gumroad.com/l/ntpmhch' },
        { name: 'Waitlist', href: 'https://tally.so/r/mR6Jy8' },
        { name: 'Discord', href: 'https://discord.gg/nemurium' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact', href: 'mailto:immersivetechs@icloud.com' },
        { name: 'Help Center', href: 'https://nemurium.com/help' },
        { name: 'Community', href: 'https://discord.gg/nemurium' },
        { name: 'Feedback', href: 'mailto:feedback@nemurium.com' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/nemurium', name: 'Twitter' },
    { icon: Github, href: 'https://github.com/immersive-technologies', name: 'GitHub' },
    { icon: MessageSquare, href: 'https://discord.gg/nemurium', name: 'Discord' },
    { icon: Mail, href: 'mailto:immersivetechs@icloud.com', name: 'Email' }
  ]

  return (
    <footer className="relative py-16 px-6 bg-cosmic-space/50 backdrop-blur-sm border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-space via-transparent to-transparent" />
      
      <div className="container mx-auto max-w-6xl relative">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cosmic-gradient rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gradient">Nemurium</h3>
                  <p className="text-xs text-cosmic-white/60">World Builder Platform</p>
                </div>
              </div>
              
              <p className="text-cosmic-white/70 leading-relaxed mb-6 max-w-md">
                "The Operating System of the Immersive Internet."
              </p>
              
              <p className="text-sm text-cosmic-white/60 leading-relaxed">
                Building the infrastructure for the next generation of immersive digital experiences. 
                Join us in shaping the future of spatial computing and creative expression.
              </p>
            </motion.div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-cosmic-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-cosmic-white/70 hover:text-cosmic-white transition-colors text-sm hover:underline"
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-cosmic-white/60 text-sm text-center md:text-left"
          >
            <div className="mb-2">
              © 2025 iMMerSive Technologies, LLC. All Rights Reserved.
            </div>
            <div className="text-xs text-cosmic-white/40">
              Built by Nemurium AI Engine | Nemurium® is a registered trademark
            </div>
            <div className="text-xs text-cosmic-white/40">
              Protected by copyright and trade secret law. Unauthorized use prohibited.
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-3"
          >
            <Button 
              onClick={() => window.open('https://tally.so/r/mR6Jy8', '_blank')}
              size="sm"
              variant="outline"
              className="border-cosmic-cyan/50 text-cosmic-cyan hover:bg-cosmic-cyan/10"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Waitlist
            </Button>
            
            <Button 
              onClick={() => window.open('https://jaytee5644.gumroad.com/l/ntpmhch', '_blank')}
              size="sm"
              className="btn-cosmic text-white"
            >
              <Crown className="w-4 h-4 mr-2" />
              Founding Creator
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex gap-3"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-cosmic-white/60 hover:text-cosmic-white hover:bg-white/5"
                  onClick={() => window.open(social.href, '_blank')}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              )
            })}
          </motion.div>
        </div>

        {/* Final tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 pt-8 border-t border-white/5"
        >
          <p className="text-cosmic-white/40 text-xs italic">
            "Every universe begins with a single world. Every world begins with a single idea."
          </p>
        </motion.div>
        
        {/* Legal Links */}
        <div className="text-center text-xs text-white/60 mt-6 space-x-4">
          <a href="/terms" className="hover:underline hover:text-cosmic-cyan">Terms of Service</a>
          <span className="text-white/30">•</span>
          <a href="/privacy" className="hover:underline hover:text-cosmic-cyan">Privacy Policy</a>
          <span className="text-white/30">•</span>
          <a href="/LICENSE" className="hover:underline hover:text-cosmic-cyan">License Agreement</a>
          <span className="text-white/30">•</span>
          <a href="/investor-risk" className="hover:underline hover:text-cosmic-cyan">Investor Risk Disclosure</a>
        </div>
        
        {/* AI Engine Watermark */}
        <div className="text-center text-xs text-white/30 mt-4 border-t border-white/5 pt-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3" />
            <span>Powered by Nemurium AI Engine v1.0</span>
            <Sparkles className="w-3 h-3" />
          </div>
          <div className="mt-1">
            This platform and all associated technology is proprietary to iMMerSive Technologies
          </div>
        </div>
      </div>
    </footer>
  )
}