/*
 * Nemurium - Immersive Creation Platform
 * Built by Nemurium AI Engine
 * Copyright (c) 2025 iMMerSive Technologies, LLC
 * All rights reserved. Unauthorized reproduction prohibited.
 */

"use client"

import { ErrorBoundary } from '@/components/error-boundary'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { LandingHero } from '@/components/landing-hero'
import { FeaturesSection } from '@/components/features-section'
import { WaitlistSection } from '@/components/waitlist-section'
import { Footer } from '@/components/footer'
import { DreamMachine } from '@/components/dream-machine'
import { FundingCounter } from '@/components/funding-counter'
import { AICopilot } from '@/components/ai-copilot'
import { MasterMenu } from '@/components/master-menu'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  console.error('Page component error:', error)
  
  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white flex items-center justify-center p-8">
      <div className="glass-panel p-8 rounded-xl border border-red-500/30 bg-red-500/10 max-w-md text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-red-400 mb-2">Component Error</h2>
        <p className="text-cosmic-white/80 text-sm mb-4">
          Something went wrong loading this section
        </p>
        <p className="text-cosmic-white/60 text-xs mb-6 font-mono bg-cosmic-space/50 p-2 rounded">
          {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}

export default function HomePage() {
  console.log('HomePage rendering')

  const handleGetStarted = () => {
    console.log('Get started clicked')
    window.location.href = '/world-builder'
  }

  const handleLogin = () => {
    console.log('Login clicked')  
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white">
      {/* Master Menu */}
      <MasterMenu />
      
      <ErrorBoundary>
        <LandingHero onGetStarted={handleGetStarted} />
      </ErrorBoundary>

      <ErrorBoundary>
        <div id="waitlist">
          <FundingCounter />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <div id="features">
          <FeaturesSection />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <div id="dream-machine">
          <DreamMachine />
        </div>
      </ErrorBoundary>

      {/* Individual AI Engine Sections */}
      <div id="nemura" className="scroll-mt-20"></div>
      <div id="sonarium" className="scroll-mt-20"></div>
      <div id="neural" className="scroll-mt-20"></div>
      <div id="vision" className="scroll-mt-20"></div>
      <div id="ar-overlay" className="scroll-mt-20"></div>

      <ErrorBoundary>
        <div id="waitlist-section">
          <WaitlistSection />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>

      <ErrorBoundary>
        <div id="ai-copilot">
          <AICopilot />
        </div>
      </ErrorBoundary>
    </div>
  )
}