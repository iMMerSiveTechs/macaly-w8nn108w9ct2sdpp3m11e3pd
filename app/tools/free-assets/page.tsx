'use client';
import { useState, useEffect } from 'react';
import { Search, Download, Filter, ExternalLink, Star, Clock, Tag } from 'lucide-react';

export default function FreeAssetsPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Curated free asset sources from major platforms
  const assetSources = [
    {
      id: 'polyhaven',
      name: 'Poly Haven',
      description: 'Ultra-high quality HDRIs, textures, and 3D models',
      url: 'https://polyhaven.com',
      logo: '🌟',
      totalAssets: '15,000+'
    },
    {
      id: 'sketchfab',
      name: 'Sketchfab Free',
      description: 'Community-created 3D models with CC0 license',
      url: 'https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount',
      logo: '🎭',
      totalAssets: '500,000+'
    },
    {
      id: 'freesound',
      name: 'Freesound',
      description: 'High-quality audio samples and sound effects',
      url: 'https://freesound.org',
      logo: '🎵',
      totalAssets: '600,000+'
    },
    {
      id: 'opengameart',
      name: 'OpenGameArt',
      description: 'Game assets including sprites, music, and 3D models',
      url: 'https://opengameart.org',
      logo: '🎮',
      totalAssets: '40,000+'
    },
    {
      id: 'mixamo',
      name: 'Adobe Mixamo',
      description: '3D character animations and rigged models',
      url: 'https://www.mixamo.com',
      logo: '🕺',
      totalAssets: '2,000+'
    },
    {
      id: 'kenney',
      name: 'Kenney Assets',
      description: 'Game development assets in low-poly style',
      url: 'https://kenney.nl/assets',
      logo: '🎯',
      totalAssets: '50,000+'
    }
  ];

  const featuredAssets = [
    {
      id: 'env001',
      name: 'Forest Environment Pack',
      category: 'Environment',
      source: 'Poly Haven',
      description: 'Complete forest scene with trees, rocks, and vegetation',
      downloads: 45230,
      rating: 4.9,
      format: 'GLB, FBX',
      license: 'CC0',
      url: 'https://polyhaven.com/hdris',
      thumbnail: '🌲',
      tags: ['forest', 'nature', 'environment', 'trees']
    },
    {
      id: 'char001',
      name: 'Rigged Character Base',
      category: 'Character',
      source: 'Mixamo',
      description: 'Ready-to-animate humanoid character with full rig',
      downloads: 89200,
      rating: 4.7,
      format: 'FBX, OBJ',
      license: 'Free',
      url: 'https://www.mixamo.com',
      thumbnail: '🧍',
      tags: ['character', 'rigged', 'humanoid', 'animation']
    },
    {
      id: 'mat001',
      name: 'PBR Material Library',
      category: 'Material',
      source: 'Poly Haven',
      description: '50 photorealistic PBR materials with 4K textures',
      downloads: 156000,
      rating: 4.9,
      format: 'PNG, EXR',
      license: 'CC0',
      url: 'https://polyhaven.com/textures',
      thumbnail: '🎨',
      tags: ['PBR', 'materials', 'textures', 'realistic']
    },
    {
      id: 'audio001',
      name: 'Ambient Soundscapes',
      category: 'Audio',
      source: 'Freesound',
      description: 'High-quality ambient audio for immersive environments',
      downloads: 67800,
      rating: 4.6,
      format: 'WAV, OGG',
      license: 'CC0',
      url: 'https://freesound.org',
      thumbnail: '🎼',
      tags: ['ambient', 'soundscape', 'environment', 'loops']
    },
    {
      id: 'fx001',
      name: 'Particle Effects Pack',
      category: 'VFX',
      source: 'OpenGameArt',
      description: 'Fire, smoke, magic, and explosion particle effects',
      downloads: 34500,
      rating: 4.5,
      format: 'PNG, GIF',
      license: 'CC0',
      url: 'https://opengameart.org',
      thumbnail: '✨',
      tags: ['particles', 'effects', 'fire', 'magic']
    },
    {
      id: 'prop001',
      name: 'Low-Poly Props Collection',
      category: 'Props',
      source: 'Kenney',
      description: 'Stylized low-poly props perfect for stylized worlds',
      downloads: 78900,
      rating: 4.8,
      format: 'OBJ, GLB',
      license: 'CC0',
      url: 'https://kenney.nl/assets',
      thumbnail: '📦',
      tags: ['low-poly', 'stylized', 'props', 'game-ready']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Assets', count: featuredAssets.length },
    { id: 'Environment', name: 'Environments', count: 1 },
    { id: 'Character', name: 'Characters', count: 1 },
    { id: 'Material', name: 'Materials', count: 1 },
    { id: 'Audio', name: 'Audio', count: 1 },
    { id: 'VFX', name: 'VFX', count: 1 },
    { id: 'Props', name: 'Props', count: 1 }
  ];

  useEffect(() => {
    setAssets(featuredAssets);
    filterAssets();
  }, [searchTerm, selectedCategory]);

  const filterAssets = () => {
    let filtered = featuredAssets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredAssets(filtered);
  };

  const aggregateAssets = async () => {
    setIsLoading(true);
    
    // Simulate aggregation from multiple sources
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, this would fetch from actual APIs
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-teal-950 to-blue-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/world-builder'}
                className="text-green-400 hover:text-white transition-colors"
              >
                ← Back to World Builder
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                📦 Free Asset Aggregator
              </h1>
            </div>
            <button
              onClick={aggregateAssets}
              disabled={isLoading}
              className="bg-green-600/80 hover:bg-green-600 px-4 py-2 rounded-lg transition flex items-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <Download className="h-4 w-4" />
              )}
              Sync Latest
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Asset Sources Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">🌐 Connected Asset Libraries</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {assetSources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-green-500/50 transition-all group"
              >
                <div className="text-3xl mb-2 text-center">{source.logo}</div>
                <h3 className="font-bold text-sm text-center mb-1">{source.name}</h3>
                <p className="text-xs text-gray-400 text-center mb-2">{source.totalAssets}</p>
                <div className="flex items-center justify-center text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Assets
              </h3>
              <input
                type="text"
                placeholder="Search by name or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
              />
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
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-green-600/30 border border-green-500/50'
                        : 'bg-black/20 hover:bg-black/30'
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-400">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">⚡ Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 p-3 rounded-lg text-sm transition">
                  🎨 Browse Materials
                </button>
                <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 p-3 rounded-lg text-sm transition">
                  🏗️ Find 3D Models
                </button>
                <button className="w-full bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 p-3 rounded-lg text-sm transition">
                  🎵 Get Audio Packs
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {filteredAssets.length} Featured Free Assets
              </h2>
              <p className="text-gray-400">
                Handpicked high-quality assets from the best free sources
              </p>
            </div>

            {/* Assets Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-green-500/50 transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-green-500/20 to-blue-500/20 relative group-hover:scale-105 transition-transform">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {asset.thumbnail}
                    </div>
                    
                    {/* License Badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        asset.license === 'CC0' ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {asset.license}
                      </span>
                    </div>

                    {/* Source Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/50 text-xs px-2 py-1 rounded">
                        {asset.source}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">
                        {asset.name}
                      </h3>
                      <span className="text-sm bg-gray-700/50 px-2 py-1 rounded">
                        {asset.category}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-4">
                      {asset.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {asset.downloads.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {asset.rating}
                        </span>
                      </div>
                      <span>{asset.format}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={asset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition text-center text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Get Asset
                      </a>
                      <button className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg transition text-sm">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Info */}
        <div className="mt-12 bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-center">🔄 How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="font-bold mb-2">Discover</h4>
              <p className="text-sm text-gray-400">
                Browse curated assets from the best free libraries in one place
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📥</div>
              <h4 className="font-bold mb-2">Download</h4>
              <p className="text-sm text-gray-400">
                Get high-quality assets with proper licensing information
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏗️</div>
              <h4 className="font-bold mb-2">Build</h4>
              <p className="text-sm text-gray-400">
                Import directly into your world builder for instant use
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}