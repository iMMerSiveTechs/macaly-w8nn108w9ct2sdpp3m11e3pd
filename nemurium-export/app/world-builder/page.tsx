"use client"

import { useState } from 'react'
import { MasterMenu } from '@/components/master-menu'
import { motion } from 'framer-motion'
import { Cube, Move3D, Palette, Download, RotateCcw, ZoomIn } from 'lucide-react'

export default function WorldBuilder() {
  const [selectedTool, setSelectedTool] = useState('move')
  const [objects, setObjects] = useState([
    { id: 1, type: 'cube', x: 100, y: 100, color: '#3b82f6' },
    { id: 2, type: 'sphere', x: 200, y: 150, color: '#ef4444' },
    { id: 3, type: 'plane', x: 150, y: 250, color: '#10b981' }
  ])

  const tools = [
    { id: 'move', icon: Move3D, label: 'Move' },
    { id: 'rotate', icon: RotateCcw, label: 'Rotate' },
    { id: 'scale', icon: ZoomIn, label: 'Scale' },
    { id: 'paint', icon: Palette, label: 'Paint' }
  ]

  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white">
      <MasterMenu />
      
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              World Builder
            </h1>
            <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto">
              Create immersive 3D environments with our drag-and-drop builder
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tool Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-panel p-6">
                <h3 className="text-xl font-semibold mb-4">Tools</h3>
                <div className="space-y-2">
                  {tools.map((tool) => {
                    const IconComponent = tool.icon
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setSelectedTool(tool.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          selectedTool === tool.id
                            ? 'bg-cosmic-purple text-white'
                            : 'bg-cosmic-white/5 text-cosmic-white/70 hover:bg-cosmic-white/10'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        {tool.label}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">Objects</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 bg-cosmic-white/5 rounded-lg hover:bg-cosmic-white/10 transition-all">
                      <Cube className="h-5 w-5" />
                      Add Cube
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-cosmic-white/5 rounded-lg hover:bg-cosmic-white/10 transition-all">
                      <div className="h-5 w-5 rounded-full bg-cosmic-cyan" />
                      Add Sphere
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-cosmic-white/5 rounded-lg hover:bg-cosmic-white/10 transition-all">
                      <div className="h-5 w-1 bg-cosmic-pink" />
                      Add Plane
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3D Viewport */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">3D Viewport</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all">
                    <Download className="h-4 w-4" />
                    Export GLB
                  </button>
                </div>
                
                <div className="relative h-96 bg-cosmic-space/50 rounded-lg border border-cosmic-white/20 overflow-hidden">
                  {/* Simulated 3D Objects */}
                  {objects.map((obj) => (
                    <div
                      key={obj.id}
                      className="absolute w-12 h-12 rounded-lg cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: obj.x,
                        top: obj.y,
                        backgroundColor: obj.color
                      }}
                    />
                  ))}
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-cosmic-white/20" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}