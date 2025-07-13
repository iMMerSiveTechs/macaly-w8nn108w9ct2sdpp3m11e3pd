"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ToolsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const toolCategories = [
    { id: 'all', label: 'All Tools', emoji: '🛠️' },
    { id: 'ai', label: 'AI Powered', emoji: '🤖' },
    { id: 'creation', label: 'Creation', emoji: '🎨' },
    { id: 'enhancement', label: 'Enhancement', emoji: '✨' },
    { id: 'monetization', label: 'Monetization', emoji: '💰' }
  ]

  const tools = [
    {
      title: "🤖 AI Copilot",
      description: "Intelligent assistant for 3D world creation with AI-powered suggestions and automated workflows",
      href: "/tools/ai-copilot",
      category: "ai",
      status: "Available",
      color: "from-blue-600 to-cyan-600",
      features: ["Smart Chat", "Auto Generation", "Workflow Automation"]
    },
    {
      title: "🎨 AI Enhancer", 
      description: "Enhance your creations with AI magic - improve textures, lighting, and overall quality",
      href: "/tools/ai-enhancer",
      category: "ai",
      status: "Available",
      color: "from-purple-600 to-pink-600",
      features: ["Texture Enhancement", "Auto Lighting", "Quality Optimization"]
    },
    {
      title: "🎭 4D Templates",
      description: "Pre-built immersive templates for rapid world creation and prototyping",
      href: "/tools/4d-templates", 
      category: "creation",
      status: "Available",
      color: "from-green-600 to-emerald-600",
      features: ["Ready Templates", "Customizable", "Instant Deploy"]
    },
    {
      title: "🎮 Unreal Renderer",
      description: "Ultra-realistic rendering engine for photorealistic immersive experiences",
      href: "/tools/unreal-renderer",
      category: "enhancement",
      status: "Beta",
      color: "from-red-600 to-orange-600",
      features: ["Photorealistic", "Real-time", "High Performance"]
    },
    {
      title: "📦 Free Assets",
      description: "Access thousands of free 3D assets, textures, sounds, and animations",
      href: "/tools/free-assets",
      category: "creation",
      status: "Available", 
      color: "from-indigo-600 to-purple-600",
      features: ["10K+ Assets", "Commercial Use", "Regular Updates"]
    },
    {
      title: "∞ Nemura Engine",
      description: "Infinite reality possibilities with quantum-inspired parallel universe generation",
      href: "/nemura",
      category: "ai",
      status: "New",
      color: "from-purple-600 to-pink-600",
      features: ["Infinite Realities", "Consciousness Sync", "Quantum Processing"]
    },
    {
      title: "🎵 Sonarium",
      description: "Advanced audio intelligence platform for immersive 3D sound experiences",
      href: "/sonarium",
      category: "enhancement",
      status: "New",
      color: "from-cyan-600 to-blue-600",
      features: ["3D Spatial Audio", "AI Composition", "Real-time Processing"]
    },
    {
      title: "💰 Revenue Engine",
      description: "Monetize your creations with multiple revenue streams and affiliate programs",
      href: "/affiliate",
      category: "monetization",
      status: "Available",
      color: "from-yellow-600 to-orange-600",
      features: ["Multiple Streams", "Affiliate Program", "Analytics Dashboard"]
    }
  ]

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black text-white">
      {/* Live Site Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-2 px-4 text-sm font-medium shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>🚧 LIVE SITE - Some features still in development | Alpha Testing Phase</span>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-10 w-full z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Nemurium
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">← Back to Home</Link>
              <Link href="/world-builder" className="text-gray-300 hover:text-white transition-colors">World Builder</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Creator Tools Suite
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build, enhance, and monetize immersive 3D experiences. 
              From AI-powered creation tools to advanced rendering engines.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {toolCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <span>{category.emoji}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={tool.href}>
                  <div className={`group bg-gradient-to-br ${tool.color}/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer h-full`}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-cyan-400 transition-all duration-300">
                        {tool.title}
                      </h3>
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        tool.status === 'New' ? 'bg-purple-600 text-white' :
                        tool.status === 'Beta' ? 'bg-orange-600 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {tool.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                          <span className="text-sm text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${tool.color} bg-clip-text text-transparent`}>
                      Launch Tool →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-8">🚀 Coming Soon</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "🧪 Physics Engine", desc: "Advanced physics simulation" },
                { title: "🌐 Multi-user Sync", desc: "Real-time collaboration" },
                { title: "📱 Mobile Studio", desc: "Create on any device" }
              ].map((item) => (
                <div key={item.title} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}