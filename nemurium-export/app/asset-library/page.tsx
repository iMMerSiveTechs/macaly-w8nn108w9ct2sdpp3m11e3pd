"use client"

import { useState } from 'react'
import { MasterMenu } from '@/components/master-menu'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Star, Upload, Grid, List, Heart } from 'lucide-react'

export default function AssetLibrary() {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', label: 'All Assets', count: 247 },
    { id: '3d-models', label: '3D Models', count: 156 },
    { id: 'environments', label: 'Environments', count: 45 },
    { id: 'textures', label: 'Textures', count: 89 },
    { id: 'audio', label: 'Audio', count: 67 },
    { id: 'animations', label: 'Animations', count: 34 }
  ]

  const assets = [
    { id: 1, name: 'Mystical Crystal Formation', type: '3D Model', price: 'Free', rating: 4.8, downloads: 1247, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', tags: ['crystal', 'mystical', 'fantasy'] },
    { id: 2, name: 'Cyberpunk Alley Environment', type: 'Environment', price: '$15', rating: 4.9, downloads: 892, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', tags: ['cyberpunk', 'neon', 'urban'] },
    { id: 3, name: 'Ambient Forest Soundscape', type: 'Audio', price: 'Free', rating: 4.7, downloads: 567, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', tags: ['ambient', 'nature', 'forest'] },
    { id: 4, name: 'Holographic Particle System', type: 'Animation', price: '$8', rating: 4.6, downloads: 234, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', tags: ['holographic', 'sci-fi', 'particles'] },
    { id: 5, name: 'Ancient Stone Texture Pack', type: 'Textures', price: 'Free', rating: 4.5, downloads: 789, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', tags: ['stone', 'ancient', 'medieval'] },
    { id: 6, name: 'Floating Platform Set', type: '3D Model', price: '$12', rating: 4.8, downloads: 456, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', tags: ['platform', 'floating', 'sci-fi'] }
  ]

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.type.toLowerCase().includes(selectedCategory.replace('-', ' '))
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
              Asset Library
            </h1>
            <p className="text-xl text-cosmic-white/80 max-w-2xl mx-auto">
              Discover & share immersive assets for your creative projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="glass-panel p-6">
                {/* Upload Button */}
                <button className="w-full flex items-center justify-center gap-2 p-4 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all mb-6">
                  <Upload className="h-5 w-5" />
                  Upload Asset
                </button>

                {/* Categories */}
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-cosmic-purple'
                          : 'bg-cosmic-white/5 hover:bg-cosmic-white/10'
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="text-sm text-cosmic-white/70">{category.count}</span>
                    </button>
                  ))}
                </div>

                {/* Filters */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">Filters</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price</label>
                      <select className="w-full p-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg">
                        <option>All Prices</option>
                        <option>Free Only</option>
                        <option>Paid Only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <select className="w-full p-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg">
                        <option>All Ratings</option>
                        <option>4+ Stars</option>
                        <option>3+ Stars</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="glass-panel p-6">
                {/* Search and View Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmic-white/50" />
                    <input
                      type="text"
                      placeholder="Search assets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid' ? 'bg-cosmic-purple' : 'bg-cosmic-white/10'
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list' ? 'bg-cosmic-purple' : 'bg-cosmic-white/10'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Asset Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
                }`}>
                  {filteredAssets.map((asset) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-cosmic-white/5 rounded-lg overflow-hidden hover:bg-cosmic-white/10 transition-all group"
                    >
                      <div className="aspect-video bg-cosmic-white/10 relative overflow-hidden">
                        <img
                          src={asset.image}
                          alt={asset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button className="p-1 bg-black/50 rounded-full">
                            <Heart className="h-4 w-4" />
                          </button>
                          <div className="px-2 py-1 bg-black/50 rounded-full text-xs">
                            {asset.price}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{asset.name}</h3>
                        <p className="text-sm text-cosmic-white/70 mb-3">{asset.type}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm">{asset.rating}</span>
                          </div>
                          <span className="text-sm text-cosmic-white/70">
                            {asset.downloads} downloads
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {asset.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-cosmic-purple/20 text-cosmic-purple text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 p-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all">
                          <Download className="h-4 w-4" />
                          {asset.price === 'Free' ? 'Download' : 'Purchase'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}