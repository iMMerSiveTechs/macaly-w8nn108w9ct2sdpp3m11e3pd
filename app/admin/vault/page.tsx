"use client"

import { useState } from 'react';
import Link from 'next/link';

interface FeatureModule {
  id: string;
  name: string;
  status: 'active' | 'beta' | 'development';
  description: string;
  category: string;
  lastUpdated: string;
  usage: number;
}

const featureModules: FeatureModule[] = [
  { id: 'world-builder', name: 'World Builder', status: 'active', description: 'Drag-and-drop 3D world creation', category: 'Core', lastUpdated: '2025-07-13', usage: 95 },
  { id: 'ai-copilot', name: 'AI Copilot', status: 'active', description: 'Intelligent creation assistant', category: 'AI', lastUpdated: '2025-07-13', usage: 88 },
  { id: 'multiplayer-lobby', name: 'Multiplayer Lobbies', status: 'active', description: 'Real-time collaboration rooms', category: 'Social', lastUpdated: '2025-07-13', usage: 76 },
  { id: 'visionos-panels', name: 'VisionOS Panels', status: 'beta', description: 'Spatial computing interface', category: 'XR', lastUpdated: '2025-07-13', usage: 45 },
  { id: 'object-scanner', name: 'Object Scanner', status: 'active', description: 'Photo-to-3D AI conversion', category: 'AI', lastUpdated: '2025-07-13', usage: 67 },
  { id: 'nft-creator', name: 'NFT Pass Creator', status: 'active', description: 'Blockchain access tokens', category: 'Blockchain', lastUpdated: '2025-07-13', usage: 52 },
  { id: 'sonarium', name: 'Sonarium Audio', status: 'active', description: 'Spatial audio system', category: 'Media', lastUpdated: '2025-07-13', usage: 71 },
  { id: 'controller-input', name: 'Controller Support', status: 'active', description: 'PS5/Xbox haptic integration', category: 'Input', lastUpdated: '2025-07-13', usage: 63 },
  { id: 'stripe-vault', name: 'Stripe Integration', status: 'active', description: 'Payment and licensing system', category: 'Commerce', lastUpdated: '2025-07-13', usage: 89 },
  { id: 'admin-cms', name: 'Admin CMS', status: 'active', description: 'Content management system', category: 'Admin', lastUpdated: '2025-07-13', usage: 92 }
];

export default function AdminVault() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', ...Array.from(new Set(featureModules.map(m => m.category)))];
  
  const filteredModules = featureModules.filter(module => {
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'beta': return 'bg-yellow-500';
      case 'development': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTotalStats = () => {
    const active = featureModules.filter(m => m.status === 'active').length;
    const beta = featureModules.filter(m => m.status === 'beta').length;
    const avgUsage = Math.round(featureModules.reduce((sum, m) => sum + m.usage, 0) / featureModules.length);
    
    return { active, beta, total: featureModules.length, avgUsage };
  };

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">🔐 Admin Vault</h1>
            <p className="text-gray-400">Master implementation dashboard and feature management</p>
          </div>
          
          <div className="flex space-x-3">
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              ← Back to Admin
            </Link>
            <Link
              href="/demo"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              🚀 Live Demo
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">{stats.active}</div>
            <div className="text-sm text-gray-400">Active Modules</div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">{stats.beta}</div>
            <div className="text-sm text-gray-400">Beta Features</div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Features</div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400">{stats.avgUsage}%</div>
            <div className="text-sm text-gray-400">Avg Usage</div>
          </div>
        </div>
      </div>

      {/* Implementation Summary */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">📋 Implementation Summary</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-purple-300">🧠 Core Systems</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ AI-powered world builder with prefab support</li>
              <li>✅ Firebase real-time database integration</li>
              <li>✅ Stripe payment and licensing system</li>
              <li>✅ Admin CMS with content moderation</li>
              <li>✅ User authentication and tier management</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-blue-300">🎮 Advanced Features</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ VisionOS spatial computing interface</li>
              <li>✅ Multiplayer collaboration rooms</li>
              <li>✅ AI object scanning (photo-to-3D)</li>
              <li>✅ NFT pass creation and management</li>
              <li>✅ Controller haptics (PS5/Xbox)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="text-sm text-gray-300">
            <strong>🚀 Last Major Update:</strong> July 13, 2025 - VisionOS panels, multiplayer lobbies, and AI object scanner deployed
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredModules.map((module) => (
          <div key={module.id} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold">{module.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(module.status)}`} />
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded capitalize">
                    {module.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{module.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Updated: {module.lastUpdated}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-400">Usage: </span>
                  <span className="font-semibold">{module.usage}%</span>
                </div>
                
                <div className="w-16 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${module.usage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="inline-block px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                {module.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No modules found matching your criteria</div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12 bg-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/tools"
            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">🛠️</div>
            <div className="font-semibold">Tools Hub</div>
          </Link>
          
          <Link
            href="/world-builder"
            className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">🏗️</div>
            <div className="font-semibold">World Builder</div>
          </Link>
          
          <Link
            href="/admin"
            className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold">Admin Panel</div>
          </Link>
          
          <Link
            href="/demo"
            className="p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-semibold">Live Demo</div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500">
        <p>Nemurium Admin Vault • Built with Next.js, Firebase, and cutting-edge XR technology</p>
        <p className="text-xs mt-2">All systems operational • Last deployment: July 13, 2025</p>
      </div>
    </div>
  );
}