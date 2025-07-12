"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Box, 
  Move3D, 
  RotateCw, 
  Maximize2, 
  Layers, 
  Eye, 
  EyeOff, 
  Trash2,
  Copy,
  Save,
  Play,
  Grid3X3,
  Palette,
  Settings,
  Plus,
  Download
} from 'lucide-react'
import { SkeletonLoader } from './error-boundary'

interface WorldObject {
  id: string
  name: string
  type: 'model' | 'light' | 'environment' | 'effect'
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  visible: boolean
  color?: string
  material?: string
  preview?: string
}

interface AssetCategory {
  id: string
  name: string
  icon: any
  items: WorldObject[]
}

interface Asset {
  id: string
  name: string
  type: 'environment' | 'object' | 'character' | 'effect'
  thumbnail: string
  model: string
}

interface PlacedAsset {
  id: string
  asset: Asset
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
}

export function WorldBuilder() {
  const [selectedObject, setSelectedObject] = useState<WorldObject | null>(null)
  const [worldObjects, setWorldObjects] = useState<WorldObject[]>([])
  const [activePanel, setActivePanel] = useState<'assets' | 'properties' | 'layers'>('assets')
  const [viewMode, setViewMode] = useState<'3d' | 'top' | 'side'>('3d')
  const [gridVisible, setGridVisible] = useState(true)
  const viewportRef = useRef<HTMLDivElement>(null)

  const assetCategories: AssetCategory[] = [
    {
      id: 'environments',
      name: 'Environments',
      icon: Box,
      items: [
        {
          id: 'env-1',
          name: 'Floating Island',
          type: 'environment',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          visible: true,
          preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop'
        },
        {
          id: 'env-2',
          name: 'Crystal Cave',
          type: 'environment',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          visible: true,
          preview: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop'
        }
      ]
    },
    {
      id: 'objects',
      name: '3D Objects',
      icon: Box,
      items: [
        {
          id: 'obj-1',
          name: 'Ancient Pillar',
          type: 'model',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          visible: true,
          preview: 'https://images.unsplash.com/photo-1558618047-3c8c5d2b73b2?w=200&h=200&fit=crop'
        },
        {
          id: 'obj-2',
          name: 'Mystical Orb',
          type: 'model',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          scale: { x: 1, y: 1, z: 1 },
          visible: true,
          preview: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=200&h=200&fit=crop'
        }
      ]
    }
  ]

  const [placedAssets, setPlacedAssets] = useState<PlacedAsset[]>([])
  const [selectedAsset, setSelectedAsset] = useState<PlacedAsset | null>(null)
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 2, z: 5 })
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  const addObjectToWorld = (assetItem: WorldObject) => {
    const newObject: WorldObject = {
      ...assetItem,
      id: `${assetItem.id}-${Date.now()}`,
      position: {
        x: Math.random() * 10 - 5,
        y: 0,
        z: Math.random() * 10 - 5
      }
    }
    setWorldObjects(prev => [...prev, newObject])
    setSelectedObject(newObject)
  }

  const updateObjectProperty = (objectId: string, property: string, value: any) => {
    setWorldObjects(prev => 
      prev.map(obj => 
        obj.id === objectId ? { ...obj, [property]: value } : obj
      )
    )
    
    if (selectedObject?.id === objectId) {
      setSelectedObject(prev => prev ? { ...prev, [property]: value } : null)
    }
  }

  const deleteObject = (objectId: string) => {
    setWorldObjects(prev => prev.filter(obj => obj.id !== objectId))
    if (selectedObject?.id === objectId) {
      setSelectedObject(null)
    }
  }

  const placeAsset = async (asset: Asset) => {
    setIsLoading(true)
    setLoadingMessage(`Placing ${asset.name}...`)
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const newAsset: PlacedAsset = {
        id: Date.now().toString(),
        asset,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 }
      }
      
      setPlacedAssets(prev => [...prev, newAsset])
      setSelectedAsset(newAsset)
      console.log('✅ Asset placed:', newAsset)
      
    } catch (error) {
      console.error('❌ Failed to place asset:', error)
    } finally {
      setIsLoading(false)
      setLoadingMessage('')
    }
  }

  return (
    <div className="h-screen bg-cosmic-space flex overflow-hidden">
      {/* Asset Library Panel */}
      <div className="w-80 bg-cosmic-space/90 border-r border-cosmic-white/10 flex flex-col">
        {/* Panel Header */}
        <div className="p-4 border-b border-cosmic-white/10">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActivePanel('assets')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePanel === 'assets' 
                  ? 'bg-cosmic-purple text-white' 
                  : 'bg-cosmic-white/10 text-cosmic-white hover:bg-cosmic-white/20'
              }`}
            >
              Assets
            </button>
            <button
              onClick={() => setActivePanel('properties')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePanel === 'properties' 
                  ? 'bg-cosmic-purple text-white' 
                  : 'bg-cosmic-white/10 text-cosmic-white hover:bg-cosmic-white/20'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => setActivePanel('layers')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePanel === 'layers' 
                  ? 'bg-cosmic-purple text-white' 
                  : 'bg-cosmic-white/10 text-cosmic-white hover:bg-cosmic-white/20'
              }`}
            >
              Layers
            </button>
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activePanel === 'assets' && (
            <div className="space-y-6">
              {assetCategories.map(category => (
                <div key={category.id}>
                  <h3 className="text-cosmic-white font-semibold mb-3 flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map(item => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addObjectToWorld(item)}
                        className="bg-cosmic-white/5 rounded-lg p-3 cursor-pointer hover:bg-cosmic-white/10 transition-colors border border-cosmic-white/10"
                      >
                        <div 
                          className="w-full h-20 bg-cover bg-center rounded mb-2"
                          style={{ backgroundImage: `url(${item.preview})` }}
                        />
                        <p className="text-cosmic-white text-xs font-medium">{item.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePanel === 'properties' && selectedObject && (
            <div className="space-y-6">
              <div>
                <h3 className="text-cosmic-white font-semibold mb-3">{selectedObject.name}</h3>
                
                {/* Position */}
                <div className="mb-4">
                  <label className="block text-cosmic-white/80 text-sm mb-2">Position</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['x', 'y', 'z'].map(axis => (
                      <div key={axis}>
                        <label className="block text-cosmic-white/60 text-xs mb-1">{axis.toUpperCase()}</label>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          step={0.1}
                          value={selectedObject.position[axis as keyof typeof selectedObject.position]}
                          onChange={(e) => updateObjectProperty(selectedObject.id, 'position', {
                            ...selectedObject.position,
                            [axis]: parseFloat(e.target.value)
                          })}
                          className="w-full accent-cosmic-purple"
                        />
                        <span className="text-cosmic-white/60 text-xs">
                          {selectedObject.position[axis as keyof typeof selectedObject.position].toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rotation */}
                <div className="mb-4">
                  <label className="block text-cosmic-white/80 text-sm mb-2">Rotation</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['x', 'y', 'z'].map(axis => (
                      <div key={axis}>
                        <label className="block text-cosmic-white/60 text-xs mb-1">{axis.toUpperCase()}</label>
                        <input
                          type="range"
                          min={0}
                          max={360}
                          step={1}
                          value={selectedObject.rotation[axis as keyof typeof selectedObject.rotation]}
                          onChange={(e) => updateObjectProperty(selectedObject.id, 'rotation', {
                            ...selectedObject.rotation,
                            [axis]: parseFloat(e.target.value)
                          })}
                          className="w-full accent-cosmic-purple"
                        />
                        <span className="text-cosmic-white/60 text-xs">
                          {selectedObject.rotation[axis as keyof typeof selectedObject.rotation]}°
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scale */}
                <div className="mb-4">
                  <label className="block text-cosmic-white/80 text-sm mb-2">Scale</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['x', 'y', 'z'].map(axis => (
                      <div key={axis}>
                        <label className="block text-cosmic-white/60 text-xs mb-1">{axis.toUpperCase()}</label>
                        <input
                          type="range"
                          min={0.1}
                          max={3}
                          step={0.1}
                          value={selectedObject.scale[axis as keyof typeof selectedObject.scale]}
                          onChange={(e) => updateObjectProperty(selectedObject.id, 'scale', {
                            ...selectedObject.scale,
                            [axis]: parseFloat(e.target.value)
                          })}
                          className="w-full accent-cosmic-purple"
                        />
                        <span className="text-cosmic-white/60 text-xs">
                          {selectedObject.scale[axis as keyof typeof selectedObject.scale].toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteObject(selectedObject.id)}
                    className="flex-1 px-3 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                  <button
                    onClick={() => addObjectToWorld(selectedObject)}
                    className="flex-1 px-3 py-2 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-lg text-cosmic-purple text-sm font-medium hover:bg-cosmic-purple/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Duplicate
                  </button>
                </div>
              </div>
            </div>
          )}

          {activePanel === 'layers' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cosmic-white font-semibold">World Layers</h3>
                <span className="text-cosmic-white/60 text-sm">{worldObjects.length} objects</span>
              </div>
              
              {worldObjects.map(obj => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObject(obj)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedObject?.id === obj.id
                      ? 'bg-cosmic-purple/20 border-cosmic-purple/30'
                      : 'bg-cosmic-white/5 border-cosmic-white/10 hover:bg-cosmic-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          updateObjectProperty(obj.id, 'visible', !obj.visible)
                        }}
                        className="text-cosmic-white/60 hover:text-cosmic-white"
                      >
                        {obj.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <span className="text-cosmic-white text-sm font-medium">{obj.name}</span>
                    </div>
                    <div className="text-cosmic-white/60 text-xs">
                      {obj.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col">
        {/* Viewport Header */}
        <div className="p-4 border-b border-cosmic-white/10 bg-cosmic-space/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-cosmic-white font-semibold">World Builder</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === '3d' ? 'bg-cosmic-purple text-white' : 'bg-cosmic-white/10 text-cosmic-white'
                  }`}
                >
                  3D
                </button>
                <button
                  onClick={() => setViewMode('top')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'top' ? 'bg-cosmic-purple text-white' : 'bg-cosmic-white/10 text-cosmic-white'
                  }`}
                >
                  Top
                </button>
                <button
                  onClick={() => setViewMode('side')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'side' ? 'bg-cosmic-purple text-white' : 'bg-cosmic-white/10 text-cosmic-white'
                  }`}
                >
                  Side
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setGridVisible(!gridVisible)}
                className={`p-2 rounded-lg transition-colors ${
                  gridVisible ? 'bg-cosmic-purple/20 text-cosmic-purple' : 'bg-cosmic-white/10 text-cosmic-white'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-cosmic-white/10 text-cosmic-white hover:bg-cosmic-white/20 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-cosmic-purple/20 text-cosmic-purple hover:bg-cosmic-purple/30 transition-colors">
                <Play className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors">
                <Save className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Viewport */}
        <div 
          ref={viewportRef}
          className="flex-1 bg-gradient-to-br from-cosmic-space via-cosmic-space/80 to-cosmic-purple/20 relative overflow-hidden"
        >
          {/* Grid */}
          {gridVisible && (
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" 
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />
            </div>
          )}

          {/* 3D Scene Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-cosmic-purple/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Box className="h-16 w-16 text-cosmic-white/60" />
              </div>
              <p className="text-cosmic-white/60 text-lg mb-2">3D Viewport</p>
              <p className="text-cosmic-white/40 text-sm">
                Drag assets from the library to start building
              </p>
            </div>
          </div>

          {/* World Objects Visualization */}
          {worldObjects.map(obj => (
            <motion.div
              key={obj.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: obj.visible ? 1 : 0.3, scale: 1 }}
              onClick={() => setSelectedObject(obj)}
              className={`absolute w-20 h-20 rounded-lg cursor-pointer transition-all ${
                selectedObject?.id === obj.id
                  ? 'ring-2 ring-cosmic-purple shadow-lg shadow-cosmic-purple/25'
                  : 'hover:scale-110'
              }`}
              style={{
                left: `${50 + obj.position.x * 20}%`,
                top: `${50 + obj.position.z * 20}%`,
                transform: `translate(-50%, -50%) rotate(${obj.rotation.y}deg) scale(${obj.scale.x})`,
                backgroundImage: `url(${obj.preview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-pink-500/20 rounded-lg" />
            </motion.div>
          ))}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-cosmic-space/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-cosmic-white/80 text-sm">{loadingMessage}</p>
              </div>
            </div>
          )}

          {/* Viewport Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="p-3 bg-cosmic-white/10 backdrop-blur rounded-lg text-cosmic-white hover:bg-cosmic-white/20 transition-colors">
              <Move3D className="h-5 w-5" />
            </button>
            <button className="p-3 bg-cosmic-white/10 backdrop-blur rounded-lg text-cosmic-white hover:bg-cosmic-white/20 transition-colors">
              <RotateCw className="h-5 w-5" />
            </button>
            <button className="p-3 bg-cosmic-white/10 backdrop-blur rounded-lg text-cosmic-white hover:bg-cosmic-white/20 transition-colors">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}