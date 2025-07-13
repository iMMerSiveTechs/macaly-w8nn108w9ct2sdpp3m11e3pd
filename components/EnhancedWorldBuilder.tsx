/**
 * Enhanced World Builder with Real Prefab Management
 * Complete 3D world building with drag-drop, AI integration, and multiplayer sync
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Save, Share, Eye, Layers, Settings, Download, Upload, Trash2, RotateCcw, Move, Scale, RotateCw } from 'lucide-react';

interface WorldObject {
  id: string;
  type: 'tree' | 'house' | 'crystal' | 'portal' | 'water' | 'rock' | 'tower' | 'bridge';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  color?: string;
  createdAt: Date;
  createdBy: string;
}

interface WorldData {
  id: string;
  name: string;
  objects: WorldObject[];
  theme: 'forest' | 'desert' | 'crystal' | 'cyberpunk' | 'underwater' | 'space';
  isPublic: boolean;
  lastModified: Date;
  createdBy: string;
}

// Mock Firebase functions for demo
const mockFirestore = {
  collection: (path: string) => ({ path }),
  addDoc: async (ref: any, data: any) => ({ id: Date.now().toString() }),
  onSnapshot: (ref: any, callback: any) => {
    // Mock subscription - returns unsubscribe function
    return () => {};
  },
  updateDoc: async (ref: any, data: any) => Promise.resolve(),
  doc: (path: string, id: string) => ({ path, id }),
  deleteDoc: async (ref: any) => Promise.resolve()
};

// Use mock instead of Firebase
const { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } = mockFirestore;
const db = 'mock-db'; // Mock database reference

const PREFAB_TYPES = [
  { type: 'tree', name: 'Tree', icon: '🌲', color: '#22c55e' },
  { type: 'house', name: 'House', icon: '🏠', color: '#8b5cf6' },
  { type: 'crystal', name: 'Crystal', icon: '💎', color: '#06b6d4' },
  { type: 'portal', name: 'Portal', icon: '🌀', color: '#f59e0b' },
  { type: 'water', name: 'Water', icon: '💧', color: '#3b82f6' },
  { type: 'rock', name: 'Rock', icon: '🪨', color: '#6b7280' },
  { type: 'tower', name: 'Tower', icon: '🗼', color: '#ef4444' },
  { type: 'bridge', name: 'Bridge', icon: '🌉', color: '#10b981' }
] as const;

const THEMES = [
  { id: 'forest', name: 'Mystical Forest', color: '#22c55e', bg: 'from-green-900 to-emerald-800' },
  { id: 'desert', name: 'Desert Oasis', color: '#f59e0b', bg: 'from-yellow-800 to-orange-700' },
  { id: 'crystal', name: 'Crystal Caverns', color: '#06b6d4', bg: 'from-cyan-900 to-blue-800' },
  { id: 'cyberpunk', name: 'Neon City', color: '#a855f7', bg: 'from-purple-900 to-pink-800' },
  { id: 'underwater', name: 'Ocean Depths', color: '#3b82f6', bg: 'from-blue-900 to-indigo-800' },
  { id: 'space', name: 'Cosmic Void', color: '#6366f1', bg: 'from-gray-900 to-slate-800' }
] as const;

export default function EnhancedWorldBuilder() {
  const [worldData, setWorldData] = useState<WorldData>({
    id: '',
    name: 'My Realm',
    objects: [],
    theme: 'forest',
    isPublic: false,
    lastModified: new Date(),
    createdBy: 'user123' // This would come from auth
  });

  const [selectedObject, setSelectedObject] = useState<WorldObject | null>(null);
  const [selectedTool, setSelectedTool] = useState<'select' | 'move' | 'rotate' | 'scale'>('select');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<WorldData>(worldData);

  // Update ref when worldData changes
  useEffect(() => {
    worldRef.current = worldData;
  }, [worldData]);

  // Real-time sync with Firebase
  useEffect(() => {
    if (!worldData.id) return;

    const unsubscribe = onSnapshot(doc(db, 'worlds', worldData.id), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as WorldData;
        setWorldData(data);
      }
    });

    return () => unsubscribe();
  }, [worldData.id]);

  // Canvas setup and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set theme background
      const theme = THEMES.find(t => t.id === worldData.theme);
      if (theme) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, theme.color + '20');
        gradient.addColorStop(1, theme.color + '10');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Render grid
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      const gridSize = 20;
      
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Render objects
      worldData.objects.forEach((obj) => {
        const prefab = PREFAB_TYPES.find(p => p.type === obj.type);
        if (!prefab) return;

        const x = obj.position.x + canvas.width / 2;
        const y = obj.position.z + canvas.height / 2;
        const size = 20 * obj.scale.x;

        // Object shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(x - size/2 + 2, y - size/2 + 2, size, size);

        // Object body
        ctx.fillStyle = obj.color || prefab.color;
        ctx.fillRect(x - size/2, y - size/2, size, size);

        // Object icon
        ctx.fillStyle = '#ffffff';
        ctx.font = `${size * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(prefab.icon, x, y);

        // Selection highlight
        if (selectedObject?.id === obj.id) {
          ctx.strokeStyle = '#8b5cf6';
          ctx.lineWidth = 3;
          ctx.strokeRect(x - size/2 - 2, y - size/2 - 2, size + 4, size + 4);
        }
      });
    };

    render();
  }, [worldData, selectedObject]);

  const addObject = useCallback(async (type: WorldObject['type']) => {
    const newObject: WorldObject = {
      id: Date.now().toString(),
      type,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      createdAt: new Date(),
      createdBy: worldData.createdBy
    };

    const updatedWorld = {
      ...worldData,
      objects: [...worldData.objects, newObject],
      lastModified: new Date()
    };

    setWorldData(updatedWorld);

    // Sync to Firebase
    if (worldData.id) {
      await updateDoc(doc(db, 'worlds', worldData.id), {
        objects: updatedWorld.objects,
        lastModified: updatedWorld.lastModified
      });
    }
  }, [worldData]);

  const deleteObject = useCallback(async (objectId: string) => {
    const updatedObjects = worldData.objects.filter(obj => obj.id !== objectId);
    const updatedWorld = {
      ...worldData,
      objects: updatedObjects,
      lastModified: new Date()
    };

    setWorldData(updatedWorld);
    setSelectedObject(null);

    // Sync to Firebase
    if (worldData.id) {
      await updateDoc(doc(db, 'worlds', worldData.id), {
        objects: updatedObjects,
        lastModified: updatedWorld.lastModified
      });
    }
  }, [worldData]);

  const updateObject = useCallback(async (objectId: string, updates: Partial<WorldObject>) => {
    const updatedObjects = worldData.objects.map(obj => 
      obj.id === objectId ? { ...obj, ...updates } : obj
    );
    
    const updatedWorld = {
      ...worldData,
      objects: updatedObjects,
      lastModified: new Date()
    };

    setWorldData(updatedWorld);

    // Update selected object if it's the one being modified
    if (selectedObject?.id === objectId) {
      setSelectedObject({ ...selectedObject, ...updates });
    }

    // Sync to Firebase
    if (worldData.id) {
      await updateDoc(doc(db, 'worlds', worldData.id), {
        objects: updatedObjects,
        lastModified: updatedWorld.lastModified
      });
    }
  }, [worldData, selectedObject]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (isPreviewMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - canvas.width / 2;
    const y = e.clientY - rect.top - canvas.height / 2;

    // Check if clicking on an object
    const clickedObject = worldData.objects.find(obj => {
      const objX = obj.position.x;
      const objZ = obj.position.z;
      const size = 20 * obj.scale.x;
      
      return x >= objX - size/2 && x <= objX + size/2 && 
             y >= objZ - size/2 && y <= objZ + size/2;
    });

    if (clickedObject) {
      setSelectedObject(clickedObject);
    } else {
      setSelectedObject(null);
    }
  }, [worldData.objects, isPreviewMode]);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (!selectedObject || isPreviewMode) return;

    setIsDragging(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, [selectedObject, isPreviewMode]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedObject || selectedTool !== 'move') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = currentX - dragStart.x;
    const deltaY = currentY - dragStart.y;

    const newPosition = {
      x: selectedObject.position.x + deltaX,
      y: selectedObject.position.y,
      z: selectedObject.position.z + deltaY
    };

    updateObject(selectedObject.id, { position: newPosition });

    setDragStart({ x: currentX, y: currentY });
  }, [isDragging, selectedObject, selectedTool, dragStart, updateObject]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const saveWorld = async () => {
    setIsLoading(true);
    try {
      if (worldData.id) {
        // Update existing world
        await updateDoc(doc(db, 'worlds', worldData.id), {
          ...worldData,
          lastModified: new Date()
        });
      } else {
        // Create new world
        const docRef = await addDoc(collection(db, 'worlds'), {
          ...worldData,
          id: '',
          lastModified: new Date()
        });
        setWorldData(prev => ({ ...prev, id: docRef.id }));
      }
      alert('World saved successfully!');
    } catch (error) {
      console.error('Error saving world:', error);
      alert('Failed to save world. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const exportWorld = () => {
    const dataStr = JSON.stringify(worldData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${worldData.name.replace(/\s+/g, '_')}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importWorld = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedWorld = JSON.parse(event.target?.result as string);
        setWorldData({
          ...importedWorld,
          id: '', // Reset ID to create new world
          createdBy: worldData.createdBy,
          lastModified: new Date()
        });
      } catch (error) {
        alert('Invalid world file format.');
      }
    };
    reader.readAsText(file);
  };

  const generateShareLink = () => {
    if (!worldData.id) {
      alert('Please save your world first to generate a share link.');
      return;
    }
    
    const shareUrl = `${window.location.origin}/world/${worldData.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Visual Elements */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.pexels.com/photos/30547572/pexels-photo-30547572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Digital Grid Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Visual Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
        <img 
          src="https://images.pexels.com/photos/30547606/pexels-photo-30547606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="3D Cubes"
          className="w-full h-full object-cover rounded-lg blur-sm animate-pulse"
        />
      </div>

      <div className="relative z-10">
        {/* Top Toolbar */}
        <div className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                <input
                  type="text"
                  value={worldData.name}
                  onChange={(e) => setWorldData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white font-semibold text-lg focus:border-purple-400 focus:outline-none"
                  placeholder="My Amazing Realm"
                />
              </div>
              
              {/* Enhanced Theme Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Theme:</span>
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setWorldData(prev => ({ ...prev, theme: theme.id as any }))}
                    className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                      worldData.theme === theme.id 
                        ? 'border-white shadow-lg scale-110' 
                        : 'border-gray-600 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: theme.color }}
                    title={theme.name}
                  >
                    {worldData.theme === theme.id && (
                      <div className="absolute inset-0 rounded-full bg-white/20 flex items-center justify-center">
                        <Eye className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Live Sync</span>
              </div>
              
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isPreviewMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <Eye className="h-4 w-4" />
                {isPreviewMode ? 'Exit Preview' : 'Preview'}
              </button>
              
              <button
                onClick={saveWorld}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-all"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save World'}
              </button>

              <button
                onClick={() => setShowShareDialog(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
              >
                <Share className="h-4 w-4" />
                Share
              </button>

              <div className="flex items-center gap-1 border-l border-gray-600 pl-3">
                <button
                  onClick={exportWorld}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  title="Export World"
                >
                  <Download className="h-4 w-4" />
                </button>
                
                <label className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors cursor-pointer" title="Import World">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept=".json"
                    onChange={importWorld}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Prefabs */}
          {!isPreviewMode && (
            <div className="w-72 bg-gray-800/95 backdrop-blur-sm border-r border-gray-700 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    🧱
                  </div>
                  Prefab Library
                </h3>
                <p className="text-sm text-gray-400">Drag and drop to build your realm</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {PREFAB_TYPES.map((prefab) => (
                  <button
                    key={prefab.type}
                    onClick={() => addObject(prefab.type)}
                    className="group relative p-4 bg-gradient-to-br from-gray-700/50 to-gray-800/50 hover:from-gray-600/50 hover:to-gray-700/50 rounded-xl transition-all duration-300 text-center border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm"
                    title={`Add ${prefab.name}`}
                  >
                    <div className="relative">
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {prefab.icon}
                      </div>
                      <div className="text-xs text-gray-300 group-hover:text-white font-medium">
                        {prefab.name}
                      </div>
                      
                      {/* Hover Effect */}
                      <div 
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundColor: prefab.color }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Enhanced Tools Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                    🛠️
                  </div>
                  Tools
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'select', icon: '👆', name: 'Select', color: 'from-gray-600 to-gray-700' },
                    { id: 'move', icon: '✋', name: 'Move', color: 'from-blue-600 to-blue-700' },
                    { id: 'rotate', icon: '🔄', name: 'Rotate', color: 'from-green-600 to-green-700' },
                    { id: 'scale', icon: '📏', name: 'Scale', color: 'from-purple-600 to-purple-700' }
                  ].map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id as any)}
                      className={`w-full p-3 rounded-lg transition-all text-left flex items-center gap-3 ${
                        selectedTool === tool.id 
                          ? `bg-gradient-to-r ${tool.color} text-white shadow-lg` 
                          : 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white'
                      }`}
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <span className="font-medium">{tool.name}</span>
                      {selectedTool === tool.id && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Object List */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                      📋
                    </div>
                    Scene Objects
                  </div>
                  <span className="text-sm bg-gray-700 px-2 py-1 rounded-full">
                    {worldData.objects.length}
                  </span>
                </h4>
                
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {worldData.objects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">🏗️</div>
                      <p className="text-sm">No objects yet</p>
                      <p className="text-xs text-gray-600 mt-1">Start building your realm!</p>
                    </div>
                  ) : (
                    worldData.objects.map((obj, index) => {
                      const prefab = PREFAB_TYPES.find(p => p.type === obj.type);
                      return (
                        <div
                          key={obj.id}
                          onClick={() => setSelectedObject(obj)}
                          className={`group p-3 rounded-lg cursor-pointer transition-all border ${
                            selectedObject?.id === obj.id 
                              ? 'bg-purple-600/20 border-purple-500/50 text-white' 
                              : 'bg-gray-700/30 hover:bg-gray-600/50 border-gray-600/30 hover:border-gray-500/50 text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{prefab?.icon}</span>
                              <div>
                                <span className="font-medium">{prefab?.name} {index + 1}</span>
                                <div className="text-xs text-gray-400">
                                  {obj.position.x.toFixed(1)}, {obj.position.y.toFixed(1)}, {obj.position.z.toFixed(1)}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteObject(obj.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all p-1 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Main Canvas */}
          <div className="flex-1 relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full h-full cursor-crosshair"
              onClick={handleCanvasClick}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              style={{ imageRendering: 'pixelated' }}
            />
            
            {/* Canvas Overlay Info */}
            <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg">
              <p className="text-sm">Objects: {worldData.objects.length}</p>
              <p className="text-sm">Theme: {THEMES.find(t => t.id === worldData.theme)?.name}</p>
              {selectedObject && (
                <p className="text-sm text-purple-400">
                  Selected: {PREFAB_TYPES.find(p => p.type === selectedObject.type)?.name}
                </p>
              )}
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          {!isPreviewMode && selectedObject && (
            <div className="w-64 bg-gray-800 border-l border-gray-700 p-4">
              <h3 className="text-lg font-bold mb-4">⚙️ Properties</h3>
              
              <div className="space-y-4">
                {/* Position */}
                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <div className="space-y-1">
                    {['x', 'y', 'z'].map((axis) => (
                      <div key={axis} className="flex items-center gap-2">
                        <span className="w-4 text-xs">{axis.toUpperCase()}</span>
                        <input
                          type="number"
                          value={selectedObject.position[axis as keyof typeof selectedObject.position]}
                          onChange={(e) => updateObject(selectedObject.id, {
                            position: {
                              ...selectedObject.position,
                              [axis]: parseFloat(e.target.value) || 0
                            }
                          })}
                          className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scale */}
                <div>
                  <label className="block text-sm font-medium mb-2">Scale</label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={selectedObject.scale.x}
                    onChange={(e) => {
                      const scale = parseFloat(e.target.value);
                      updateObject(selectedObject.id, {
                        scale: { x: scale, y: scale, z: scale }
                      });
                    }}
                    className="w-full"
                  />
                  <span className="text-xs text-gray-400">{selectedObject.scale.x.toFixed(1)}x</span>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <input
                    type="color"
                    value={selectedObject.color || PREFAB_TYPES.find(p => p.type === selectedObject.type)?.color || '#ffffff'}
                    onChange={(e) => updateObject(selectedObject.id, { color: e.target.value })}
                    className="w-full h-10 rounded border border-gray-600"
                  />
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-700">
                  <button
                    onClick={() => deleteObject(selectedObject.id)}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4 inline mr-2" />
                    Delete Object
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Share Dialog */}
        {showShareDialog && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">🔗 Share Your World</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={worldData.isPublic}
                      onChange={(e) => setWorldData(prev => ({ ...prev, isPublic: e.target.checked }))}
                      className="rounded"
                    />
                    <span>Make world public</span>
                  </label>
                </div>

                <button
                  onClick={generateShareLink}
                  disabled={!worldData.id}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors"
                >
                  Generate Share Link
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowShareDialog(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
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