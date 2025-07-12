"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, Sparkles, Users, Zap, Gift } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Be first to experience new features and tools'
  },
  {
    icon: Gift,
    title: 'Exclusive Content',
    description: 'Free premium assets and templates'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Join our private creator Discord community'
  }
]

export function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsLoading(false)
    setEmail('')
  }

  return (
    <section className="py-20 px-6" id="waitlist-section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-cyan/20 border border-cosmic-cyan/30 rounded-full text-sm text-cosmic-cyan mb-6">
              <Sparkles className="h-4 w-4" />
              Join the Revolution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-6">
              Get Early Access to
              <span className="block text-gradient">Nemurium</span>
            </h2>
            <p className="text-xl text-cosmic-white/70 max-w-2xl mx-auto">
              Be among the first creators to experience the future of immersive content creation
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6 rounded-xl"
                >
                  <div className="inline-flex p-3 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-lg mb-4">
                    <IconComponent className="h-6 w-6 text-cosmic-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-cosmic-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-cosmic-white/70 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl border border-cosmic-purple/30 max-w-2xl mx-auto"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cosmic-white/80 mb-3 text-left">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmic-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-cosmic-space/50 border border-cosmic-white/10 rounded-xl text-cosmic-white placeholder-cosmic-white/40 focus:outline-none focus:border-cosmic-purple/50 focus:ring-2 focus:ring-cosmic-purple/20 transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!email || isLoading}
                  className="w-full py-4 bg-cosmic-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cosmic-purple/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                      Joining Waitlist...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      Join the Waitlist
                    </>
                  )}
                </button>

                <p className="text-xs text-cosmic-white/60 text-center">
                  By joining, you agree to receive updates about Nemurium. Unsubscribe anytime.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-cosmic-white mb-2">
                  Welcome to the Future!
                </h3>
                <p className="text-cosmic-white/70 mb-6">
                  You're now on the waitlist. We'll notify you as soon as early access is available.
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-cosmic-cyan">
                    <CheckCircle className="h-4 w-4" />
                    <span>Priority Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-cosmic-purple">
                    <CheckCircle className="h-4 w-4" />
                    <span>Exclusive Updates</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-cosmic-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">2,847 creators joined this week</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">15,000+ on waitlist</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}