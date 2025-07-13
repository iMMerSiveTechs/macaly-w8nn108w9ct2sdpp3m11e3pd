"use client"

import { memo, lazy, Suspense, useEffect, useState } from 'react'
import ScrollDownHint from '@/components/ScrollDownHint'

// Critical component loaded immediately
import LandingHero from '@/components/landing-hero'

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const startCount = 0;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - startCount) + startCount));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    // Delay animation start for scroll reveal
    const timer = setTimeout(() => {
      requestAnimationFrame(updateCount);
    }, 500);

    return () => clearTimeout(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

// Enhanced stats section with scroll animations
const QuickStats = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="stats-section" className="py-16 px-6 bg-gradient-to-r from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gradient-text">
            🚀 Powering the Creator Economy
          </h2>
          <p className="text-gray-300 text-lg">Join thousands building the future of immersive experiences</p>
        </div>
        
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fadeInScale' : 'opacity-0'}`}>
          <div className="glass rounded-2xl p-8 text-center card-hover">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-3">
              {isVisible ? <AnimatedCounter end={50} suffix="K+" /> : '0'}
            </div>
            <div className="text-white font-semibold text-lg mb-2">Worlds Created</div>
            <div className="text-xs text-gray-400">📊 Demo Mode</div>
          </div>
          <div className="glass rounded-2xl p-8 text-center card-hover">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-3">
              {isVisible ? <AnimatedCounter end={12} suffix="K+" /> : '0'}
            </div>
            <div className="text-white font-semibold text-lg mb-2">Active Creators</div>
            <div className="text-xs text-gray-400">📊 Demo Mode</div>
          </div>
          <div className="glass rounded-2xl p-8 text-center card-hover">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-3">
              {isVisible ? <AnimatedCounter end={200} suffix="K+" /> : '0'}
            </div>
            <div className="text-white font-semibold text-lg mb-2">Assets Shared</div>
            <div className="text-xs text-gray-400">📊 Demo Mode</div>
          </div>
        </div>
      </div>
    </div>
  )
})

const FeatureCard = memo(({ icon, title, description, color, gradient }: any) => (
  <div className={`${gradient} glass rounded-2xl p-6 text-center text-white card-hover`}>
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
))

const QuickFeatures = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('features-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="features-section" className="py-16 px-6 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900">
      <div className="container mx-auto max-w-5xl">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🤖 Platform Features</h2>
          <p className="text-gray-300 text-lg">Everything you need to create immersive experiences</p>
        </div>
        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fadeInScale' : 'opacity-0'}`}>
          <FeatureCard 
            icon="🤖"
            title="AI Tools"
            description="Advanced creation tools powered by artificial intelligence"
            gradient="bg-gradient-to-br from-blue-800/70 to-blue-900/70"
          />
          <FeatureCard 
            icon="🥽"
            title="VisionOS Ready"
            description="Spatial computing interface optimized for Apple Vision Pro"
            gradient="bg-gradient-to-br from-purple-800/70 to-purple-900/70"
          />
          <FeatureCard 
            icon="🎮"
            title="Creator Progress"
            description="Achievement system with rewards and progression tracking"
            gradient="bg-gradient-to-br from-green-800/70 to-green-900/70"
          />
        </div>
      </div>
    </div>
  )
})

const QuickWaitlist = memo(() => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="py-16 px-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400 rounded-full animate-float blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto max-w-lg text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the Waitlist</h2>
        <p className="text-gray-300 mb-8 text-lg">Be first when Nemurium goes live – get exclusive early access</p>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button 
              type="submit"
              className="bg-white text-purple-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all btn-glow"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="animate-fadeInScale glass rounded-xl p-6">
            <div className="text-green-400 text-2xl mb-2">✅</div>
            <p className="text-white font-semibold">Thanks! You're on the list.</p>
          </div>
        )}
      </div>
    </div>
  )
})

const QuickFooter = memo(() => (
  <footer className="bg-black text-white py-12 px-6 relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)`
      }}></div>
    </div>

    <div className="container mx-auto max-w-5xl relative z-10">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4 gradient-text">Nemurium</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            Building the infrastructure for immersive digital experiences. 
            Empowering creators to build the next generation of the internet.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-lg">Platform</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/world-builder" className="hover:text-white transition-colors">World Builder</a></li>
            <li><a href="/asset-library" className="hover:text-white transition-colors">Asset Library</a></li>
            <li><a href="/tools" className="hover:text-white transition-colors">Creator Tools</a></li>
            <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-lg">Company</h4>
          <ul className="space-y-3 text-gray-400">
            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-400">
          © 2025 <span className="text-purple-400 font-semibold">iMMerSive Technologies, LLC</span>. All Rights Reserved.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Building the future of immersive experiences, one realm at a time.
        </p>
      </div>
    </div>
  </footer>
))

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative">
        <LandingHero />
        <ScrollDownHint />
      </section>

      {/* Stats Section */}
      <QuickStats />

      {/* Features Section */}
      <QuickFeatures />

      {/* Waitlist Section */}
      <QuickWaitlist />

      {/* Footer */}
      <QuickFooter />
    </div>
  )
}