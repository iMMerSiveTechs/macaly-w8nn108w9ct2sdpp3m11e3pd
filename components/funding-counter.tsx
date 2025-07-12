"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, Clock } from 'lucide-react'

export function FundingCounter() {
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [fundingProgress, setFundingProgress] = useState(0)
  const [currentRaised, setCurrentRaised] = useState(0)
  
  const FUNDING_GOAL = 500000 // $500K goal
  const TARGET_WAITLIST = 10000

  useEffect(() => {
    // Simulate real counters - replace with actual API calls
    const baseWaitlist = 2547
    const baseFunding = 127500
    
    // Animate counters on load
    const waitlistTimer = setInterval(() => {
      setWaitlistCount(prev => {
        const target = baseWaitlist + Math.floor(Math.random() * 50)
        return prev < target ? prev + 15 : target
      })
    }, 100)

    const fundingTimer = setInterval(() => {
      setCurrentRaised(prev => {
        const target = baseFunding + Math.floor(Math.random() * 5000)
        return prev < target ? prev + 2500 : target
      })
    }, 150)

    // Cleanup timers
    setTimeout(() => {
      clearInterval(waitlistTimer)
      clearInterval(fundingTimer)
    }, 3000)

    return () => {
      clearInterval(waitlistTimer)
      clearInterval(fundingTimer)
    }
  }, [])

  useEffect(() => {
    setFundingProgress((currentRaised / FUNDING_GOAL) * 100)
  }, [currentRaised])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 rounded-xl border border-cosmic-white/20 mb-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-cosmic-white mb-2">
          🚀 Live Campaign Status
        </h3>
        <p className="text-cosmic-white/70 text-sm">
          Real-time tracking of our community growth and funding progress
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Waitlist Counter */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cosmic-purple/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-cosmic-purple" />
            </div>
            <div>
              <h4 className="text-cosmic-white font-semibold">Waitlist</h4>
              <p className="text-cosmic-white/60 text-sm">Founding Creators</p>
            </div>
          </div>
          
          <div className="text-center">
            <motion.div
              key={waitlistCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-black text-cosmic-purple mb-2"
            >
              {formatNumber(waitlistCount)}
            </motion.div>
            <div className="w-full bg-cosmic-space/50 rounded-full h-2">
              <motion.div
                className="bg-cosmic-purple h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(waitlistCount / TARGET_WAITLIST) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-cosmic-white/60 text-xs mt-2">
              {((waitlistCount / TARGET_WAITLIST) * 100).toFixed(1)}% to {formatNumber(TARGET_WAITLIST)} target
            </p>
          </div>
        </div>

        {/* Funding Counter */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-cosmic-white font-semibold">Funding</h4>
              <p className="text-cosmic-white/60 text-sm">Total Raised</p>
            </div>
          </div>
          
          <div className="text-center">
            <motion.div
              key={currentRaised}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-black text-green-400 mb-2"
            >
              ${formatNumber(currentRaised)}
            </motion.div>
            <div className="w-full bg-cosmic-space/50 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${fundingProgress}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
            <p className="text-cosmic-white/60 text-xs mt-2">
              {fundingProgress.toFixed(1)}% of ${formatNumber(FUNDING_GOAL)} goal
            </p>
          </div>
        </div>
      </div>

      {/* Live indicators */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-cosmic-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-cosmic-white/70 text-sm">Live Updates</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-cosmic-white/60" />
          <span className="text-cosmic-white/60 text-sm">
            {new Date().toLocaleDateString()} Update
          </span>
        </div>
      </div>
    </motion.div>
  )
}