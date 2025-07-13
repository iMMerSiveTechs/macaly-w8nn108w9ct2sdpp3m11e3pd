'use client';
import { useState } from 'react';
import { Play, Eye, Smartphone, Monitor, Download, Share2 } from 'lucide-react';

interface VisionOSViewerProps {
  realmData?: any;
  previewMode?: 'desktop' | 'mobile' | 'vr';
}

export default function VisionOSViewer({ realmData, previewMode = 'vr' }: VisionOSViewerProps) {
  const [currentMode, setCurrentMode] = useState(previewMode);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchVR = async () => {
    setIsLaunching(true);
    
    // Simulate VR launch process
    setTimeout(() => {
      setIsLaunching(false);
      alert('🥽 VisionOS experience launching! In production, this would open your realm in spatial computing mode.');
    }, 2000);
  };

  const mockRealm = realmData || {
    name: "Mystical Forest Temple",
    objects: 12,
    size: "Large",
    theme: "Fantasy"
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-purple-400">👓</span>
            VisionOS Preview
          </h3>
          <p className="text-gray-300 text-sm">Experience your realm in spatial computing</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMode('desktop')}
            className={`p-2 rounded-lg transition-colors ${
              currentMode === 'desktop' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title="Desktop Preview"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentMode('mobile')}
            className={`p-2 rounded-lg transition-colors ${
              currentMode === 'mobile' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title="Mobile Preview"
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentMode('vr')}
            className={`p-2 rounded-lg transition-colors ${
              currentMode === 'vr' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            title="VR Preview"
          >
            <span className="text-sm">👓</span>
          </button>
        </div>
      </div>

      {/* Preview Window */}
      <div className="relative mb-6">
        <div className={`relative overflow-hidden rounded-lg bg-black/50 ${
          currentMode === 'mobile' ? 'mx-auto max-w-sm aspect-[9/16]' : 
          currentMode === 'desktop' ? 'aspect-video' : 
          'aspect-square'
        }`}>
          {/* Immersive VR Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: currentMode === 'vr' 
                ? 'url(https://images.pexels.com/photos/8721318/pexels-photo-8721318.jpeg)'
                : 'url(https://images.pexels.com/photos/18069363/pexels-photo-18069363.png)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
          </div>

          {/* Overlay Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-2">
                <h4 className="font-bold text-sm">{mockRealm.name}</h4>
                <p className="text-xs text-gray-300">{mockRealm.objects} objects</p>
              </div>
              
              {currentMode === 'vr' && (
                <div className="bg-purple-600/80 backdrop-blur-md rounded-lg px-3 py-1">
                  <span className="text-xs font-medium">SPATIAL</span>
                </div>
              )}
            </div>

            <div className="text-center">
              {isLaunching ? (
                <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-3">
                  <div className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Initializing spatial experience...</p>
                </div>
              ) : (
                <button
                  onClick={handleLaunchVR}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
                >
                  <Play className="h-4 w-4" />
                  {currentMode === 'vr' ? 'Launch in VisionOS' : 'Preview Realm'}
                </button>
              )}
            </div>
          </div>

          {/* Simulated UI Elements for VR Mode */}
          {currentMode === 'vr' && !isLaunching && (
            <>
              {/* Floating panels */}
              <div className="absolute top-1/4 left-4 bg-white/10 backdrop-blur-md rounded-lg p-2 text-xs">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-1"></div>
                <p>Build Panel</p>
              </div>
              
              <div className="absolute top-1/3 right-4 bg-white/10 backdrop-blur-md rounded-lg p-2 text-xs">
                <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded mb-1"></div>
                <p>AI Copilot</p>
              </div>

              {/* Hand tracking indicators */}
              <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </>
          )}
        </div>
      </div>

      {/* Realm Info */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-400">{mockRealm.objects}</div>
          <div className="text-xs text-gray-300">Objects</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-400">{mockRealm.size}</div>
          <div className="text-xs text-gray-300">Size</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-400">{mockRealm.theme}</div>
          <div className="text-xs text-gray-300">Theme</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-400">60fps</div>
          <div className="text-xs text-gray-300">Performance</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
          <Eye className="h-4 w-4" />
          Full Preview
        </button>
        
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
          <Download className="h-4 w-4" />
          Export
        </button>
        
        <button className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      {/* VisionOS Badge */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-full px-4 py-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>VisionOS Compatible</span>
        </div>
      </div>
    </div>
  );
}