"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Live Site Banner */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-2 px-4 text-sm font-medium shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>🚧 LIVE SITE - Some features still in development | Alpha Testing Phase</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Simple Navigation */}
        <div className="fixed top-10 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Nemurium</h1>
            <div className="flex items-center gap-4 text-sm">
              <a href="/world-builder" className="text-gray-300 hover:text-white">🌍 World Builder</a>
              <a href="/tools" className="text-gray-300 hover:text-white">🛠️ Tools</a>
              <a href="/dashboard" className="text-gray-300 hover:text-white">📊 Dashboard</a>
              <a href="/affiliate" className="text-gray-300 hover:text-white">💰 Earn</a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-16">
          <div className="inline-flex items-center gap-2 bg-purple-900/80 backdrop-blur-sm text-purple-200 px-6 py-3 rounded-full border border-purple-400/30 mb-8 shadow-xl">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Now in Private Alpha - Invite Only</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
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

          <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed">
            Nemurium empowers anyone to build and monetize interactive 3D realms in mixed reality — <span className="text-cyan-400 font-semibold">no code, no limits</span>.
          </p>

          <div className="flex items-center justify-center gap-2 text-lg text-amber-300 mb-12 font-medium">
            <span className="text-2xl">🧠</span>
            <span>You don't just build a world — you build the next internet.</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a href="/world-builder">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                🌍 Start Building Worlds
              </button>
            </a>
            <a href="/ar">
              <button className="px-8 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-600 hover:border-cyan-400 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                📱 Try AR Demo
              </button>
            </a>
            <a href="/affiliate">
              <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                💰 Earn Money
              </button>
            </a>
          </div>

          {/* Quick Tools Access */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">⚡ Quick Access Tools & AI Copilot</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <a href="/tools/ai-copilot" className="bg-blue-600 rounded-xl p-4 text-center hover:bg-blue-700 transition-colors">
                <div className="text-2xl mb-2">🤖</div>
                <div className="text-white font-semibold text-sm">AI Copilot</div>
              </a>
              <a href="/tools" className="bg-red-600 rounded-xl p-4 text-center hover:bg-red-700 transition-colors">
                <div className="text-2xl mb-2">🛠️</div>
                <div className="text-white font-semibold text-sm">All Tools</div>
              </a>
              <a href="/asset-library" className="bg-green-600 rounded-xl p-4 text-center hover:bg-green-700 transition-colors">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-white font-semibold text-sm">Assets</div>
              </a>
              <a href="/dashboard" className="bg-purple-600 rounded-xl p-4 text-center hover:bg-purple-700 transition-colors">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-white font-semibold text-sm">Dashboard</div>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">🎯 Full Menu</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto text-sm">
              <a href="/world-builder" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">🌍 World Builder</a>
              <a href="/tools/ai-copilot" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">🤖 AI Copilot</a>
              <a href="/tools/ai-enhancer" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">✨ AI Enhancer</a>
              <a href="/tools/4d-templates" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">🎭 4D Templates</a>
              <a href="/tools/unreal-renderer" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">🎮 Unreal Renderer</a>
              <a href="/tools/free-assets" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">📦 Free Assets</a>
              <a href="/asset-library" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">📚 Asset Library</a>
              <a href="/ar" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">📱 AR Experience</a>
              <a href="/dashboard" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">📊 Dashboard</a>
              <a href="/affiliate" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">💰 Affiliate Program</a>
              <a href="/marketplace" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">🏪 Marketplace</a>
              <a href="/trophies" className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-700/50 transition-colors">🏆 Trophies</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}