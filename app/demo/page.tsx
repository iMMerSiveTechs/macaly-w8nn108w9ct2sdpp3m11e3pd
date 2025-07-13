"use client"

import { useState } from 'react';
import { useControllerInput } from '@/hooks/useControllerInput';
import MultiplayerLobby from '@/components/MultiplayerLobby';
import NFTPassCreator from '@/components/NFTPassCreator';
import ObjectScanner from '@/components/ObjectScanner';
import ScrollDownHint from '@/components/ScrollDownHint';
import { 
  VisionOSPanelManager, 
  ToolsPanel, 
  PropertiesPanel, 
  AssetsPanel 
} from '@/components/VisionOSPanel';

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<string>('overview');
  const [showVisionOSPanels, setShowVisionOSPanels] = useState(false);

  // Controller input handling
  const { connectedControllers, triggerHaptic } = useControllerInput((button, pressed) => {
    if (pressed) {
      console.log(`🎮 Button pressed: ${button}`);
      triggerHaptic(0.5, 200);
    }
  });

  const demos = [
    { id: 'overview', name: '🌟 Overview', description: 'Platform capabilities showcase' },
    { id: 'multiplayer', name: '👥 Multiplayer Lobby', description: 'Real-time collaboration' },
    { id: 'nft', name: '🎟️ NFT Pass Creator', description: 'Blockchain integration' },
    { id: 'scanner', name: '📸 Object Scanner', description: 'AI-powered 3D generation' },
    { id: 'visionos', name: '🥽 VisionOS Interface', description: 'Spatial computing UI' },
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case 'multiplayer':
        return <MultiplayerLobby realmId="demo-realm-123" maxPlayers={8} />;
      
      case 'nft':
        return <NFTPassCreator />;
      
      case 'scanner':
        return <ObjectScanner />;
      
      case 'visionos':
        return (
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">VisionOS Floating Panels</h3>
              <p className="text-gray-400 mb-6">
                Experience spatial computing interface with draggable, resizable panels
              </p>
              
              <button
                onClick={() => setShowVisionOSPanels(!showVisionOSPanels)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {showVisionOSPanels ? 'Hide Panels' : 'Show VisionOS Panels'}
              </button>
            </div>
            
            {showVisionOSPanels && (
              <div className="text-sm text-gray-400 bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Panel Controls:</h4>
                <ul className="space-y-1 text-left">
                  <li>• Drag panels by their headers</li>
                  <li>• Red dot: Close/minimize</li>
                  <li>• Yellow dot: Placeholder</li>
                  <li>• Green dot: Lock/unlock dragging</li>
                  <li>• Resize from bottom-right corner</li>
                  <li>• Click anywhere on panel to bring to front</li>
                </ul>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className="text-center max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Feature Cards */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-bold mb-2">Controller Support</h3>
                <p className="text-gray-400 text-sm">
                  Full PS5/Xbox controller integration with haptic feedback
                </p>
                <div className="mt-4 text-sm">
                  {connectedControllers > 0 ? (
                    <span className="text-green-400">✓ {connectedControllers} controller(s) connected</span>
                  ) : (
                    <span className="text-gray-500">No controllers detected</span>
                  )}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-2">Multiplayer Realms</h3>
                <p className="text-gray-400 text-sm">
                  Real-time collaboration in shared 3D environments
                </p>
                <div className="mt-4">
                  <button 
                    onClick={() => setActiveDemo('multiplayer')}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Try Demo →
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-2">NFT Integration</h3>
                <p className="text-gray-400 text-sm">
                  Create and manage blockchain-based access passes
                </p>
                <div className="mt-4">
                  <button 
                    onClick={() => setActiveDemo('nft')}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Try Creator →
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">📸</div>
                <h3 className="text-xl font-bold mb-2">AI Object Scanning</h3>
                <p className="text-gray-400 text-sm">
                  Convert photos to 3D models using AI photogrammetry
                </p>
                <div className="mt-4">
                  <button 
                    onClick={() => setActiveDemo('scanner')}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Try Scanner →
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">🥽</div>
                <h3 className="text-xl font-bold mb-2">VisionOS Interface</h3>
                <p className="text-gray-400 text-sm">
                  Spatial computing UI with floating panels
                </p>
                <div className="mt-4">
                  <button 
                    onClick={() => setActiveDemo('visionos')}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Try Interface →
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-bold mb-2">Spatial Audio</h3>
                <p className="text-gray-400 text-sm">
                  3D positioned audio for immersive experiences
                </p>
                <div className="mt-4">
                  <button 
                    onClick={() => window.open('/sonarium', '_blank')}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Open Sonarium →
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">🚀 Platform Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-purple-400">15+</div>
                  <div className="text-sm text-gray-400">Immersive Tools</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">500+</div>
                  <div className="text-sm text-gray-400">3D Prefabs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-gray-400">WebXR Compatible</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400">8</div>
                  <div className="text-sm text-gray-400">Max Players/Realm</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            🚀 Nemurium Demo Portal
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the future of immersive creation. Test our AI-powered tools, 
            multiplayer systems, and spatial computing interfaces.
          </p>
          
          {connectedControllers > 0 && (
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4 max-w-md mx-auto mb-8">
              <div className="text-green-300">
                🎮 Controller detected! Try pressing buttons for haptic feedback.
              </div>
            </div>
          )}
        </div>
        
        <ScrollDownHint />
      </section>

      {/* Demo Navigation */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeDemo === demo.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {demo.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {demos.find(d => d.id === activeDemo)?.name}
            </h2>
            <p className="text-gray-400">
              {demos.find(d => d.id === activeDemo)?.description}
            </p>
          </div>
          
          {renderDemo()}
        </div>
      </section>

      {/* VisionOS Panels */}
      {showVisionOSPanels && (
        <VisionOSPanelManager>
          <ToolsPanel />
          <PropertiesPanel />
          <AssetsPanel />
        </VisionOSPanelManager>
      )}

      {/* Footer */}
      <footer className="py-12 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <div className="text-gray-400 mb-4">
            Built with Next.js, Three.js, Firebase, and cutting-edge XR technology
          </div>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/tools" className="text-blue-400 hover:text-blue-300">Tools Hub</a>
            <a href="/world-builder" className="text-blue-400 hover:text-blue-300">World Builder</a>
            <a href="/admin" className="text-blue-400 hover:text-blue-300">Admin Console</a>
            <a href="/" className="text-blue-400 hover:text-blue-300">Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
}