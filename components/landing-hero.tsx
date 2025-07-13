'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function LandingHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Optimized Background Image with Next.js Image component */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/7886853/pexels-photo-7886853.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="VR Experience"
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyejFjjvYbqMzAPmNZ/9k="
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Alpha Badge with improved contrast */}
        <div className="inline-flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm text-purple-200 px-6 py-3 rounded-full border border-purple-400/30 mb-8 shadow-xl">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="font-medium">Now in Private Alpha - Invite Only</span>
        </div>

        {/* Main Heading with improved typography */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="text-white">The Future of </span>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Immersive
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Creation
          </span>
          <br />
          <span className="text-white">Starts Here</span>
        </h1>

        {/* Subtitle with better contrast */}
        <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-3xl mx-auto leading-relaxed">
          Nemurium empowers anyone to build and monetize interactive 3D realms in mixed reality — <span className="text-cyan-400 font-semibold">no code, no limits</span>.
        </p>

        {/* Call-to-action with brain emoji and better contrast */}
        <div className="flex items-center justify-center gap-2 text-lg text-amber-300 mb-12 font-medium">
          <span className="text-2xl">🧠</span>
          <span>You don't just build a world — you build the next internet.</span>
        </div>

        {/* CTA Buttons with improved accessibility and contrast */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="/world-builder">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                🌍 Start Building Worlds
              </span>
            </button>
          </Link>

          <Link href="/ar">
            <button className="group relative px-8 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600 hover:border-cyan-400 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                📱 Try AR Demo
              </span>
            </button>
          </Link>

          <Link href="/affiliate">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center gap-2">
                💰 Earn Money
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Animated scroll indicator with better performance */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white/60" />
      </div>

      {/* Floating decorative elements - optimized */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-10 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
        <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-xl"></div>
      </div>
    </section>
  );
}