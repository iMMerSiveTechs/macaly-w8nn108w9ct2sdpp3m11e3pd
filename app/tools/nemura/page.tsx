'use client';
import { useState, useEffect } from 'react';
import { Brain, Zap, Upload, Download, Play, Pause, Volume2, Settings, Sparkles, Wand2 } from 'lucide-react';

interface NeuralNetwork {
  id: string;
  name: string;
  type: 'world-generator' | 'npc-brain' | 'terrain-sculptor' | 'audio-weaver' | 'style-transfer';
  status: 'training' | 'ready' | 'processing' | 'error';
  accuracy: number;
  trainingProgress: number;
  lastTrained: string;
  parameters: number;
  inputType: string;
  outputType: string;
}

interface TrainingData {
  id: string;
  name: string;
  type: string;
  size: string;
  quality: 'raw' | 'processed' | 'refined';
  status: 'uploaded' | 'processing' | 'ready';
}

export default function NemuraPage() {
  const [networks, setNetworks] = useState<NeuralNetwork[]>([]);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [activeTab, setActiveTab] = useState('networks');
  const [isTraining, setIsTraining] = useState(false);

  const tabs = [
    { id: 'networks', name: 'Neural Networks', icon: Brain },
    { id: 'training', name: 'Training Data', icon: Upload },
    { id: 'playground', name: 'AI Playground', icon: Sparkles },
    { id: 'analytics', name: 'Performance', icon: Zap }
  ];

  useEffect(() => {
    // Mock neural networks
    const mockNetworks: NeuralNetwork[] = [
      {
        id: '1',
        name: 'WorldForge Alpha',
        type: 'world-generator',
        status: 'ready',
        accuracy: 94.2,
        trainingProgress: 100,
        lastTrained: '2 hours ago',
        parameters: 175000000,
        inputType: 'Text prompt',
        outputType: '3D world layout'
      },
      {
        id: '2',
        name: 'NPCMind Pro',
        type: 'npc-brain',
        status: 'training',
        accuracy: 87.8,
        trainingProgress: 73,
        lastTrained: 'Training now',
        parameters: 340000000,
        inputType: 'Behavior patterns',
        outputType: 'NPC responses'
      },
      {
        id: '3',
        name: 'TerrainSculptor',
        type: 'terrain-sculptor',
        status: 'ready',
        accuracy: 91.5,
        trainingProgress: 100,
        lastTrained: '1 day ago',
        parameters: 89000000,
        inputType: 'Heightmap + style',
        outputType: 'Detailed terrain'
      },
      {
        id: '4',
        name: 'SonicWeaver',
        type: 'audio-weaver',
        status: 'processing',
        accuracy: 88.9,
        trainingProgress: 100,
        lastTrained: '3 hours ago',
        parameters: 125000000,
        inputType: 'Audio description',
        outputType: 'Spatial audio'
      }
    ];

    const mockTrainingData: TrainingData[] = [
      {
        id: '1',
        name: 'Fantasy_Worlds_Dataset_v3',
        type: 'World layouts',
        size: '47.2 GB',
        quality: 'refined',
        status: 'ready'
      },
      {
        id: '2',
        name: 'NPC_Dialogue_Corpus',
        type: 'Conversation data',
        size: '23.8 GB',
        quality: 'processed',
        status: 'ready'
      },
      {
        id: '3',
        name: 'Terrain_Elevation_Maps',
        type: 'Heightmaps',
        size: '156.7 GB',
        quality: 'refined',
        status: 'ready'
      },
      {
        id: '4',
        name: 'Ambient_Audio_Library',
        type: 'Audio samples',
        size: '89.3 GB',
        quality: 'raw',
        status: 'processing'
      }
    ];

    setNetworks(mockNetworks);
    setTrainingData(mockTrainingData);

    // Simulate training progress
    const interval = setInterval(() => {
      setNetworks(prev => prev.map(network => {
        if (network.status === 'training' && network.trainingProgress < 100) {
          return {
            ...network,
            trainingProgress: Math.min(network.trainingProgress + Math.random() * 3, 100),
            accuracy: Math.min(network.accuracy + Math.random() * 0.5, 99.9)
          };
        }
        return network;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-400 bg-green-400/20';
      case 'training': return 'text-blue-400 bg-blue-400/20';
      case 'processing': return 'text-purple-400 bg-purple-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'refined': return 'text-green-400 bg-green-400/20';
      case 'processed': return 'text-blue-400 bg-blue-400/20';
      case 'raw': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getNetworkIcon = (type: string) => {
    switch (type) {
      case 'world-generator': return '🌍';
      case 'npc-brain': return '🧠';
      case 'terrain-sculptor': return '🏔️';
      case 'audio-weaver': return '🎵';
      case 'style-transfer': return '🎨';
      default: return '⚡';
    }
  };

  const startTraining = (networkId: string) => {
    setIsTraining(true);
    setNetworks(prev => prev.map(network => 
      network.id === networkId 
        ? { ...network, status: 'training', trainingProgress: 0 }
        : network
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-pink-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-purple-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🧠 Nemura AI Engine
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center gap-2 bg-purple-600/80 hover:bg-purple-600 px-4 py-2 rounded-lg transition">
                <Settings className="h-4 w-4" />
                Configure
              </button>
              <button className="flex items-center gap-2 bg-pink-600/80 hover:bg-pink-600 px-4 py-2 rounded-lg transition">
                <Wand2 className="h-4 w-4" />
                Train New Model
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-purple-600/50 text-white border border-purple-500'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Neural Networks Tab */}
        {activeTab === 'networks' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Active Neural Networks
              </h3>
              
              <div className="grid gap-6">
                {networks.map((network) => (
                  <div
                    key={network.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-purple-500/50 transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{getNetworkIcon(network.type)}</div>
                        <div>
                          <h4 className="text-xl font-bold">{network.name}</h4>
                          <p className="text-gray-400 capitalize">{network.type.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded ${getStatusColor(network.status)}`}>
                        {network.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Accuracy</div>
                        <div className="text-lg font-bold text-green-400">{network.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Parameters</div>
                        <div className="text-lg font-bold">{(network.parameters / 1000000).toFixed(0)}M</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Input</div>
                        <div className="text-sm font-medium">{network.inputType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Output</div>
                        <div className="text-sm font-medium">{network.outputType}</div>
                      </div>
                    </div>

                    {network.status === 'training' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Training Progress</span>
                          <span>{Math.round(network.trainingProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${network.trainingProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        Last trained: {network.lastTrained}
                      </div>
                      <div className="flex gap-2">
                        {network.status === 'ready' && (
                          <>
                            <button
                              onClick={() => startTraining(network.id)}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Retrain
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                              Deploy
                            </button>
                          </>
                        )}
                        {network.status === 'training' && (
                          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                            Stop Training
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Training Data Tab */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Training Datasets
                </h3>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Dataset
                </button>
              </div>
              
              <div className="grid gap-4">
                {trainingData.map((data) => (
                  <div
                    key={data.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-500/50 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-1">{data.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Type: {data.type}</span>
                          <span>Size: {data.size}</span>
                          <span className={`px-2 py-1 rounded text-xs ${getQualityColor(data.quality)}`}>
                            {data.quality.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(data.status)}`}>
                          {data.status.toUpperCase()}
                        </span>
                        <button className="text-gray-400 hover:text-white p-1">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Playground Tab */}
        {activeTab === 'playground' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Playground
              </h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-4">Test Your Models</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Select Model</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-purple-500">
                        <option>WorldForge Alpha</option>
                        <option>NPCMind Pro</option>
                        <option>TerrainSculptor</option>
                        <option>SonicWeaver</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Input Prompt</label>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 h-32 resize-none focus:outline-none focus:border-purple-500"
                        placeholder="Enter your prompt here..."
                      />
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium">
                      Generate
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold mb-4">Output Preview</h4>
                  <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 h-64 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Sparkles className="h-12 w-12 mx-auto mb-2" />
                      <p>Output will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Performance Analytics
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">4</div>
                  <div className="text-sm text-gray-400">Active Models</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">91.2%</div>
                  <div className="text-sm text-gray-400">Avg Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">2.4s</div>
                  <div className="text-sm text-gray-400">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">847</div>
                  <div className="text-sm text-gray-400">Total Runs</div>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-white/10 rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Zap className="h-12 w-12 mx-auto mb-2" />
                  <p>Performance charts will display here</p>
                  <p className="text-sm mt-1">Real-time metrics and usage analytics</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}