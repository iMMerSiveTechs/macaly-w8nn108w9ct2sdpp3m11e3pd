"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Users, 
  MessageSquare, 
  Bell,
  ArrowRight,
  Sparkles,
  Crown,
  Gift
} from 'lucide-react'

export function WaitlistSection() {
  console.log('WaitlistSection component rendered')

  const benefits = [
    {
      icon: Bell,
      title: 'First Access',
      description: 'Be the first to know when Nemurium launches'
    },
    {
      icon: Gift,
      title: 'Exclusive Updates',
      description: 'Behind-the-scenes content and development previews'
    },
    {
      icon: MessageSquare,
      title: 'Discord Community',
      description: 'Optional access to our growing creator community'
    },
    {
      icon: Crown,
      title: 'Creator Priority',
      description: 'Priority consideration for early creator programs'
    }
  ]

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-transparent via-cosmic-cyan/5 to-transparent">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-cosmic-white mb-6">
            Join the <span className="text-gradient">Waitlist</span>
          </h2>
          <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Want to be first in line when Nemurium goes live?
          </p>
          <p className="text-lg text-cosmic-white/70 max-w-2xl mx-auto">
            Sign up below to receive updates, early looks, and your Creator Access form.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-panel border-white/10 p-6 floating-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cosmic-white mb-1">{benefit.title}</h3>
                      <p className="text-cosmic-white/70 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={ { duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="glass-panel border-white/10 p-8 mb-8 cosmic-glow">
            <div className="mb-6">
              <div className="w-20 h-20 bg-cosmic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cosmic-white mb-2">Ready to Build the Future?</h3>
              <p className="text-cosmic-white/70">
                Join thousands of creators who are ready to shape the immersive internet
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://tally.so/r/mR6Jy8', '_blank')}
                size="lg"
                className="btn-cosmic text-white font-bold px-8"
              >
                <Users className="w-5 h-5 mr-2" />
                Sign Up Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                onClick={() => window.open('https://gumroad.com/l/nemurium-founding-creator', '_blank')}
                variant="outline"
                size="lg"
                className="border-cosmic-amber/50 text-cosmic-amber hover:bg-cosmic-amber/10"
              >
                <Crown className="w-5 h-5 mr-2" />
                Skip the Line - Go Founding
              </Button>
            </div>
          </Card>

          {/* Form Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-left max-w-2xl mx-auto"
          >
            <Badge className="bg-cosmic-slate/50 text-cosmic-white/70 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              What We'll Ask You:
            </Badge>
            <div className="glass-panel border-white/10 p-6 space-y-3 text-sm text-cosmic-white/70">
              <div>• Full Name & Email</div>
              <div>• Creator Name or Alias</div>
              <div>• What kind of world would you create first?</div>
              <div>• Your experience level (Beginner to Pro)</div>
              <div>• Interest in Discord community access</div>
              <div>• Portfolio links (optional)</div>
              <div>• Founding Creator program interest</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}