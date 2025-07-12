"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  Zap, 
  Users, 
  Eye, 
  Plus, 
  Link,
  Settings,
  Play,
  Pause,
  RotateCw,
  Map,
  Network,
  Sparkles,
  Crown,
  Shield,
  Star
} from 'lucide-react'

interface RealmNode {
  id: string
  name: string
  type: 'world' | 'hub' | 'portal' | 'collaborative'
  position: { x: number; y: number; z: number }
  size: number
  color: string
  gradient: string
  preview: string
  status: 'active' | 'building' | 'private' | 'archived'
  users: number
  maxUsers: number
  creator: string
  description: string
  tags: string[]
  connections: string[]
}

interface Connection {
  id: string
  from: string
  to: string
  type: 'portal' | 'bridge' | 'gateway'
  bidirectional: boolean
  active: boolean
  traffic: number
}

export function RealmConnectionMap() {
  const [selectedRealm, setSelectedRealm] = useState<RealmNode | null>(null)
  const [viewMode, setViewMode] = useState<'universe' | 'network' | 'collaborative'>('universe')
  const [isAnimating, setIsAnimating] = useState(true)
  const [showConnections, setShowConnections] = useState(true)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'building' | 'private'>('all')
  const mapRef = useRef<HTMLDivElement>(null)

  const realms: RealmNode[] = [
    {
      id: 'realm-1',
      name: 'Nemurium Central Hub',
      type: 'hub',
      position: { x: 0, y: 0, z: 0 },
      size: 120,
      color: '#7c3aed',
      gradient: 'from-purple-500 to-pink-500',
      preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop',
      status: 'active',
      users: 1247,
      maxUsers: 5000,
      creator: 'Nemurium Labs',
      description: 'The central nexus connecting all realms in the Nemurium metaverse.',
      tags: ['hub', 'social', 'commerce'],
      connections: ['realm-2', 'realm-3', 'realm-4', 'realm-5']
    },
    {
      id: 'realm-2',
      name: 'Crystal Caverns',
      type: 'world',
      position: { x: 300, y: -150, z: 100 },
      size: 80,
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-500',
      preview: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=300&fit=crop',
      status: 'active',
      users: 234,
      maxUsers: 500,
      creator: 'CrystalMiner',
      description: 'Explore ancient crystal formations and underground mysteries.',
      tags: ['adventure', 'mining', 'exploration'],
      connections: ['realm-1', 'realm-3']
    },
    {
      id: 'realm-3',
      name: 'Floating Gardens',
      type: 'world',
      position: { x: -250, y: 200, z: -50 },
      size: 90,
      color: '#10b981',
      gradient: 'from-green-500 to-emerald-500',
      preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
      status: 'active',
      users: 89,
      maxUsers: 200,
      creator: 'GreenThumb',
      description: 'Serene floating islands with magical botanical gardens.',
      tags: ['peaceful', 'nature', 'meditation'],
      connections: ['realm-1', 'realm-2', 'realm-4']
    },
    {
      id: 'realm-4',
      name: 'Neon Metropolis',
      type: 'world',
      position: { x: 150, y: 250, z: -200 },
      size: 100,
      color: '#f59e0b',
      gradient: 'from-amber-500 to-orange-500',
      preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop',
      status: 'building',
      users: 45,
      maxUsers: 1000,
      creator: 'CyberArchitect',
      description: 'Futuristic cyberpunk city with neon-lit skyscrapers.',
      tags: ['cyberpunk', 'social', 'nightlife'],
      connections: ['realm-1', 'realm-3', 'realm-5']
    },
    {
      id: 'realm-5',
      name: 'Collaborative Studio',
      type: 'collaborative',
      position: { x: -200, y: -100, z: 150 },
      size: 70,
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-500',
      preview: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=300&fit=crop',
      status: 'active',
      users: 12,
      maxUsers: 50,
      creator: 'BuilderCollective',
      description: 'Creative workspace for collaborative world building.',
      tags: ['creative', 'collaborative', 'tools'],
      connections: ['realm-1', 'realm-4']
    }
  ]

  const connections: Connection[] = [
    { id: 'conn-1', from: 'realm-1', to: 'realm-2', type: 'portal', bidirectional: true, active: true, traffic: 85 },
    { id: 'conn-2', from: 'realm-1', to: 'realm-3', type: 'portal', bidirectional: true, active: true, traffic: 67 },
    { id: 'conn-3', from: 'realm-1', to: 'realm-4', type: 'bridge', bidirectional: true, active: true, traffic: 34 },
    { id: 'conn-4', from: 'realm-1', to: 'realm-5', type: 'gateway', bidirectional: true, active: true, traffic: 23 },
    { id: 'conn-5', from: 'realm-2', to: 'realm-3', type: 'portal', bidirectional: false, active: true, traffic: 12 },
    { id: 'conn-6', from: 'realm-3', to: 'realm-4', type: 'bridge', bidirectional: true, active: false, traffic: 0 },
    { id: 'conn-7', from: 'realm-4', to: 'realm-5', type: 'gateway', bidirectional: true, active: true, traffic: 8 }
  ]

  const filteredRealms = realms.filter(realm => 
    filterStatus === 'all' || realm.status === filterStatus
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Star className="h-3 w-3 text-green-400" />
      case 'building': return <Settings className="h-3 w-3 text-amber-400" />
      case 'private': return <Shield className="h-3 w-3 text-blue-400" />
      case 'archived': return <Crown className="h-3 w-3 text-gray-400" />
      default: return null
    }
  }

  const getConnectionPath = (from: RealmNode, to: RealmNode) => {
    const midX = (from.position.x + to.position.x) / 2
    const midY = (from.position.y + to.position.y) / 2
    
    return `M${from.position.x + 400} ${from.position.y + 300} 
            Q${midX + 400} ${midY + 300 - 50} 
            ${to.position.x + 400} ${to.position.y + 300}`
  }

  return (
    <div className="h-screen bg-cosmic-space flex overflow-hidden">
      {/* Side Panel */}
      <div className="w-80 bg-cosmic-space/90 border-r border-cosmic-white/10 flex flex-col">
        {/* Panel Header */}
        <div className="p-6 border-b border-cosmic-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cosmic-purple to-pink-500 rounded-lg flex items-center justify-center">
              <Network className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-cosmic-white font-bold text-lg">Realm Network</h2>
              <p className="text-cosmic-white/60 text-sm">Universe Overview</p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-1 p-1 bg-cosmic-white/5 rounded-lg">
            <button
              onClick={() => setViewMode('universe')}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'universe' 
                  ? 'bg-cosmic-purple text-white' 
                  : 'text-cosmic-white/70 hover:text-cosmic-white'
              }`}
            >
              Universe
            </button>
            <button
              onClick={() => setViewMode('network')}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'network' 
                  ? 'bg-cosmic-purple text-white' 
                  : 'text-cosmic-white/70 hover:text-cosmic-white'
              }`}
            >
              Network
            </button>
            <button
              onClick={() => setViewMode('collaborative')}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'collaborative' 
                  ? 'bg-cosmic-purple text-white' 
                  : 'text-cosmic-white/70 hover:text-cosmic-white'
              }`}
            >
              Collab
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-cosmic-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className={`p-2 rounded-lg transition-colors ${
                  isAnimating ? 'bg-cosmic-purple/20 text-cosmic-purple' : 'bg-cosmic-white/10 text-cosmic-white'
                }`}
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setShowConnections(!showConnections)}
                className={`p-2 rounded-lg transition-colors ${
                  showConnections ? 'bg-cosmic-purple/20 text-cosmic-purple' : 'bg-cosmic-white/10 text-cosmic-white'
                }`}
              >
                <Link className="h-4 w-4" />
              </button>
            </div>
            <button className="p-2 rounded-lg bg-cosmic-white/10 text-cosmic-white hover:bg-cosmic-white/20 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Filter */}
          <div className="space-y-2">
            <label className="block text-cosmic-white/80 text-sm font-medium">Filter Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full p-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white text-sm"
            >
              <option value="all">All Realms</option>
              <option value="active">Active</option>
              <option value="building">Building</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        {/* Realm List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredRealms.map(realm => (
            <motion.div
              key={realm.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedRealm(realm)}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedRealm?.id === realm.id
                  ? 'bg-cosmic-purple/20 border-2 border-cosmic-purple/30'
                  : 'bg-cosmic-white/5 border border-cosmic-white/10 hover:bg-cosmic-white/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${realm.preview})` }}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${realm.gradient} opacity-70 rounded-lg`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-cosmic-white font-semibold text-sm truncate">{realm.name}</h3>
                    {getStatusIcon(realm.status)}
                  </div>
                  <p className="text-cosmic-white/60 text-xs mb-2 line-clamp-2">{realm.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-cosmic-white/60" />
                      <span className="text-cosmic-white/60 text-xs">{realm.users}/{realm.maxUsers}</span>
                    </div>
                    <div className="flex gap-1">
                      {realm.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-cosmic-white/10 rounded text-xs text-cosmic-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Map View */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-cosmic-white/10 bg-cosmic-space/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-cosmic-white font-semibold text-lg">Universe Map</h2>
              <div className="flex items-center gap-2 text-cosmic-white/60 text-sm">
                <Globe className="h-4 w-4" />
                <span>{filteredRealms.length} realms</span>
                <Zap className="h-4 w-4 ml-4" />
                <span>{connections.filter(c => c.active).length} active connections</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-cosmic-white/10 text-cosmic-white hover:bg-cosmic-white/20 transition-colors">
                <Map className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-cosmic-white/10 text-cosmic-white hover:bg-cosmic-white/20 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Universe View */}
        <div 
          ref={mapRef}
          className="flex-1 bg-gradient-to-br from-cosmic-space via-cosmic-space/80 to-cosmic-purple/10 relative overflow-hidden"
        >
          {/* Starfield Background */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          {/* SVG for Connections */}
          {showConnections && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {connections.map(conn => {
                const fromRealm = realms.find(r => r.id === conn.from)
                const toRealm = realms.find(r => r.id === conn.to)
                
                if (!fromRealm || !toRealm) return null
                
                return (
                  <motion.path
                    key={conn.id}
                    d={getConnectionPath(fromRealm, toRealm)}
                    stroke="url(#connectionGradient)"
                    strokeWidth={conn.active ? 2 : 1}
                    fill="none"
                    opacity={conn.active ? 0.8 : 0.3}
                    strokeDasharray={conn.active ? "0" : "5,5"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                )
              })}
            </svg>
          )}

          {/* Realm Nodes */}
          {filteredRealms.map(realm => (
            <motion.div
              key={realm.id}
              className="absolute cursor-pointer"
              style={{
                left: realm.position.x + 400,
                top: realm.position.y + 300,
                width: realm.size,
                height: realm.size,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedRealm(realm)}
              whileHover={{ scale: 1.1 }}
              animate={isAnimating ? {
                rotate: [0, 360],
                scale: [1, 1.05, 1]
              } : {}}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Realm Orb */}
              <div 
                className={`w-full h-full rounded-full bg-gradient-to-br ${realm.gradient} relative overflow-hidden border-2 border-white/20 shadow-2xl`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: `url(${realm.preview})` }}
                />
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${realm.gradient} opacity-40 blur-sm`} />
                
                {/* Status Indicator */}
                <div className="absolute top-2 right-2">
                  {getStatusIcon(realm.status)}
                </div>
                
                {/* User Count */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                  <Users className="h-3 w-3 text-white" />
                  <span className="text-white text-xs font-medium">{realm.users}</span>
                </div>
              </div>
              
              {/* Realm Name */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-cosmic-white text-sm font-medium whitespace-nowrap">
                {realm.name}
              </div>
              
              {/* Selection Ring */}
              {selectedRealm?.id === realm.id && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cosmic-purple"
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
          
          {/* Realm Details Panel */}
          <AnimatePresence>
            {selectedRealm && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="absolute top-4 right-4 w-80 bg-cosmic-space/90 backdrop-blur border border-cosmic-white/20 rounded-xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${selectedRealm.preview})` }}
                  >
                    <div className={`w-full h-full bg-gradient-to-br ${selectedRealm.gradient} opacity-70 rounded-lg`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-cosmic-white font-bold text-lg">{selectedRealm.name}</h3>
                      {getStatusIcon(selectedRealm.status)}
                    </div>
                    <p className="text-cosmic-white/60 text-sm">by {selectedRealm.creator}</p>
                  </div>
                </div>
                
                <p className="text-cosmic-white/80 text-sm mb-4">{selectedRealm.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-cosmic-white/60 text-sm">Capacity</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-cosmic-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cosmic-purple to-pink-500 transition-all duration-300"
                          style={{ width: `${(selectedRealm.users / selectedRealm.maxUsers) * 100}%` }}
                        />
                      </div>
                      <span className="text-cosmic-white text-sm">{selectedRealm.users}/{selectedRealm.maxUsers}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-cosmic-white/60 text-sm">Connections</span>
                    <span className="text-cosmic-white text-sm">{selectedRealm.connections.length}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedRealm.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-cosmic-white/10 rounded text-xs text-cosmic-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <button className="flex-1 px-4 py-2 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-lg text-cosmic-purple text-sm font-medium hover:bg-cosmic-purple/30 transition-colors">
                    Visit Realm
                  </button>
                  <button className="px-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white text-sm font-medium hover:bg-cosmic-white/20 transition-colors">
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}