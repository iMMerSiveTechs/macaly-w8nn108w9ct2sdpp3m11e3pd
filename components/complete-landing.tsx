"use client"

import { LandingNavigation } from './landing-navigation'
import { LandingHero } from './landing-hero'
import { AboutNemurium } from './about-nemurium'
import { FeaturesSection } from './features-section'
import { FoundingCreator } from './founding-creator'
import { FoundingInvestor } from './founding-investor'
import { InvestorTiers } from './investor-tiers'
import { InvestorMaterials } from './investor-materials'
import { Dashboard } from './dashboard'
import { VisualPreview } from './visual-preview'
import { FunctionalWaitlist } from './functional-waitlist'
import { Footer } from './footer'
import { DreamMachine } from './dream-machine'

export function CompleteLanding() {
  console.log('CompleteLanding component rendered')

  const handleGetStarted = () => {
    // Scroll to waitlist section
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <LandingNavigation />

      {/* Hero Section */}
      <section id="hero">
        <LandingHero onGetStarted={handleGetStarted} />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutNemurium />
      </section>

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Visual Preview Section */}
      <section id="preview">
        <VisualPreview />
      </section>

      {/* Founding Creator Section */}
      <section id="founding">
        <FoundingCreator />
      </section>

      {/* Founding Investor Section */}
      <section id="founding-investor">
        <FoundingInvestor />
      </section>

      {/* Investor Tiers Section */}
      <section id="investor">
        <InvestorTiers />
      </section>

      {/* Investor Materials Section */}
      <section id="investor-materials">
        <InvestorMaterials />
      </section>

      {/* Dashboard Section */}
      <section id="dashboard">
        <Dashboard />
      </section>

      {/* Live Investor Dashboard */}
      <section id="live-dashboard" className="py-12 cosmic-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-cosmic-white mb-4">
              Live <span className="text-gradient">Investor Dashboard</span>
            </h2>
            <p className="text-cosmic-white/80 max-w-2xl mx-auto">
              Experience the full investor portal with real-time metrics, exclusive content, and tier-based access.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel border-cosmic-white/20 p-2 rounded-lg overflow-hidden">
              <iframe 
                src="https://nemurium-investors.softr.app" 
                width="100%" 
                height="1600px" 
                style={{ border: 'none', overflow: 'auto' }}
                title="Nemurium Investor Dashboard"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dream Machine Section */}
      <section id="dream-machine">
        <DreamMachine />
      </section>

      {/* Waitlist Section */}
      <section id="waitlist">
        <FunctionalWaitlist />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}