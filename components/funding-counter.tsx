"use client"

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Clock } from 'lucide-react'

export function FundingCounter() {
  const [waitlistCount] = useState(450)
  const [currentRaised] = useState(50000)
  
  const FUNDING_GOAL = 500000 // $500K goal
  const TARGET_WAITLIST = 10000

  const fundingProgress = (currentRaised / FUNDING_GOAL) * 100
  const waitlistProgress = (waitlistCount / TARGET_WAITLIST) * 100

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-xl mb-8 backdrop-blur-sm">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          🚀 Live Campaign Status
        </h3>
        <p className="text-gray-400 text-sm">
          Real-time tracking of our community growth and funding progress
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Waitlist Counter */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Waitlist</h4>
              <p className="text-gray-400 text-sm">Founding Creators</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-black text-purple-400 mb-2">
              {formatNumber(waitlistCount)}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${waitlistProgress}%` }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-2">
              {waitlistProgress.toFixed(1)}% to {formatNumber(TARGET_WAITLIST)} target
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
              <h4 className="text-white font-semibold">Funding</h4>
              <p className="text-gray-400 text-sm">Total Raised</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-black text-green-400 mb-2">
              ${formatNumber(currentRaised)}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${fundingProgress}%` }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-2">
              {fundingProgress.toFixed(1)}% of ${formatNumber(FUNDING_GOAL)} goal
            </p>
          </div>
        </div>
      </div>

      {/* Live indicators */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Live Updates</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-gray-500 text-sm">
            {new Date().toLocaleDateString()} Update
          </span>
        </div>
      </div>
    </div>
  )
}