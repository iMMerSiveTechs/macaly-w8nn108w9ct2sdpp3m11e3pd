'use client';
import { useState } from 'react';
import { Search, Filter, Download, Eye, Heart, Star, Grid, List, Zap } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'model' | 'texture' | 'environment' | 'sound' | 'template';
  category: string;
  preview: string;
  downloads: number;
  rating: number;
  isPremium: boolean;
  tags: string[];
  creator: string;
}

export default function EnhancedAssetLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock asset data with Pexels images
  const assets: Asset[] = [
    {
      id: '1',
      name: 'VR Experience Environment',
      type: 'environment',
      category: 'immersive',
      preview: 'https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg',
      downloads: 1250,
      rating: 4.8,
      isPremium: true,
      tags: ['vr', 'cyberpunk', 'neon', 'immersive'],
      creator: 'Nemurium Studios'
    },
    {
      id: '2',
      name: 'Floating Island Paradise',
      type: 'environment',
      category: 'nature',
      preview: 'https://images.pexels.com/photos/18069363/pexels-photo-18069363.png',
      downloads: 892,
      rating: 4.9,
      isPremium: false,
      tags: ['floating', 'fantasy', 'nature', 'magical'],
      creator: 'AI Landscapes'
    },
    {
      id: '3',
      name: 'Cyberpunk VR Setup',
      type: 'template',
      category: 'tech',
      preview: 'https://images.pexels.com/photos/8721339/pexels-photo-8721339.jpeg',
      downloads: 654,
      rating: 4.7,
      isPremium: true,
      tags: ['cyberpunk', 'vr', 'neon', 'futuristic'],
      creator: 'TechWorld'
    },
    {
      id: '4',
      name: 'Immersive Developer Space',
      type: 'environment',
      category: 'workspace',
      preview: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg',
      downloads: 423,
      rating: 4.6,
      isPremium: false,
      tags: ['coding', 'developer', 'workspace', 'tech'],
      creator: 'CodeRealms'
    },
    {
      id: '5',
      name: 'Classic VR Experience',
      type: 'template',
      category: 'retro',
      preview: 'https://images.pexels.com/photos/3761262/pexels-photo-3761262.jpeg',
      downloads: 789,
      rating: 4.5,
      isPremium: false,
      tags: ['retro', 'classic', 'orange', 'simple'],
      creator: 'Vintage VR'
    },
    {
      id: '6',
      name: 'Modern VR Interface',
      type: 'template',
      category: 'ui',
      preview: 'https://images.pexels.com/photos/7241304/pexels-photo-7241304.jpeg',
      downloads: 567,
      rating: 4.8,
      isPremium: true,
      tags: ['modern', 'clean', 'ui', 'interface'],
      creator: 'UI Masters'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Assets', count: assets.length },
    { id: 'immersive', name: 'Immersive', count: assets.filter(a => a.category === 'immersive').length },
    { id: 'nature', name: 'Nature', count: assets.filter(a => a.category === 'nature').length },
    { id: 'tech', name: 'Technology', count: assets.filter(a => a.category === 'tech').length },
    { id: 'workspace', name: 'Workspace', count: assets.filter(a => a.category === 'workspace').length }
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (assetId: string) => {
    setFavorites(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const downloadAsset = (asset: Asset) => {
    console.log('Downloading asset:', asset.name);
    alert(`📦 ${asset.name} would be downloaded to your asset library!`);
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Asset Library
          </h2>
          <p className="text-gray-400 mt-1">Discover and use premium immersive assets</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets, tags, creators..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-400 text-sm">
        {filteredAssets.length} assets found
      </div>

      {/* Asset Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
              {/* Preview Image */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={asset.preview} 
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                      onClick={() => downloadAsset(asset)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors" title="Preview">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(asset.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        favorites.includes(asset.id) 
                          ? 'bg-red-600 hover:bg-red-700' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      title="Favorite"
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(asset.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Premium Badge */}
                {asset.isPremium && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    PRO
                  </div>
                )}
              </div>

              {/* Asset Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{asset.name}</h3>
                <p className="text-gray-400 text-sm mb-2">by {asset.creator}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{asset.rating}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {asset.downloads.toLocaleString()} downloads
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {asset.tags.length > 3 && (
                    <span className="text-gray-400 text-xs">+{asset.tags.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-750 transition-colors">
              <img 
                src={asset.preview} 
                alt={asset.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{asset.name}</h3>
                  {asset.isPremium && (
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-0.5 rounded text-xs font-bold">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-2">by {asset.creator}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    {asset.rating}
                  </div>
                  <div>{asset.downloads.toLocaleString()} downloads</div>
                  <div className="flex gap-1">
                    {asset.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="bg-gray-700 px-2 py-0.5 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => downloadAsset(asset)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleFavorite(asset.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    favorites.includes(asset.id) 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(asset.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">No assets found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}