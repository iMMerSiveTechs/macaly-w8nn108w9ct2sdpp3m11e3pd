"use client"

import { useState, useEffect } from 'react'
import { MasterMenu } from '@/components/master-menu'
import { motion } from 'framer-motion'
import { Camera, Smartphone, Glasses, Wifi, MapPin, Eye, Settings, Record } from 'lucide-react'

export default function AROverlay() {
  const [isARActive, setIsARActive] = useState(false)
  const [deviceType, setDeviceType] = useState('mobile')
  const [arObjects, setArObjects] = useState([])

  const devices = [
    { id: 'mobile', name: 'Mobile Device', icon: Smartphone, desc: 'Use your phone camera' },
    { id: 'glasses', name: 'Smart Glasses', icon: Glasses, desc: 'Meta, RayBan, Snap' },
    { id: 'headset', name: 'VR Headset', icon: Eye, desc: 'Vision Pro, Quest' }
  ]

  const arPresets = [
    { id: 1, name: 'Floating UI Panel', type: 'interface', color: '#3b82f6' },
    { id: 2, name: 'Navigation Arrow', type: 'navigation', color: '#10b981' },
    { id: 3, name: 'Info Hotspot', type: 'information', color: '#f59e0b' },
    { id: 4, name: 'Portal Gateway', type: 'portal', color: '#8b5cf6' },
    { id: 5, name: 'Particle System', type: 'effect', color: '#ef4444' }
  ]

  const addARObject = (preset) => {
    const newObject = {
      id: Date.now(),
      ...preset,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      scale: 1
    }
    setArObjects([...arObjects, newObject])
  }

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
              AR Overlay
            </h1>
            <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto">
              Spatial computing for the next generation of immersive experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Device Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-panel p-6">
                <h3 className="text-xl font-semibold mb-4">Device Type</h3>
                <div className="space-y-3">
                  {devices.map((device) => {
                    const IconComponent = device.icon
                    return (
                      <button
                        key={device.id}
                        onClick={() => setDeviceType(device.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          deviceType === device.id
                            ? 'border-cosmic-purple bg-cosmic-purple/20'
                            : 'border-cosmic-white/20 bg-cosmic-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent className="h-6 w-6" />
                          <h4 className="font-semibold">{device.name}</h4>
                        </div>
                        <p className="text-sm text-cosmic-white/70">{device.desc}</p>
                      </button>
                    )
                  })}
                </div>

                {/* AR Controls */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">AR Controls</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => setIsARActive(!isARActive)}
                      className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
                        isARActive 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-cosmic-purple hover:bg-cosmic-purple/80'
                      }`}
                    >
                      <Camera className="h-5 w-5" />
                      {isARActive ? 'Stop AR' : 'Start AR'}
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                      <Record className="h-5 w-5" />
                      Record Session
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 p-3 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                      <Settings className="h-5 w-5" />
                      Calibrate
                    </button>
                  </div>
                </div>

                {/* AR Objects */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">AR Objects</h4>
                  <div className="space-y-2">
                    {arPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => addARObject(preset)}
                        className="w-full flex items-center gap-3 p-3 bg-cosmic-white/5 hover:bg-cosmic-white/10 rounded-lg transition-all"
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.color }}
                        />
                        <span className="text-sm">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AR Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">AR Preview</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-cosmic-white/70">
                      <Wifi className="h-4 w-4" />
                      Connected
                    </div>
                    <div className="flex items-center gap-2 text-sm text-cosmic-white/70">
                      <MapPin className="h-4 w-4" />
                      Tracking Active
                    </div>
                  </div>
                </div>

                <div className="relative h-96 bg-cosmic-space/50 rounded-lg border border-cosmic-white/20 overflow-hidden">
                  {/* Simulated camera feed background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-cyan/20 opacity-50" />
                  
                  {/* AR Grid overlay */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="grid grid-cols-8 grid-rows-6 h-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="border border-cosmic-white/10" />
                      ))}
                    </div>
                  </div>

                  {/* AR Objects */}
                  {arObjects.map((obj) => (
                    <div
                      key={obj.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: obj.x,
                        top: obj.y,
                        transform: `translate(-50%, -50%) scale(${obj.scale})`
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-white/50 animate-pulse"
                        style={{ backgroundColor: obj.color }}
                      />
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                        {obj.name}
                      </div>
                    </div>
                  ))}

                  {/* AR Status indicators */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      AR Active
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full text-xs">
                      <Eye className="h-3 w-3" />
                      6DOF Tracking
                    </div>
                  </div>

                  {/* Center crosshair */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 border-2 border-white/50 rounded-full">
                      <div className="w-2 h-2 bg-white/80 rounded-full mx-auto mt-2" />
                    </div>
                  </div>

                  {/* Instructions */}
                  {!isARActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-cosmic-white/50 mx-auto mb-4" />
                        <p className="text-lg text-cosmic-white/70">
                          Click "Start AR" to begin spatial computing
                        </p>
                        <p className="text-sm text-cosmic-white/50 mt-2">
                          🕶️ Compatible with Meta RayBan, Apple Vision Pro, and mobile devices
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}