"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LandingHero } from '@/components/landing-hero'
import { FeaturesSection } from '@/components/features-section'
import { WaitlistSection } from '@/components/waitlist-section'
import { Footer } from '@/components/footer'
import { DreamMachine } from '@/components/dream-machine'
import { FundingCounter } from '@/components/funding-counter'
import { AICopilot } from '@/components/ai-copilot'
import { MasterMenu } from '@/components/master-menu'
import AIWorldBuilder from '@/components/ai-world-builder'
import FirebaseAuth from '@/components/firebase-auth'
import DiscordCommunity from '@/components/discord-community'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home')

  const handleSectionChange = (sectionId: string) => {
    if (sectionId.startsWith('/')) {
      window.location.href = sectionId
    } else {
      setActiveSection(sectionId)
    }
  }

  // Reusable wrapper to reduce repetition
  const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'world-builder':
        return <SectionWrapper><AIWorldBuilder /></SectionWrapper>
      case 'community':
        return <SectionWrapper><DiscordCommunity /></SectionWrapper>
      case 'ai-copilot':
        return <SectionWrapper><AICopilot /></SectionWrapper>
      default:
        return (
          <div className="min-h-screen bg-cosmic-space text-cosmic-white">
            <LandingHero onGetStarted={() => setActiveSection('world-builder')} />
            <FundingCounter />
            <FeaturesSection />
            <DreamMachine />
            <WaitlistSection />
            <Footer />
          </div>
        )
    }
  }

  return (
    <div className="relative">
      <MasterMenu 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="fixed top-4 right-6 z-50">
        <FirebaseAuth />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {activeSection !== 'ai-copilot' && (
        <button
          onClick={() => setActiveSection('ai-copilot')}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          aria-label="Open AI Copilot"
        >
          <span className="text-2xl">🤖</span>
        </button>
      )}
    </div>
  )
}