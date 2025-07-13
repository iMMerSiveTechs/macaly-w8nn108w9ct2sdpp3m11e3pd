/*
 * Nemurium 4D Immersive Templates System
 * Built by Nemurium AI Engine
 * Copyright (c) 2025 iMMerSive Technologies, LLC
 * Revolutionary 4D templates with time, interaction, and dimension control
 */

'use client';
import { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCw, Zap, Eye, Users, Gamepad2, Timer, Layers } from 'lucide-react';

interface Template4D {
  id: string;
  name: string;
  category: 'interactive' | 'temporal' | 'reactive' | 'multiplayer' | 'educational';
  complexity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  dimensions: {
    spatial: '3D' | '6DOF' | 'Volumetric';
    temporal: 'Static' | 'Animated' | 'Reactive' | 'Predictive';
    interactive: 'None' | 'Touch' | 'Gesture' | 'Voice' | 'Neural';
    social: 'Single' | 'Collaborative' | 'Multiplayer' | 'Persistent';
  };
  features: string[];
  description: string;
  previewUrl: string;
  timelineLength: number; // in seconds
  maxUsers: number;
  assets: {
    models: number;
    animations: number;
    audioTracks: number;
    interactiveElements: number;
  };
  aiFeatures: {
    procedural: boolean;
    adaptive: boolean;
    predictive: boolean;
    generative: boolean;
  };
  platform: ('Web' | 'VR' | 'AR' | 'MR' | 'Mobile')[];
  rating: number;
  downloads: number;
  fileSize: string;
}

