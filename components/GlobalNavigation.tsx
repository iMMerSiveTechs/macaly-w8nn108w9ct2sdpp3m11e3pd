'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

export default function GlobalNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/world-builder', label: 'World Builder' },
    { href: '/asset-library', label: 'Asset Library' },
    { href: '/tools', label: 'Tools' },
    { href: '/affiliate', label: 'Earn Money' },
    { href: '/ar', label: 'AR Experience' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nemurium
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* AI Copilot Button */}
              <button
                onClick={() => setIsCopilotOpen(!isCopilotOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">AI Copilot</span>
              </button>

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 bg-gray-700/50 text-white px-4 py-2 rounded-xl hover:bg-gray-600/50 transition-all"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Menu */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Navigation</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all">
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="space-y-3">
                <Link href="/terms" onClick={() => setIsMenuOpen(false)}>
                  <div className="text-gray-400 hover:text-white transition-colors">Terms</div>
                </Link>
                <Link href="/privacy" onClick={() => setIsMenuOpen(false)}>
                  <div className="text-gray-400 hover:text-white transition-colors">Privacy</div>
                </Link>
                <Link href="/support" onClick={() => setIsMenuOpen(false)}>
                  <div className="text-gray-400 hover:text-white transition-colors">Support</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Copilot Panel */}
      <div className={`fixed right-6 top-20 w-80 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 transform transition-all duration-300 z-40 ${
        isCopilotOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-white">AI Copilot</h3>
            </div>
            <button
              onClick={() => setIsCopilotOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-gray-300 text-sm">
                👋 Hi! I'm your AI assistant. I can help you:
              </p>
              <ul className="text-gray-400 text-xs mt-2 space-y-1">
                <li>• Generate 3D objects</li>
                <li>• Suggest world designs</li>
                <li>• Optimize your creations</li>
              </ul>
            </div>

            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-purple-400 focus:outline-none"
            />

            <div className="flex gap-2">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                Generate
              </button>
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}