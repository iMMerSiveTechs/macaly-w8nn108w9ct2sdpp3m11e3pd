'use client';
import Link from 'next/link';
import { ArrowRight, Play, Globe, Package, Zap, Sparkles, Wand2, Smartphone, DollarSign } from 'lucide-react';
import { useState, useEffect, useCallback, memo } from 'react';

interface LandingHeroProps {
  onGetStarted?: () => void;
}

// Optimized animated counter with requestAnimationFrame
const AnimatedCounter = memo(({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
});

// Optimized parallax background
const ParallaxBackground = memo(() => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const updateScrollY = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Hero Background Image with parallax */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img 
          src="https://images.pexels.com/photos/7886853/pexels-photo-7886853.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" 
          alt="VR Experience" 
          className="w-full h-[120%] object-cover opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-purple-900/75 to-gray-900/85"></div>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute inset-0 animate-matrix"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 40% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)
            `
          }}
        />
      </div>
    </div>
  );
});

// Floating elements with optimized animation
const FloatingElements = memo(() => (
  <div className="absolute inset-0 opacity-30 z-1 pointer-events-none">
    <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full animate-float blur-3xl gpu-optimize"></div>
    <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-500 rounded-full animate-float blur-3xl gpu-optimize" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-green-500 rounded-full animate-float blur-3xl gpu-optimize" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-60 right-1/3 w-20 h-20 bg-pink-500 rounded-full animate-float blur-3xl gpu-optimize" style={{ animationDelay: '3s' }}></div>
  </div>
));

export default function LandingHero({ onGetStarted }: LandingHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Optimize initial render
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = useCallback(() => {
    onGetStarted?.();
    // Add haptic feedback for supported devices
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  }, [onGetStarted]);

  return (
    <div className="relative text-center text-white py-20 px-6 particles-bg overflow-hidden min-h-screen flex items-center">
      <ParallaxBackground />
      <FloatingElements />

      <div className={`relative z-10 max-w-6xl mx-auto w-full transition-all duration-1000 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        {/* Hero Content */}
        <div className="text-center space-y-8 mb-16">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900/30 border border-purple-500/50 rounded-full backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-purple-200 font-medium">Now in Private Alpha - Invite Only</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              The Future of{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Immersive
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Creation
              </span>
              <br />
              Starts Here
            </h1>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Nemurium empowers anyone to build and monetize interactive 3D realms in mixed reality —{' '}
                <span className="text-cyan-400 font-semibold">no code, no limits.</span>
              </p>
              
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="text-blue-400">🧠</div>
                <p className="text-lg text-blue-300 italic">
                  You don't just build a world — you build the next internet.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => window.location.href = '/world-builder'}
              className="group relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Start Building Worlds
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => window.location.href = '/ar'}
              className="group bg-green-600/20 backdrop-blur-sm border border-green-500/50 text-green-300 hover:bg-green-600/30 hover:text-green-200 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Try AR Demo
              </span>
            </button>

            <Link
              href="/affiliate"
              className="group bg-yellow-600/20 backdrop-blur-sm border border-yellow-500/50 text-yellow-300 hover:bg-yellow-600/30 hover:text-yellow-200 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Earn Money
              </span>
            </Link>
          </div>
        </div>

        {/* Hero Visual Section */}
        <div className="relative">
          {/* Main Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* World Builder Preview */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300">
              <div className="aspect-video relative">
                <img 
                  src="https://images.pexels.com/photos/30547606/pexels-photo-30547606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="3D World Builder Interface"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-2">World Builder</h3>
                  <p className="text-purple-200 text-sm">Create immersive 3D realms with drag & drop</p>
                </div>
              </div>
            </div>

            {/* AR Experience Preview */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-pink-500/30 backdrop-blur-sm hover:border-pink-400/50 transition-all duration-300">
              <div className="aspect-video relative">
                <img 
                  src="https://images.pexels.com/photos/12969085/pexels-photo-12969085.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="AR Experience"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-2">AR Experience</h3>
                  <p className="text-pink-200 text-sm">View your creations in augmented reality</p>
                </div>
              </div>
            </div>

            {/* Affiliate Hub Preview */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/40 to-blue-900/40 border border-green-500/30 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300">
              <div className="aspect-video relative">
                <img 
                  src="https://images.pexels.com/photos/17483869/pexels-photo-17483869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Affiliate Earnings Dashboard"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-2">Earn Money</h3>
                  <p className="text-green-200 text-sm">Monetize your creativity with affiliate earnings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Digital Art */}
          <div className="absolute -top-32 -right-32 w-64 h-64 opacity-10 pointer-events-none">
            <img 
              src="https://images.pexels.com/photos/30547572/pexels-photo-30547572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Digital Patterns"
              className="w-full h-full object-cover rounded-full blur-sm"
            />
          </div>
          
          <div className="absolute -bottom-32 -left-32 w-64 h-64 opacity-10 pointer-events-none">
            <img 
              src="https://images.pexels.com/photos/30547564/pexels-photo-30547564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="3D Blocks"
              className="w-full h-full object-cover rounded-full blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}