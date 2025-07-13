'use client';
import { useState, useEffect } from 'react';
import { Map, Navigation, Search, Filter, Zap, Users, Eye, Star, Globe, Compass } from 'lucide-react';

interface Realm {
  id: string;
  name: string;
  creator: string;
  position: { x: number; y: number };
  category: string;
  visitors: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  thumbnail: string;
  description: string;
  tags: string[];
  isOnline: boolean;
  connectedRealms: string[];
  lastActive: string;
}

interface Connection {
  from: string;
  to: string;
  type: 'portal' | 'bridge' | 'tunnel' | 'teleport';
  bidirectional: boolean;
}

export default function RealmMapPage() {
  const [realms, setRealms] = useState<Realm[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [mapCenter, setMapCenter] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const categories = [
    { id: 'all', name: 'All Realms', color: '#6366f1' },
    { id: 'adventure', name: 'Adventure', color: '#10b981' },
    { id: 'social', name: 'Social', color: '#f59e0b' },
    { id: 'creative', name: 'Creative', color: '#8b5cf6' },
    { id: 'educational', name: 'Educational', color: '#06b6d4' },
    { id: 'gaming', name: 'Gaming', color: '#ef4444' },
    { id: 'meditation', name: 'Wellness', color: '#84cc16' }
  ];

  useEffect(() => {
    // Mock realm data
    const mockRealms: Realm[] = [
      {
        id: '1',
        name: 'Crystal Caverns',
        creator: 'CrystalMaster',
        position: { x: 100, y: 150 },
        category: 'adventure',
        visitors: 2340,
        rating: 4.8,
        difficulty: 'Medium',
        thumbnail: '/api/placeholder/200/150',
        description: 'A mystical underground realm filled with glowing crystals and hidden treasures.',
        tags: ['crystals', 'underground', 'treasure', 'magic'],
        isOnline: true,
        connectedRealms: ['2', '5'],
        lastActive: '2 minutes ago'
      },
      {
        id: '2',
        name: 'Sky Gardens',
        creator: 'FloatingBuilder',
        position: { x: 300, y: 100 },
        category: 'creative',
        visitors: 1890,
        rating: 4.9,
        difficulty: 'Easy',
        thumbnail: '/api/placeholder/200/150',
        description: 'Peaceful floating gardens with interactive art installations and meditation spots.',
        tags: ['peaceful', 'art', 'meditation', 'floating'],
        isOnline: true,
        connectedRealms: ['1', '3'],
        lastActive: '5 minutes ago'
      },
      {
        id: '3',
        name: 'Neon Battleground',
        creator: 'CyberWarrior',
        position: { x: 500, y: 200 },
        category: 'gaming',
        visitors: 3450,
        rating: 4.6,
        difficulty: 'Hard',
        thumbnail: '/api/placeholder/200/150',
        description: 'High-energy cyberpunk arena for competitive battles and tournaments.',
        tags: ['cyberpunk', 'battle', 'competitive', 'neon'],
        isOnline: true,
        connectedRealms: ['2', '4'],
        lastActive: '1 minute ago'
      },
      {
        id: '4',
        name: 'Learning Lab',
        creator: 'EduTech',
        position: { x: 200, y: 300 },
        category: 'educational',
        visitors: 980,
        rating: 4.7,
        difficulty: 'Easy',
        thumbnail: '/api/placeholder/200/150',
        description: 'Interactive science laboratory with experiments and educational content.',
        tags: ['science', 'education', 'interactive', 'lab'],
        isOnline: false,
        connectedRealms: ['3', '5'],
        lastActive: '2 hours ago'
      },
      {
        id: '5',
        name: 'Social Hub Central',
        creator: 'CommunityBuilder',
        position: { x: 400, y: 350 },
        category: 'social',
        visitors: 5670,
        rating: 4.5,
        difficulty: 'Easy',
        thumbnail: '/api/placeholder/200/150',
        description: 'Main social gathering space with chat rooms, events, and community activities.',
        tags: ['social', 'community', 'events', 'chat'],
        isOnline: true,
        connectedRealms: ['1', '4', '6'],
        lastActive: 'Live now'
      },
      {
        id: '6',
        name: 'Zen Sanctuary',
        creator: 'MindfulMaker',
        position: { x: 150, y: 450 },
        category: 'meditation',
        visitors: 1234,
        rating: 4.9,
        difficulty: 'Easy',
        thumbnail: '/api/placeholder/200/150',
        description: 'Tranquil meditation space with guided sessions and calming environments.',
        tags: ['zen', 'meditation', 'peaceful', 'mindfulness'],
        isOnline: true,
        connectedRealms: ['5'],
        lastActive: '10 minutes ago'
      }
    ];

    const mockConnections: Connection[] = [
      { from: '1', to: '2', type: 'portal', bidirectional: true },
      { from: '1', to: '5', type: 'bridge', bidirectional: true },
      { from: '2', to: '3', type: 'teleport', bidirectional: false },
      { from: '3', to: '4', type: 'tunnel', bidirectional: true },
      { from: '4', to: '5', type: 'portal', bidirectional: true },
      { from: '5', to: '6', type: 'bridge', bidirectional: true }
    ];

    setRealms(mockRealms);
    setConnections(mockConnections);
  }, []);

  const filteredRealms = realms.filter(realm => {
    const matchesSearch = realm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         realm.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || realm.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    return categories.find(c => c.id === category)?.color || '#6366f1';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-orange-400 bg-orange-400/20';
      case 'Expert': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const visitRealm = (realm: Realm) => {
    // Navigate to the realm
    window.location.href = `/world-builder?realm=${realm.id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-blue-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🗺️ Realm Connection Map
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode(viewMode === '2d' ? '3d' : '2d')}
                className="flex items-center gap-2 bg-gray-600/80 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <Globe className="h-4 w-4" />
                {viewMode.toUpperCase()} View
              </button>
              <button 
                onClick={() => window.location.href = '/world-builder'}
                className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
              >
                <Zap className="h-4 w-4" />
                Create Realm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-black/40 backdrop-blur-md border-r border-white/10 overflow-y-auto">
          {/* Search and Filters */}
          <div className="p-4 border-b border-white/10">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search realms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-400">Categories</h3>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-2 rounded-lg transition flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600/50 text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Realm List */}
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Map className="h-5 w-5" />
              Active Realms ({filteredRealms.length})
            </h3>
            
            <div className="space-y-3">
              {filteredRealms.map((realm) => (
                <div
                  key={realm.id}
                  onClick={() => setSelectedRealm(realm)}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    selectedRealm?.id === realm.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/10 hover:border-white/30 bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{realm.name}</h4>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${realm.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span className="text-xs text-gray-400">{realm.isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2">by {realm.creator}</div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{realm.visitors}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{realm.rating}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(realm.difficulty)}`}>
                      {realm.difficulty}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-xs text-gray-500">Last active: {realm.lastActive}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Map Canvas */}
          <div className="w-full h-full relative bg-gradient-to-br from-gray-900/50 to-blue-900/30">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 600 500"
              style={{ transform: `scale(${zoom}) translate(${mapCenter.x}px, ${mapCenter.y}px)` }}
            >
              {/* Render connections */}
              {connections.map((connection, index) => {
                const fromRealm = realms.find(r => r.id === connection.from);
                const toRealm = realms.find(r => r.id === connection.to);
                
                if (!fromRealm || !toRealm) return null;
                
                return (
                  <g key={index}>
                    <line
                      x1={fromRealm.position.x}
                      y1={fromRealm.position.y}
                      x2={toRealm.position.x}
                      y2={toRealm.position.y}
                      stroke="rgba(99, 102, 241, 0.5)"
                      strokeWidth="2"
                      strokeDasharray={connection.type === 'teleport' ? '5,5' : ''}
                    />
                    {/* Connection label */}
                    <text
                      x={(fromRealm.position.x + toRealm.position.x) / 2}
                      y={(fromRealm.position.y + toRealm.position.y) / 2}
                      fill="rgba(255, 255, 255, 0.6)"
                      fontSize="10"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {connection.type}
                    </text>
                  </g>
                );
              })}
              
              {/* Render realms */}
              {filteredRealms.map((realm) => (
                <g key={realm.id}>
                  <circle
                    cx={realm.position.x}
                    cy={realm.position.y}
                    r="20"
                    fill={getCategoryColor(realm.category)}
                    stroke={selectedRealm?.id === realm.id ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'}
                    strokeWidth={selectedRealm?.id === realm.id ? '3' : '1'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedRealm(realm)}
                  />
                  
                  {/* Online status indicator */}
                  {realm.isOnline && (
                    <circle
                      cx={realm.position.x + 15}
                      cy={realm.position.y - 15}
                      r="4"
                      fill="#10b981"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Realm name */}
                  <text
                    x={realm.position.x}
                    y={realm.position.y + 35}
                    fill="white"
                    fontSize="12"
                    textAnchor="middle"
                    className="pointer-events-none font-medium"
                  >
                    {realm.name}
                  </text>
                  
                  {/* Visitor count */}
                  <text
                    x={realm.position.x}
                    y={realm.position.y + 48}
                    fill="rgba(255, 255, 255, 0.6)"
                    fontSize="10"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {realm.visitors} visitors
                  </text>
                </g>
              ))}
            </svg>
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => setZoom(Math.min(zoom + 0.2, 3))}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-2 rounded transition"
              >
                +
              </button>
              <button
                onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-2 rounded transition"
              >
                -
              </button>
              <button
                onClick={() => { setZoom(1); setMapCenter({ x: 0, y: 0 }); }}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-2 rounded transition"
              >
                <Compass className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Realm Details Panel */}
        {selectedRealm && (
          <div className="w-80 bg-black/40 backdrop-blur-md border-l border-white/10 overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedRealm.name}</h3>
                <button
                  onClick={() => setSelectedRealm(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-4xl opacity-50">
                    {selectedRealm.category === 'adventure' && '⚔️'}
                    {selectedRealm.category === 'social' && '👥'}
                    {selectedRealm.category === 'creative' && '🎨'}
                    {selectedRealm.category === 'educational' && '🎓'}
                    {selectedRealm.category === 'gaming' && '🎮'}
                    {selectedRealm.category === 'meditation' && '🧘'}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-400 text-sm">{selectedRealm.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Creator</div>
                    <div className="font-medium">{selectedRealm.creator}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Category</div>
                    <div className="font-medium capitalize">{selectedRealm.category}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Visitors</div>
                    <div className="font-medium">{selectedRealm.visitors.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Rating</div>
                    <div className="font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {selectedRealm.rating}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm mb-2">Tags</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedRealm.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white/10 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm mb-2">Connected Realms</div>
                  <div className="space-y-1">
                    {selectedRealm.connectedRealms.map((connectedId) => {
                      const connectedRealm = realms.find(r => r.id === connectedId);
                      return connectedRealm ? (
                        <div
                          key={connectedId}
                          onClick={() => setSelectedRealm(connectedRealm)}
                          className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                        >
                          → {connectedRealm.name}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => visitRealm(selectedRealm)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Visit Realm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}