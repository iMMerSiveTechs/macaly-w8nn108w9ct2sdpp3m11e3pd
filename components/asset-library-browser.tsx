"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Box, 
  Music, 
  Palette, 
  Upload, 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye, 
  Heart, 
  Share2, 
  Grid3X3, 
  List, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Crown, 
  Zap,
  Tag,
  User,
  Calendar,
  TrendingUp,
  ShoppingCart,
  Coins
} from 'lucide-react'

interface Asset {
  id: string
  name: string
  type: '3d-model' | 'environment' | 'texture' | 'audio' | 'animation' | 'shader' | 'particle'
  category: string
  preview: string
  thumbnail: string
  creator: string
  creatorAvatar: string
  price: number
  currency: 'free' | 'credits' | 'premium'
  downloads: number
  rating: number
  ratings: number
  tags: string[]
  description: string
  fileSize: string
  format: string
  createdAt: string
  featured: boolean
  trending: boolean
  new: boolean
  favorite?: boolean
  owned?: boolean
}

interface AssetCategory {
  id: string
  name: string
  icon: any
  count: number
  gradient: string
}

export function AssetLibraryBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'rating' | 'downloads'>('popular')
  const [filterBy, setFilterBy] = useState<'all' | 'free' | 'premium' | 'owned'>('all')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories: AssetCategory[] = [
    { id: 'all', name: 'All Assets', icon: Grid3X3, count: 1247, gradient: 'from-purple-500 to-pink-500' },
    { id: '3d-models', name: '3D Models', icon: Box, count: 456, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'environments', name: 'Environments', icon: Sparkles, count: 234, gradient: 'from-green-500 to-emerald-500' },
    { id: 'textures', name: 'Textures', icon: Palette, count: 321, gradient: 'from-amber-500 to-orange-500' },
    { id: 'audio', name: 'Audio', icon: Music, count: 156, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'animations', name: 'Animations', icon: Play, count: 89, gradient: 'from-pink-500 to-rose-500' },
    { id: 'shaders', name: 'Shaders', icon: Zap, count: 67, gradient: 'from-cyan-500 to-blue-500' },
    { id: 'particles', name: 'Particles', icon: Sparkles, count: 45, gradient: 'from-violet-500 to-purple-500' }
  ]

  const assets: Asset[] = [
    {
      id: 'asset-1',
      name: 'Mystical Crystal Formation',
      type: '3d-model',
      category: '3d-models',
      preview: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=200&h=150&fit=crop',
      creator: 'CrystalMaster',
      creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
      price: 0,
      currency: 'free',
      downloads: 1247,
      rating: 4.8,
      ratings: 156,
      tags: ['crystal', 'mystical', 'fantasy', 'environment'],
      description: 'A beautifully crafted mystical crystal formation perfect for fantasy environments.',
      fileSize: '12.5 MB',
      format: 'GLB',
      createdAt: '2024-01-15',
      featured: true,
      trending: true,
      new: false,
      favorite: false,
      owned: false
    },
    {
      id: 'asset-2',
      name: 'Cyberpunk Alley Environment',
      type: 'environment',
      category: 'environments',
      preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
      creator: 'NeonArchitect',
      creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      price: 150,
      currency: 'credits',
      downloads: 892,
      rating: 4.9,
      ratings: 203,
      tags: ['cyberpunk', 'neon', 'urban', 'futuristic'],
      description: 'Complete cyberpunk alley scene with neon lighting and atmospheric effects.',
      fileSize: '45.2 MB',
      format: 'FBX',
      createdAt: '2024-01-10',
      featured: true,
      trending: false,
      new: false,
      favorite: true,
      owned: true
    },
    {
      id: 'asset-3',
      name: 'Ambient Forest Soundscape',
      type: 'audio',
      category: 'audio',
      preview: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop',
      creator: 'SoundWeaver',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616c15d1e8e?w=50&h=50&fit=crop',
      price: 25,
      currency: 'credits',
      downloads: 567,
      rating: 4.7,
      ratings: 89,
      tags: ['ambient', 'nature', 'forest', 'peaceful'],
      description: 'Relaxing forest ambience with birds chirping and gentle wind sounds.',
      fileSize: '8.7 MB',
      format: 'MP3',
      createdAt: '2024-01-20',
      featured: false,
      trending: false,
      new: true,
      favorite: false,
      owned: false
    },
    {
      id: 'asset-4',
      name: 'Holographic Particle System',
      type: 'particle',
      category: 'particles',
      preview: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=150&fit=crop',
      creator: 'EffectWizard',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      price: 0,
      currency: 'premium',
      downloads: 234,
      rating: 4.6,
      ratings: 45,
      tags: ['holographic', 'sci-fi', 'particle', 'effect'],
      description: 'Advanced holographic particle system with customizable parameters.',
      fileSize: '2.1 MB',
      format: 'Unity Package',
      createdAt: '2024-01-18',
      featured: false,
      trending: true,
      new: true,
      favorite: false,
      owned: false
    }
  ]

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'free' && asset.currency === 'free') ||
      (filterBy === 'premium' && asset.currency === 'premium') ||
      (filterBy === 'owned' && asset.owned)
    
    return matchesCategory && matchesSearch && matchesFilter
  })

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset)
  }

  const handlePlayAudio = (assetId: string) => {
    if (isPlaying === assetId) {
      setIsPlaying(null)
    } else {
      setIsPlaying(assetId)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFavorite = (assetId: string) => {
    // Toggle favorite status
    console.log('Toggle favorite for:', assetId)
  }

  const handleDownload = (assetId: string) => {
    console.log('Download asset:', assetId)
  }

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'free': return <span className="text-green-400">FREE</span>
      case 'credits': return <Coins className="h-4 w-4 text-amber-400" />
      case 'premium': return <Crown className="h-4 w-4 text-purple-400" />
      default: return null
    }
  }

  return (
    <div className="h-screen bg-cosmic-space flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-cosmic-space/90 border-r border-cosmic-white/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-cosmic-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cosmic-purple to-pink-500 rounded-lg flex items-center justify-center">
              <Box className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-cosmic-white font-bold text-lg">Asset Library</h2>
              <p className="text-cosmic-white/60 text-sm">Discover & Share Assets</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cosmic-white/60" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/60 focus:outline-none focus:border-cosmic-purple/50"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="w-full px-4 py-2 bg-gradient-to-r from-cosmic-purple to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Asset
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".glb,.fbx,.obj,.mp3,.wav,.png,.jpg,.jpeg"
            onChange={(e) => console.log('File selected:', e.target.files?.[0])}
          />
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full p-3 rounded-lg transition-all text-left ${
                    selectedCategory === category.id
                      ? 'bg-cosmic-purple/20 border border-cosmic-purple/30'
                      : 'bg-cosmic-white/5 border border-cosmic-white/10 hover:bg-cosmic-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-cosmic-white font-medium">{category.name}</span>
                        <span className="text-cosmic-white/60 text-sm">{category.count}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-cosmic-white/10 bg-cosmic-space/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h2 className="text-cosmic-white font-bold text-xl">
                  {categories.find(c => c.id === selectedCategory)?.name || 'All Assets'}
                </h2>
                <p className="text-cosmic-white/60 text-sm">
                  {filteredAssets.length} assets found
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter */}
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as any)}
                className="px-3 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white text-sm"
              >
                <option value="all">All Assets</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="owned">Owned</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white text-sm"
              >
                <option value="popular">Popular</option>
                <option value="recent">Recent</option>
                <option value="rating">Rating</option>
                <option value="downloads">Downloads</option>
              </select>

              {/* View Mode */}
              <div className="flex gap-1 p-1 bg-cosmic-white/10 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cosmic-purple text-white' : 'text-cosmic-white/60'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-cosmic-purple text-white' : 'text-cosmic-white/60'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Grid/List */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssets.map(asset => (
                <motion.div
                  key={asset.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleAssetClick(asset)}
                  className="bg-cosmic-white/5 rounded-xl border border-cosmic-white/10 overflow-hidden cursor-pointer hover:bg-cosmic-white/10 transition-colors"
                >
                  {/* Asset Preview */}
                  <div className="relative">
                    <div
                      className="w-full h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${asset.preview})` }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {asset.featured && (
                        <span className="px-2 py-1 bg-cosmic-purple/80 text-white text-xs rounded-full">
                          Featured
                        </span>
                      )}
                      {asset.trending && (
                        <span className="px-2 py-1 bg-amber-500/80 text-white text-xs rounded-full">
                          Trending
                        </span>
                      )}
                      {asset.new && (
                        <span className="px-2 py-1 bg-green-500/80 text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFavorite(asset.id)
                        }}
                        className={`p-2 rounded-full backdrop-blur transition-colors ${
                          asset.favorite 
                            ? 'bg-red-500/80 text-white' 
                            : 'bg-black/50 text-white/80 hover:bg-black/70'
                        }`}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      
                      {asset.type === 'audio' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePlayAudio(asset.id)
                          }}
                          className="p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 backdrop-blur transition-colors"
                        >
                          {isPlaying === asset.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                      )}
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur rounded-full px-3 py-1">
                      {getCurrencyIcon(asset.currency)}
                      {asset.currency !== 'free' && (
                        <span className="text-white text-sm font-medium">{asset.price}</span>
                      )}
                    </div>
                  </div>

                  {/* Asset Info */}
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={asset.creatorAvatar}
                        alt={asset.creator}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-cosmic-white font-semibold text-sm mb-1 truncate">
                          {asset.name}
                        </h3>
                        <p className="text-cosmic-white/60 text-xs">by {asset.creator}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-cosmic-white text-sm">{asset.rating}</span>
                        <span className="text-cosmic-white/60 text-xs">({asset.ratings})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-cosmic-white/60" />
                        <span className="text-cosmic-white/60 text-xs">{asset.downloads}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {asset.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-cosmic-white/10 text-cosmic-white/70 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAssets.map(asset => (
                <motion.div
                  key={asset.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => handleAssetClick(asset)}
                  className="bg-cosmic-white/5 rounded-xl border border-cosmic-white/10 p-4 cursor-pointer hover:bg-cosmic-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-20 h-20 bg-cover bg-center rounded-lg flex-shrink-0"
                      style={{ backgroundImage: `url(${asset.thumbnail})` }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-cosmic-white font-semibold">{asset.name}</h3>
                        {asset.featured && <Crown className="h-4 w-4 text-amber-400" />}
                        {asset.trending && <TrendingUp className="h-4 w-4 text-green-400" />}
                      </div>
                      <p className="text-cosmic-white/60 text-sm mb-2">by {asset.creator}</p>
                      <p className="text-cosmic-white/80 text-sm mb-3 line-clamp-2">{asset.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span className="text-cosmic-white">{asset.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-cosmic-white/60" />
                          <span className="text-cosmic-white/60">{asset.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getCurrencyIcon(asset.currency)}
                          {asset.currency !== 'free' && (
                            <span className="text-cosmic-white">{asset.price}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleFavorite(asset.id)
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          asset.favorite 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-cosmic-white/10 text-cosmic-white/60 hover:bg-cosmic-white/20'
                        }`}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(asset.id)
                        }}
                        className="p-2 rounded-lg bg-cosmic-purple/20 text-cosmic-purple hover:bg-cosmic-purple/30 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cosmic-space/95 border border-cosmic-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <div
                    className="w-80 h-60 bg-cover bg-center rounded-xl flex-shrink-0"
                    style={{ backgroundImage: `url(${selectedAsset.preview})` }}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={selectedAsset.creatorAvatar}
                        alt={selectedAsset.creator}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="text-cosmic-white font-bold text-2xl">{selectedAsset.name}</h2>
                        <p className="text-cosmic-white/60">by {selectedAsset.creator}</p>
                      </div>
                    </div>

                    <p className="text-cosmic-white/80 mb-4">{selectedAsset.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="text-cosmic-white/60 text-sm">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span className="text-cosmic-white">{selectedAsset.rating}</span>
                          <span className="text-cosmic-white/60 text-sm">({selectedAsset.ratings} reviews)</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-cosmic-white/60 text-sm">Downloads</span>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4 text-cosmic-white/60" />
                          <span className="text-cosmic-white">{selectedAsset.downloads}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-cosmic-white/60 text-sm">File Size</span>
                        <p className="text-cosmic-white">{selectedAsset.fileSize}</p>
                      </div>
                      <div>
                        <span className="text-cosmic-white/60 text-sm">Format</span>
                        <p className="text-cosmic-white">{selectedAsset.format}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedAsset.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-cosmic-white/10 text-cosmic-white/80 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDownload(selectedAsset.id)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-cosmic-purple to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        {selectedAsset.currency === 'free' ? 'Download Free' : `Buy for ${selectedAsset.price}`}
                      </button>
                      
                      <button
                        onClick={() => handleFavorite(selectedAsset.id)}
                        className={`p-3 rounded-lg transition-colors ${
                          selectedAsset.favorite 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-cosmic-white/10 text-cosmic-white/60 hover:bg-cosmic-white/20'
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      
                      <button className="p-3 rounded-lg bg-cosmic-white/10 text-cosmic-white/60 hover:bg-cosmic-white/20 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}