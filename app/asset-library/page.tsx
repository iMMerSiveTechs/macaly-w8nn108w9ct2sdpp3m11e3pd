'use client';
import { useState } from 'react';
import { Search, Filter, Upload, Download, Eye, Heart, Star, Grid, List, Package, Music, Image as ImageIcon } from 'lucide-react';

export default function AssetLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Assets', icon: Package, count: 2847 },
    { id: '3d', name: '3D Models', icon: Package, count: 1203 },
    { id: 'audio', name: 'Audio', icon: Music, count: 892 },
    { id: 'textures', name: 'Textures', icon: ImageIcon, count: 752 }
  ];

  const assets = [
    {
      id: 1,
      name: 'Cyberpunk Building Pack',
      category: '3d',
      type: '3D Model',
      size: '24.5 MB',
      downloads: 1247,
      rating: 4.8,
      price: 'Free',
      thumbnail: '/api/placeholder/300/200',
      creator: 'NeonArchitect',
      tags: ['cyberpunk', 'buildings', 'sci-fi', 'architecture'],
      description: 'A collection of futuristic cyberpunk buildings perfect for creating dystopian cityscapes.'
    },
    {
      id: 2,
      name: 'Enchanted Forest Ambient',
      category: 'audio',
      type: 'Audio Loop',
      size: '5.2 MB',
      downloads: 892,
      rating: 4.9,
      price: 'Free',
      thumbnail: '/api/placeholder/300/200',
      creator: 'SoundScaper',
      tags: ['ambient', 'nature', 'forest', 'peaceful'],
      description: 'Mystical forest soundscape with bird songs, rustling leaves, and magical elements.'
    },
    {
      id: 3,
      name: 'Sci-Fi Metal Textures',
      category: 'textures',
      type: 'Material Pack',
      size: '18.7 MB',
      downloads: 634,
      rating: 4.7,
      price: '$4.99',
      thumbnail: '/api/placeholder/300/200',
      creator: 'MetalCrafter',
      tags: ['metal', 'sci-fi', 'materials', 'PBR'],
      description: 'High-quality PBR metal textures for futuristic environments and objects.'
    },
    {
      id: 4,
      name: 'Fantasy Character Rig',
      category: '3d',
      type: '3D Character',
      size: '45.2 MB',
      downloads: 423,
      rating: 4.6,
      price: '$9.99',
      thumbnail: '/api/placeholder/300/200',
      creator: 'FantasyArtist',
      tags: ['character', 'fantasy', 'rigged', 'animated'],
      description: 'Fully rigged fantasy character with multiple animations and customizable materials.'
    },
    {
      id: 5,
      name: 'Ocean Wave Sounds',
      category: 'audio',
      type: 'Environmental Audio',
      size: '12.3 MB',
      downloads: 789,
      rating: 4.8,
      price: 'Free',
      thumbnail: '/api/placeholder/300/200',
      creator: 'OceanSounds',
      tags: ['ocean', 'waves', 'water', 'relaxing'],
      description: 'Realistic ocean wave sounds perfect for coastal and underwater environments.'
    },
    {
      id: 6,
      name: 'Grunge Wall Textures',
      category: 'textures',
      type: 'Texture Pack',
      size: '32.1 MB',
      downloads: 567,
      rating: 4.5,
      price: 'Free',
      thumbnail: '/api/placeholder/300/200',
      creator: 'GrungeArt',
      tags: ['grunge', 'walls', 'worn', 'urban'],
      description: 'Collection of weathered and grungy wall textures for urban environments.'
    }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                📦 Asset Library
              </h1>
            </div>
            
            <button className="bg-green-600/80 hover:bg-green-600 px-6 py-2 rounded-lg transition flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Asset
            </button>
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
                Search Assets
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or tags..."
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
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition flex items-center justify-between ${
                        selectedCategory === category.id
                          ? 'bg-purple-600/30 border border-purple-500/50'
                          : 'bg-black/20 hover:bg-black/30 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{category.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">📤 Share Your Assets</h3>
              <p className="text-sm text-gray-400 mb-4">
                Upload your 3D models, textures, or audio to share with the community.
              </p>
              <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-4 py-3 rounded-lg font-semibold transition">
                Start Upload
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* View Controls */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">
                  {filteredAssets.length} {selectedCategory === 'all' ? 'Assets' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  {searchTerm && `Results for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'grid' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition ${
                    viewMode === 'list' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Assets Grid/List */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group cursor-pointer ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  onClick={() => setSelectedAsset(asset)}
                >
                  {/* Thumbnail */}
                  <div className={`bg-gradient-to-br from-purple-500/20 to-blue-500/20 ${
                    viewMode === 'list' ? 'w-32 h-24' : 'aspect-video'
                  } flex items-center justify-center relative group-hover:scale-105 transition-transform`}>
                    <div className="text-4xl">
                      {asset.category === '3d' && '🏗️'}
                      {asset.category === 'audio' && '🎵'}
                      {asset.category === 'textures' && '🎨'}
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors line-clamp-1">
                        {asset.name}
                      </h3>
                      <span className={`text-sm px-2 py-1 rounded ${
                        asset.price === 'Free' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {asset.price}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {asset.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>by {asset.creator}</span>
                      <span>{asset.size}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {asset.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {asset.rating}
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded transition">
                          <Heart className="h-3 w-3" />
                        </button>
                        <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded transition">
                          <Download className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {asset.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredAssets.length === 0 && (
              <div className="text-center py-16">
                <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No assets found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedAsset.name}</h2>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  ✕
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 aspect-video rounded-lg flex items-center justify-center mb-4">
                <div className="text-6xl">
                  {selectedAsset.category === '3d' && '🏗️'}
                  {selectedAsset.category === 'audio' && '🎵'}
                  {selectedAsset.category === 'textures' && '🎨'}
                </div>
              </div>

              <p className="text-gray-300 mb-4">{selectedAsset.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-400 text-sm">Creator:</span>
                  <p className="font-medium">{selectedAsset.creator}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">File Size:</span>
                  <p className="font-medium">{selectedAsset.size}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Downloads:</span>
                  <p className="font-medium">{selectedAsset.downloads}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Rating:</span>
                  <p className="font-medium flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {selectedAsset.rating}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition">
                  Download Asset
                </button>
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}