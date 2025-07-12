"use client"

import { useState } from 'react'
import { MasterMenu } from '@/components/master-menu'
import { motion } from 'framer-motion'
import { Globe, Link, Users, Zap, MapPin, Eye } from 'lucide-react'

export default function RealmMap() {
  const [selectedRealm, setSelectedRealm] = useState(null)
  
  const realms = [
    { id: 1, name: 'Neon Citadel', x: 300, y: 200, connections: [2, 3], users: 42, type: 'cyberpunk' },
    { id: 2, name: 'Crystal Caverns', x: 150, y: 350, connections: [1, 4], users: 28, type: 'fantasy' },
    { id: 3, name: 'Sky Harbor', x: 450, y: 150, connections: [1, 5], users: 67, type: 'sci-fi' },
    { id: 4, name: 'Ancient Grove', x: 100, y: 500, connections: [2], users: 15, type: 'nature' },
    { id: 5, name: 'Void Station', x: 600, y: 250, connections: [3], users: 91, type: 'space' }
  ]

  const getRealmColor = (type) => {
    const colors = {
      cyberpunk: '#e879f9',
      fantasy: '#10b981',
      'sci-fi': '#3b82f6',
      nature: '#22c55e',
      space: '#8b5cf6'
    }
    return colors[type] || '#6b7280'
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
              Realm Network
            </h1>
            <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto">
              Explore the interconnected universe of immersive worlds
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Realm List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-panel p-6">
                <h3 className="text-xl font-semibold mb-4">Active Realms</h3>
                <div className="space-y-3">
                  {realms.map((realm) => (
                    <div
                      key={realm.id}
                      onClick={() => setSelectedRealm(realm)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedRealm?.id === realm.id
                          ? 'bg-cosmic-purple'
                          : 'bg-cosmic-white/5 hover:bg-cosmic-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{realm.name}</h4>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getRealmColor(realm.type) }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-cosmic-white/70">
                        <Users className="h-4 w-4" />
                        {realm.users} users
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Network Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Network Topology</h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all">
                      <Eye className="h-4 w-4" />
                      3D View
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all">
                      <Link className="h-4 w-4" />
                      Create Portal
                    </button>
                  </div>
                </div>
                
                <div className="relative h-96 bg-cosmic-space/50 rounded-lg border border-cosmic-white/20 overflow-hidden">
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {realms.map((realm) =>
                      realm.connections.map((connectionId) => {
                        const target = realms.find(r => r.id === connectionId)
                        if (!target) return null
                        
                        return (
                          <line
                            key={`${realm.id}-${connectionId}`}
                            x1={realm.x}
                            y1={realm.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                            className="animate-pulse"
                          />
                        )
                      })
                    )}
                  </svg>

                  {/* Realm Nodes */}
                  {realms.map((realm) => (
                    <div
                      key={realm.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ left: realm.x, top: realm.y }}
                      onClick={() => setSelectedRealm(realm)}
                    >
                      <div
                        className="w-16 h-16 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-all relative"
                        style={{ backgroundColor: getRealmColor(realm.type) }}
                      >
                        {/* Pulsing effect */}
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-20"
                          style={{ backgroundColor: getRealmColor(realm.type) }}
                        />
                        
                        {/* Center icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        
                        {/* User count badge */}
                        <div className="absolute -top-2 -right-2 bg-cosmic-purple text-xs px-2 py-1 rounded-full">
                          {realm.users}
                        </div>
                      </div>
                      
                      {/* Realm name */}
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-sm font-medium whitespace-nowrap">
                        {realm.name}
                      </div>
                    </div>
                  ))}

                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-10">
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

          {/* Selected Realm Details */}
          {selectedRealm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <div className="glass-panel p-6">
                <h3 className="text-2xl font-bold mb-4">{selectedRealm.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-cosmic-cyan" />
                    <div>
                      <p className="text-sm text-cosmic-white/70">Active Users</p>
                      <p className="text-xl font-bold">{selectedRealm.users}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-cosmic-purple" />
                    <div>
                      <p className="text-sm text-cosmic-white/70">Connections</p>
                      <p className="text-xl font-bold">{selectedRealm.connections.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-cosmic-pink" />
                    <div>
                      <p className="text-sm text-cosmic-white/70">Type</p>
                      <p className="text-xl font-bold capitalize">{selectedRealm.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}