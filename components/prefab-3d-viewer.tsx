'use client';
import { useState, useEffect, useRef } from 'react';
import { Box, Trees, Gem, Home, Zap, Star } from 'lucide-react';

interface Prefab {
  id: string;
  name: string;
  type: string;
  thumbnail?: string;
  description: string;
  tags: string[];
  preview3D?: string; // URL to 3D model
}

const samplePrefabs: Prefab[] = [
  {
    id: 'mystical-tree',
    name: 'Mystical Tree',
    type: 'nature',
    description: 'Ancient tree with glowing leaves',
    tags: ['nature', 'fantasy', 'glowing'],
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop'
  },
  {
    id: 'crystal-formation',
    name: 'Crystal Formation',
    type: 'mineral',
    description: 'Shimmering crystal cluster',
    tags: ['crystal', 'mineral', 'magical'],
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop'
  },
  {
    id: 'portal-gate',
    name: 'Portal Gate',
    type: 'structure',
    description: 'Interdimensional portal gateway',
    tags: ['portal', 'magic', 'teleport'],
    thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=200&h=200&fit=crop'
  },
  {
    id: 'floating-platform',
    name: 'Floating Platform',
    type: 'structure',
    description: 'Hovering stone platform',
    tags: ['platform', 'floating', 'stone'],
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop'
  },
  {
    id: 'energy-orb',
    name: 'Energy Orb',
    type: 'effect',
    description: 'Pulsing energy sphere',
    tags: ['energy', 'orb', 'glowing'],
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=200&h=200&fit=crop'
  },
  {
    id: 'ancient-pillar',
    name: 'Ancient Pillar',
    type: 'structure',
    description: 'Weathered stone pillar with runes',
    tags: ['ancient', 'stone', 'runes'],
    thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c5d2b73b2?w=200&h=200&fit=crop'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'nature': return <Trees className="h-4 w-4" />;
    case 'mineral': return <Gem className="h-4 w-4" />;
    case 'structure': return <Home className="h-4 w-4" />;
    case 'effect': return <Zap className="h-4 w-4" />;
    default: return <Box className="h-4 w-4" />;
  }
};

export default function Prefab3DViewer({ 
  onPrefabSelect,
  selectedCategory = 'all' 
}: { 
  onPrefabSelect?: (prefab: Prefab) => void;
  selectedCategory?: string;
}) {
  const [selectedPrefab, setSelectedPrefab] = useState<Prefab | null>(null);
  const [hoveredPrefab, setHoveredPrefab] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrefabs = samplePrefabs.filter(prefab => {
    const matchesCategory = selectedCategory === 'all' || prefab.type === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      prefab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prefab.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handlePrefabClick = (prefab: Prefab) => {
    setSelectedPrefab(prefab);
    onPrefabSelect?.(prefab);
    
    // Show notification
    if ((window as any).showNotification) {
      (window as any).showNotification({
        type: 'success',
        title: 'Prefab Selected',
        message: `${prefab.name} is ready to place in your world`
      });
    }
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-md rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Star className="h-6 w-6 text-purple-400" />
          3D Asset Library
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-purple-500"
          />
          <div className="flex bg-gray-800 rounded">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm rounded-l ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded-r ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPrefabs.map((prefab) => (
            <div
              key={prefab.id}
              className={`relative group cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedPrefab?.id === prefab.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => handlePrefabClick(prefab)}
              onMouseEnter={() => setHoveredPrefab(prefab.id)}
              onMouseLeave={() => setHoveredPrefab(null)}
            >
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-600 hover:border-purple-500 transition-colors">
                {/* 3D Preview or Thumbnail */}
                <div 
                  className="aspect-square bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${prefab.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Type Icon */}
                  <div className="absolute top-2 left-2 p-1 bg-black/60 rounded text-white">
                    {getTypeIcon(prefab.type)}
                  </div>

                  {/* Hover Preview */}
                  {hoveredPrefab === prefab.id && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Box className="h-8 w-8 mx-auto mb-2 animate-spin" />
                        <p className="text-sm">3D Preview</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h4 className="font-semibold text-white text-sm mb-1">{prefab.name}</h4>
                  <p className="text-gray-400 text-xs mb-2">{prefab.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {prefab.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPrefabs.map((prefab) => (
            <div
              key={prefab.id}
              className={`flex items-center gap-4 p-4 bg-gray-800 rounded-lg border cursor-pointer transition-all hover:bg-gray-700 ${
                selectedPrefab?.id === prefab.id ? 'border-purple-500' : 'border-gray-600'
              }`}
              onClick={() => handlePrefabClick(prefab)}
            >
              <div 
                className="w-16 h-16 bg-cover bg-center rounded border border-gray-600"
                style={{ backgroundImage: `url(${prefab.thumbnail})` }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(prefab.type)}
                  <h4 className="font-semibold text-white">{prefab.name}</h4>
                </div>
                <p className="text-gray-400 text-sm mb-2">{prefab.description}</p>
                <div className="flex flex-wrap gap-1">
                  {prefab.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredPrefabs.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Box className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No assets found matching your criteria</p>
        </div>
      )}
    </div>
  );
}