"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, Clock } from 'lucide-react'

export function FundingCounter() {
  const [currentFunding, setCurrentFunding] = useState(0)
  const [backers, setBackers] = useState(0)
  const [timeLeft, setTimeLeft] = useState('')

  const targetFunding = 250000
  const fundingGoal = 500000
  const targetBackers = 1500

  useEffect(() => {
    // Animate funding counter
    const fundingInterval = setInterval(() => {
      setCurrentFunding(prev => {
        if (prev < targetFunding) {
          return Math.min(prev + 2500, targetFunding)
        }
        return prev
      })
    }, 50)

    // Animate backers counter
    const backersInterval = setInterval(() => {
      setBackers(prev => {
        if (prev < targetBackers) {
          return Math.min(prev + 15, targetBackers)
        }
        return prev
      })
    }, 100)

    // Calculate time left (example: 30 days from now)
    const calculateTimeLeft = () => {
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 30)
      
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      
      return `${days}d ${hours}h`
    }

    setTimeLeft(calculateTimeLeft())
    const timeInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000) // Update every minute

    return () => {
      clearInterval(fundingInterval)
      clearInterval(backersInterval)
      clearInterval(timeInterval)
    }
  }, [targetFunding, targetBackers])

  const fundingPercentage = (currentFunding / fundingGoal) * 100

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-2xl border border-cosmic-purple/30"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-amber/20 border border-cosmic-amber/30 rounded-full text-sm text-cosmic-amber mb-4">
              <TrendingUp className="h-4 w-4" />
              Live Funding Campaign
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-cosmic-white mb-2">
              Building the Future Together
            </h2>
            <p className="text-cosmic-white/70">
              Help us democratize immersive content creation
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Funding Amount */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-5 w-5 text-cosmic-purple" />
                <span className="text-sm font-medium text-cosmic-white/60">RAISED</span>
              </div>
              <div className="text-3xl font-bold text-cosmic-purple mb-1">
                ${currentFunding.toLocaleString()}
              </div>
              <div className="text-sm text-cosmic-white/60">
                of ${fundingGoal.toLocaleString()} goal
              </div>
            </div>

            {/* Backers */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-cosmic-cyan" />
                <span className="text-sm font-medium text-cosmic-white/60">BACKERS</span>
              </div>
              <div className="text-3xl font-bold text-cosmic-cyan mb-1">
                {backers.toLocaleString()}
              </div>
              <div className="text-sm text-cosmic-white/60">
                supporters worldwide
              </div>
            </div>

            {/* Time Left */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-cosmic-amber" />
                <span className="text-sm font-medium text-cosmic-white/60">TIME LEFT</span>
              </div>
              <div className="text-3xl font-bold text-cosmic-amber mb-1">
                {timeLeft}
              </div>
              <div className="text-sm text-cosmic-white/60">
                to reach our goal
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-cosmic-white/80">
                Progress: {fundingPercentage.toFixed(1)}%
              </span>
              <span className="text-sm text-cosmic-white/60">
                ${(fundingGoal - currentFunding).toLocaleString()} to go
              </span>
            </div>
            <div className="w-full bg-cosmic-space/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${fundingPercentage}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full bg-cosmic-gradient rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-cosmic-gradient text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cosmic-purple/25 transition-all duration-300 hover:scale-105">
              Back This Project
            </button>
            <button className="px-8 py-4 bg-transparent border border-cosmic-white/20 text-cosmic-white font-semibold rounded-xl hover:bg-cosmic-white/5 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 pt-6 border-t border-cosmic-white/10">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-cosmic-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>124 backed in last 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cosmic-cyan rounded-full animate-pulse" />
                <span>Featured on ProductHunt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cosmic-amber rounded-full animate-pulse" />
                <span>Trending #1 in VR/AR</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}