export default function FourDImmersiveTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template4D | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterComplexity, setFilterComplexity] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState('spatial');

  const templates: Template4D[] = [
    {
      id: 'adaptive_museum',
      name: 'Adaptive Virtual Museum',
      category: 'educational',
      complexity: 'Advanced',
      dimensions: {
        spatial: 'Volumetric',
        temporal: 'Reactive',
        interactive: 'Neural',
        social: 'Collaborative'
      },
      features: [
        'AI-guided tours',
        'Emotional response adaptation',
        'Real-time content generation',
        'Multi-user collaboration',
        'Biometric feedback integration',
        'Procedural exhibit arrangement'
      ],
      description: 'A revolutionary museum experience that adapts to visitor emotions and learning patterns in real-time.',
      previewUrl: '/api/placeholder/600/400',
      timelineLength: 1800, // 30 minutes
      maxUsers: 50,
      assets: {
        models: 2847,
        animations: 156,
        audioTracks: 89,
        interactiveElements: 234
      },
      aiFeatures: {
        procedural: true,
        adaptive: true,
        predictive: true,
        generative: true
      },
      platform: ['Web', 'VR', 'AR', 'MR'],
      rating: 4.9,
      downloads: 12400,
      fileSize: '8.2 GB'
    },
    {
      id: 'time_crystal_lab',
      name: 'Temporal Crystal Laboratory',
      category: 'interactive',
      complexity: 'Expert',
      dimensions: {
        spatial: '6DOF',
        temporal: 'Predictive',
        interactive: 'Gesture',
        social: 'Multiplayer'
      },
      features: [
        'Time manipulation mechanics',
        'Causal loop visualization',
        'Quantum state simulation',
        'Predictive modeling',
        'Multi-timeline navigation',
        'Temporal paradox resolution'
      ],
      description: 'Experience and manipulate time itself in this quantum physics laboratory simulation.',
      previewUrl: '/api/placeholder/600/400',
      timelineLength: 3600, // 1 hour
      maxUsers: 8,
      assets: {
        models: 1456,
        animations: 289,
        audioTracks: 67,
        interactiveElements: 189
      },
      aiFeatures: {
        procedural: true,
        adaptive: false,
        predictive: true,
        generative: true
      },
      platform: ['VR', 'MR'],
      rating: 4.7,
      downloads: 8900,
      fileSize: '12.8 GB'
    },
    {
      id: 'living_ecosystem',
      name: 'Living Ecosystem Simulation',
      category: 'reactive',
      complexity: 'Advanced',
      dimensions: {
        spatial: 'Volumetric',
        temporal: 'Reactive',
        interactive: 'Voice',
        social: 'Persistent'
      },
      features: [
        'Real ecosystem simulation',
        'Weather pattern prediction',
        'Species evolution tracking',
        'Environmental storytelling',
        'Voice command interaction',
        'Day/night cycle simulation'
      ],
      description: 'A living, breathing ecosystem that evolves based on user interactions and environmental factors.',
      previewUrl: '/api/placeholder/600/400',
      timelineLength: 86400, // 24 hours
      maxUsers: 100,
      assets: {
        models: 4567,
        animations: 1289,
        audioTracks: 234,
        interactiveElements: 456
      },
      aiFeatures: {
        procedural: true,
        adaptive: true,
        predictive: true,
        generative: true
      },
      platform: ['Web', 'VR', 'AR', 'Mobile'],
      rating: 4.8,
      downloads: 15600,
      fileSize: '15.4 GB'
    },
    {
      id: 'neural_space',
      name: 'Neural Network Visualization',
      category: 'educational',
      complexity: 'Intermediate',
      dimensions: {
        spatial: '6DOF',
        temporal: 'Animated',
        interactive: 'Touch',
        social: 'Single'
      },
      features: [
        'Live neural network visualization',
        'Interactive node exploration',
        'Real-time learning display',
        'Data flow animation',
        'Performance metrics',
        'Architecture comparison'
      ],
      description: 'Explore the inner workings of AI neural networks through immersive 3D visualization.',
      previewUrl: '/api/placeholder/600/400',
      timelineLength: 900, // 15 minutes
      maxUsers: 1,
      assets: {
        models: 789,
        animations: 234,
        audioTracks: 45,
        interactiveElements: 123
      },
      aiFeatures: {
        procedural: false,
        adaptive: false,
        predictive: false,
        generative: false
      },
      platform: ['Web', 'VR', 'AR'],
      rating: 4.6,
      downloads: 23400,
      fileSize: '3.2 GB'
    },
    {
      id: 'quantum_concert',
      name: 'Quantum Music Concert Hall',
      category: 'multiplayer',
      complexity: 'Advanced',
      dimensions: {
        spatial: 'Volumetric',
        temporal: 'Reactive',
        interactive: 'Neural',
        social: 'Multiplayer'
      },
      features: [
        'Quantum-reactive visuals',
        'Audience emotion sync',
        'Real-time sound synthesis',
        'Holographic performers',
        'Spatial audio mixing',
        'Crowd interaction effects'
      ],
      description: 'A concert hall where music and visuals react to quantum fluctuations and audience emotions.',
      previewUrl: '/api/placeholder/600/400',
      timelineLength: 7200, // 2 hours
      maxUsers: 10000,
      assets: {
        models: 3456,
        animations: 567,
        audioTracks: 189,
        interactiveElements: 345
      },
      aiFeatures: {
        procedural: true,
        adaptive: true,
        predictive: false,
        generative: true
      },
      platform: ['Web', 'VR', 'AR', 'MR', 'Mobile'],
      rating: 4.9,
      downloads: 45600,
      fileSize: '22.1 GB'
    },
    {
      id: 'memory_palace',
      name: 'Interactive Memory Palace',
      category: 'temporal',
      complexity: 'Intermediate',
      dimensions: {
        spatial: '6DOF',
        temporal: 'Reactive',
        interactive: 'Gesture',
        social: 'Collaborative'
      },
      features: [
        'Memory technique training',
        'Spatial memory enhancement',
        'Personalized content',
        'Progress tracking',
        'Collaborative learning',
        'Adaptive difficulty'
      ],
      description: 'Learn and practice the ancient memory palace technique in an interactive 3D environment.',
      previewUrl: '/api/placeholder/600/400',
      timelineLength: 2700, // 45 minutes
      maxUsers: 20,
      assets: {
        models: 1234,
        animations: 89,
        audioTracks: 56,
        interactiveElements: 167
      },
      aiFeatures: {
        procedural: false,
        adaptive: true,
        predictive: false,
        generative: false
      },
      platform: ['Web', 'VR', 'MR'],
      rating: 4.5,
      downloads: 18900,
      fileSize: '5.7 GB'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: Layers },
    { id: 'interactive', name: 'Interactive', icon: Gamepad2 },
    { id: 'temporal', name: 'Temporal', icon: Clock },
    { id: 'reactive', name: 'Reactive', icon: Zap },
    { id: 'multiplayer', name: 'Multiplayer', icon: Users },
    { id: 'educational', name: 'Educational', icon: Eye }
  ];

  const complexityLevels = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = filterCategory === 'all' || template.category === filterCategory;
    const complexityMatch = filterComplexity === 'all' || template.complexity === filterComplexity;
    return categoryMatch && complexityMatch;
  });

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case 'spatial': return 'from-blue-500 to-cyan-500';
      case 'temporal': return 'from-purple-500 to-pink-500';
      case 'interactive': return 'from-green-500 to-emerald-500';
      case 'social': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const playTemplate = (template: Template4D) => {
    setSelectedTemplate(template);
    setIsPlaying(true);
    setCurrentTime(0);
    console.log(`Loading 4D template: ${template.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              ⚡ 4D Immersive Templates
            </h1>
            <p className="text-gray-300">
              Revolutionary templates with time, interaction, and dimension control
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition flex items-center gap-3 ${
                        filterCategory === category.id
                          ? 'bg-purple-600/30 border border-purple-500/50'
                          : 'bg-black/20 hover:bg-black/30'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complexity */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">Complexity</h3>
              <div className="space-y-2">
                {complexityLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilterComplexity(level)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      filterComplexity === level
                        ? 'bg-purple-600/30 border border-purple-500/50'
                        : 'bg-black/20 hover:bg-black/30'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Legend */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">4D Dimensions</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                  <span className="text-sm">Spatial (3D/6DOF)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                  <span className="text-sm">Temporal (Time)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
                  <span className="text-sm">Interactive</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
                  <span className="text-sm">Social</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {filteredTemplates.length} 4D Templates
              </h2>
              <p className="text-gray-400">
                Revolutionary immersive experiences across multiple dimensions
              </p>
            </div>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group"
                >
                  {/* Preview */}
                  <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {template.category === 'interactive' && '🎮'}
                      {template.category === 'temporal' && '⏰'}
                      {template.category === 'reactive' && '⚡'}
                      {template.category === 'multiplayer' && '👥'}
                      {template.category === 'educational' && '🧠'}
                    </div>
                    
                    {/* Complexity Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        template.complexity === 'Expert' ? 'bg-red-500' :
                        template.complexity === 'Advanced' ? 'bg-orange-500' :
                        template.complexity === 'Intermediate' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}>
                        {template.complexity}
                      </span>
                    </div>

                    {/* AI Features */}
                    <div className="absolute top-3 right-3 flex gap-1">
                      {template.aiFeatures.adaptive && <span className="bg-blue-500 text-xs px-2 py-1 rounded">AI</span>}
                      {template.aiFeatures.procedural && <span className="bg-green-500 text-xs px-2 py-1 rounded">Gen</span>}
                      {template.aiFeatures.predictive && <span className="bg-purple-500 text-xs px-2 py-1 rounded">Pred</span>}
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => playTemplate(template)}
                        className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 transition"
                      >
                        <Play className="h-8 w-8 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl group-hover:text-purple-400 transition-colors">
                        {template.name}
                      </h3>
                      <div className="text-sm text-gray-400">
                        {formatTime(template.timelineLength)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Dimensions */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-xs">
                        <span className="text-gray-500">Spatial:</span>
                        <span className="ml-1 font-medium">{template.dimensions.spatial}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">Temporal:</span>
                        <span className="ml-1 font-medium">{template.dimensions.temporal}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">Interactive:</span>
                        <span className="ml-1 font-medium">{template.dimensions.interactive}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-gray-500">Social:</span>
                        <span className="ml-1 font-medium">{template.dimensions.social}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                      <span>{template.maxUsers} max users</span>
                      <span>{template.fileSize}</span>
                      <span>{template.downloads.toLocaleString()} downloads</span>
                    </div>

                    {/* Platform Support */}
                    <div className="flex gap-2 mb-4">
                      {template.platform.map((platform) => (
                        <span
                          key={platform}
                          className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>

                    {/* Features Preview */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Key Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{template.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => playTemplate(template)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                      >
                        <Play className="h-4 w-4" />
                        Load Template
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Template Player Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedTemplate.name}</h2>
                  <p className="text-gray-400">{selectedTemplate.description}</p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  ✕
                </button>
              </div>

              {/* Template Viewer */}
              <div className="bg-black/40 rounded-xl mb-6 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center relative">
                  <div className="text-8xl">
                    {selectedTemplate.category === 'interactive' && '🎮'}
                    {selectedTemplate.category === 'temporal' && '⏰'}
                    {selectedTemplate.category === 'reactive' && '⚡'}
                    {selectedTemplate.category === 'multiplayer' && '👥'}
                    {selectedTemplate.category === 'educational' && '🧠'}
                  </div>
                  
                  {/* 4D Dimension Visualization */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {Object.entries(selectedTemplate.dimensions).map(([key, value]) => (
                      <div
                        key={key}
                        className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getDimensionColor(key)}`}
                      >
                        {key}: {value}
                      </div>
                    ))}
                  </div>

                  {/* Loading Status */}
                  {isPlaying && (
                    <div className="absolute bottom-4 right-4 bg-green-500/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 text-green-400">
                        <RotateCw className="w-4 h-4 animate-spin" />
                        <span className="text-sm font-medium">Loading 4D Template...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="p-4 bg-black/60">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-400 h-2 rounded-full transition-all"
                          style={{ width: `${(currentTime / selectedTemplate.timelineLength) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <span className="text-sm text-gray-400">
                      {formatTime(currentTime)} / {formatTime(selectedTemplate.timelineLength)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Template Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Features</h3>
                    <div className="space-y-2">
                      {selectedTemplate.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-purple-400" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">AI Capabilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.aiFeatures.procedural && (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          Procedural Generation
                        </span>
                      )}
                      {selectedTemplate.aiFeatures.adaptive && (
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          Adaptive AI
                        </span>
                      )}
                      {selectedTemplate.aiFeatures.predictive && (
                        <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                          Predictive Modeling
                        </span>
                      )}
                      {selectedTemplate.aiFeatures.generative && (
                        <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm">
                          Generative Content
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3">Technical Specifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeline Length:</span>
                        <span>{formatTime(selectedTemplate.timelineLength)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Users:</span>
                        <span>{selectedTemplate.maxUsers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">File Size:</span>
                        <span>{selectedTemplate.fileSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">3D Models:</span>
                        <span>{selectedTemplate.assets.models.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Animations:</span>
                        <span>{selectedTemplate.assets.animations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Audio Tracks:</span>
                        <span>{selectedTemplate.assets.audioTracks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Interactive Elements:</span>
                        <span>{selectedTemplate.assets.interactiveElements}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Platform Support</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.platform.map((platform) => (
                        <span
                          key={platform}
                          className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2">
                    <Play className="h-5 w-5" />
                    Load 4D Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}