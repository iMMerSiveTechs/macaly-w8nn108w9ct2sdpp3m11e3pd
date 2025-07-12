'use client';
import { useState, useEffect } from 'react';
import { MapPin, Users, Eye, Play, Share2, Settings, Plus, Search, Filter, Globe } from 'lucide-react';

export default function RealmMapPage() {
  const [selectedRealm, setSelectedRealm] = useState<any>(null);
  const [viewMode, setViewMode] = useState('network'); // 'network' | 'grid'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const realms = [
    {
      id: 1,
      name: 'Cyberpunk Nexus',
      creator: 'NeonArchitect',
      category: 'sci-fi',
      visitors: 2847,
      connected: 5,
      description: 'A sprawling cyberpunk city with neon-lit skyscrapers and flying vehicles.',
      status: 'online',
      position: { x: 300, y: 200 },
      connections: [2, 3],
      thumbnail: '🌃'
    },
    {
      id: 2,
      name: 'Enchanted Forest',
      creator: 'NatureWeaver',
      category: 'fantasy',
      visitors: 1923,
      connected: 3,
      description: 'A magical forest realm filled with glowing trees and mystical creatures.',
      status: 'online',
      position: { x: 150, y: 300 },
      connections: [1, 4],
      thumbnail: '🌲'
    },
    {
      id: 3,
      name: 'Space Station Alpha',
      creator: 'CosmicBuilder',
      category: 'sci-fi',
      visitors: 3421,
      connected: 4,
      description: 'An advanced space station orbiting a distant planet.',
      status: 'online',
      position: { x: 450, y: 150 },
      connections: [1, 5],
      thumbnail: '🚀'
    },
    {
      id: 4,
      name: 'Underwater Palace',
      creator: 'AquaDesigner',
      category: 'fantasy',
      visitors: 1567,
      connected: 2,
      description: 'A magnificent underwater palace with coral gardens.',
      status: 'online',
      position: { x: 100, y: 450 },
      connections: [2],
      thumbnail: '🏰'
    },
    {
      id: 5,
      name: 'Desert Oasis',
      creator: 'SandSculptor',
      category: 'adventure',
      visitors: 892,
      connected: 1,
      description: 'A peaceful oasis in an endless desert with ancient ruins.',
      status: 'maintenance',
      position: { x: 600, y: 300 },
      connections: [3],
      thumbnail: '🏜️'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Realms', count: 5 },
    { id: 'sci-fi', name: 'Sci-Fi', count: 2 },
    { id: 'fantasy', name: 'Fantasy', count: 2 },
    { id: 'adventure', name: 'Adventure', count: 1 }
  ];

  const filteredRealms = realms.filter(realm => {
    const matchesSearch = realm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         realm.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || realm.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRealmClick = (realm: any) => {
    setSelectedRealm(realm);
  };

  const handleEnterRealm = (realmId: number) => {
    // Navigate to world builder with the selected realm
    window.location.href = `/world-builder?realm=${realmId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-purple-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                🗺️ Realm Network
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex bg-black/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('network')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === 'network' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Network View
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === 'grid' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Grid View
                </button>
              </div>
              
              <button className="bg-green-600/80 hover:bg-green-600 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Realm
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Realms
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search realms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center justify-between ${
                      filterCategory === category.id
                        ? 'bg-purple-600/30 border border-purple-500/50'
                        : 'bg-black/20 hover:bg-black/30 border border-transparent'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-400">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Network Stats */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">📊 Network Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Realms</span>
                  <span className="font-bold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Visitors</span>
                  <span className="font-bold text-green-400">10,650</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connections</span>
                  <span className="font-bold">15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === 'network' ? (
              /* Network View */
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 h-[600px] relative overflow-hidden">
                <h2 className="text-xl font-bold mb-4">🌐 Connected Realm Network</h2>
                
                {/* Network Canvas */}
                <div className="relative w-full h-full bg-black/20 rounded-lg overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full">
                    {/* Connections */}
                    {realms.map(realm => 
                      realm.connections.map(connectionId => {
                        const connectedRealm = realms.find(r => r.id === connectionId);
                        if (!connectedRealm) return null;
                        
                        return (
                          <line
                            key={`${realm.id}-${connectionId}`}
                            x1={realm.position.x}
                            y1={realm.position.y}
                            x2={connectedRealm.position.x}
                            y2={connectedRealm.position.y}
                            stroke="rgba(168, 85, 247, 0.4)"
                            strokeWidth="2"
                            className="animate-pulse"
                          />
                        );
                      })
                    )}
                  </svg>

                  {/* Realm Nodes */}
                  {filteredRealms.map(realm => (
                    <div
                      key={realm.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${
                        realm.status === 'online' ? 'animate-pulse' : 'opacity-75'
                      }`}
                      style={{ 
                        left: `${(realm.position.x / 700) * 100}%`, 
                        top: `${(realm.position.y / 500) * 100}%` 
                      }}
                      onClick={() => handleRealmClick(realm)}
                    >
                      {/* Node */}
                      <div className={`w-16 h-16 rounded-full border-4 ${
                        realm.status === 'online' 
                          ? 'bg-purple-600/20 border-purple-400' 
                          : 'bg-gray-600/20 border-gray-500'
                      } flex items-center justify-center text-2xl backdrop-blur-sm group-hover:scale-110 transition-transform`}>
                        {realm.thumbnail}
                      </div>
                      
                      {/* Status Indicator */}
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                        realm.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                      }`}></div>
                      
                      {/* Label */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                          {realm.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Grid View */
              <div className="space-y-6">
                <h2 className="text-xl font-bold">
                  {filteredRealms.length} Realms Found
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRealms.map(realm => (
                    <div
                      key={realm.id}
                      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
                      onClick={() => handleRealmClick(realm)}
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform">
                        {realm.thumbnail}
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">
                            {realm.name}
                          </h3>
                          <p className="text-sm text-gray-400">by {realm.creator}</p>
                        </div>

                        <p className="text-sm text-gray-300 line-clamp-2">
                          {realm.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {realm.visitors} visitors
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {realm.connected} connections
                          </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEnterRealm(realm.id);
                            }}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg text-sm font-medium transition"
                          >
                            Enter Realm
                          </button>
                          <button className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Realm Details Modal */}
      {selectedRealm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedRealm.name}</h2>
                  <p className="text-gray-400">by {selectedRealm.creator}</p>
                </div>
                <button
                  onClick={() => setSelectedRealm(null)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  ✕
                </button>
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-6xl mb-4">
                {selectedRealm.thumbnail}
              </div>

              <p className="text-gray-300 mb-4">{selectedRealm.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-400 text-sm">Visitors:</span>
                  <p className="font-bold text-lg">{selectedRealm.visitors}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Connections:</span>
                  <p className="font-bold text-lg">{selectedRealm.connected}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEnterRealm(selectedRealm.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Enter Realm
                </button>
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}