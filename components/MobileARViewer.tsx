/**
 * Mobile AR Viewer for Nemurium
 * Real AR integration for iOS and Android devices
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Download, Share, X, RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface ARObject {
  id: string;
  type: string;
  modelUrl: string;
  position: { x: number; y: number; z: number };
  scale: number;
  rotation: number;
}

interface ARSession {
  isActive: boolean;
  isSupported: boolean;
  hasPermission: boolean;
  objects: ARObject[];
}

declare global {
  interface Navigator {
    xr?: {
      isSessionSupported: (mode: string) => Promise<boolean>;
      requestSession: (mode: string, options?: any) => Promise<any>;
    };
  }
}

export default function MobileARViewer() {
  const [arSession, setARSession] = useState<ARSession>({
    isActive: false,
    isSupported: false,
    hasPermission: false,
    objects: []
  });
  
  const [selectedObject, setSelectedObject] = useState<ARObject | null>(null);
  const [isPlacementMode, setIsPlacementMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check AR support on component mount
  useEffect(() => {
    checkARSupport();
    requestCameraPermission();
    setupDeviceOrientation();
    
    return () => {
      stopCamera();
    };
  }, []);

  const checkARSupport = async () => {
    try {
      // Check for WebXR AR support
      if (navigator.xr) {
        const supported = await navigator.xr.isSessionSupported('immersive-ar');
        setARSession(prev => ({ ...prev, isSupported: supported }));
      } else if ('DeviceOrientationEvent' in window) {
        // Fallback for older devices - use device orientation + camera
        setARSession(prev => ({ ...prev, isSupported: true }));
      }
    } catch (error) {
      console.error('AR support check failed:', error);
      // Enable fallback mode
      setARSession(prev => ({ ...prev, isSupported: true }));
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setARSession(prev => ({ ...prev, hasPermission: true }));
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera permission denied:', error);
      setARSession(prev => ({ ...prev, hasPermission: false }));
    }
  };

  const setupDeviceOrientation = () => {
    if (typeof window === 'undefined') return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setDeviceOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0
      });
    };

    // Request permission for iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      // Android and older iOS
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  };

  const startARSession = async () => {
    try {
      if (navigator.xr) {
        // Use WebXR if available
        const session = await navigator.xr.requestSession('immersive-ar', {
          requiredFeatures: ['local', 'hit-test'],
          optionalFeatures: ['dom-overlay'],
          domOverlay: { root: document.body }
        });
        
        setARSession(prev => ({ ...prev, isActive: true }));
        setupWebXRSession(session);
      } else {
        // Fallback: Use camera + device orientation
        await startCameraFeed();
        setARSession(prev => ({ ...prev, isActive: true }));
      }
    } catch (error) {
      console.error('Failed to start AR session:', error);
      alert('Failed to start AR. Please ensure you have a compatible device and granted camera permissions.');
    }
  };

  const setupWebXRSession = (session: any) => {
    // WebXR implementation would go here
    console.log('WebXR session started:', session);
  };

  const startCameraFeed = async () => {
    if (!streamRef.current) {
      await requestCameraPermission();
    }
    
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const stopARSession = () => {
    setARSession(prev => ({ ...prev, isActive: false }));
    stopCamera();
  };

  const placeObject = (type: string) => {
    const newObject: ARObject = {
      id: Date.now().toString(),
      type,
      modelUrl: `/models/${type}.glb`,
      position: { x: 0, y: 0, z: -2 }, // 2 meters in front
      scale: 1,
      rotation: 0
    };

    setARSession(prev => ({
      ...prev,
      objects: [...prev.objects, newObject]
    }));

    setSelectedObject(newObject);
    setIsPlacementMode(false);
  };

  const updateObjectTransform = (objectId: string, updates: Partial<ARObject>) => {
    setARSession(prev => ({
      ...prev,
      objects: prev.objects.map(obj => 
        obj.id === objectId ? { ...obj, ...updates } : obj
      )
    }));

    if (selectedObject?.id === objectId) {
      setSelectedObject(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteObject = (objectId: string) => {
    setARSession(prev => ({
      ...prev,
      objects: prev.objects.filter(obj => obj.id !== objectId)
    }));
    
    if (selectedObject?.id === objectId) {
      setSelectedObject(null);
    }
  };

  const takeScreenshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw camera feed
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw AR objects overlay (simplified representation)
    arSession.objects.forEach(obj => {
      const x = canvas.width / 2 + obj.position.x * 100;
      const y = canvas.height / 2 + obj.position.y * 100;
      const size = 50 * obj.scale;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(x - size/2, y - size/2, size, size);
      
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(obj.type, x, y + 5);
    });

    // Download screenshot
    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nemurium_ar_${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const shareARExperience = async () => {
    const shareData = {
      title: 'Check out my Nemurium AR creation!',
      text: 'I created this amazing AR experience in Nemurium',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };

  const AR_OBJECTS = [
    { type: 'tree', name: '🌲 Tree', model: '/models/tree.glb' },
    { type: 'crystal', name: '💎 Crystal', model: '/models/crystal.glb' },
    { type: 'portal', name: '🌀 Portal', model: '/models/portal.glb' },
    { type: 'house', name: '🏠 House', model: '/models/house.glb' }
  ];

  if (!arSession.isSupported) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-2xl font-bold mb-4">AR Not Supported</h2>
          <p className="text-gray-400 mb-6">
            Your device doesn't support AR features. Please try on a newer mobile device with AR capabilities.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!arSession.hasPermission) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📷</div>
          <h2 className="text-2xl font-bold mb-4">Camera Access Required</h2>
          <p className="text-gray-400 mb-6">
            To use AR features, we need access to your device's camera.
          </p>
          <button
            onClick={requestCameraPermission}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Grant Camera Access
          </button>
        </div>
      </div>
    );
  }

  if (!arSession.isActive) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/12960383/pexels-photo-12960383.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="VR Experience Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-20 left-20 w-40 h-40 opacity-15">
          <img 
            src="https://images.pexels.com/photos/30547606/pexels-photo-30547606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="3D Elements"
            className="w-full h-full object-cover rounded-full blur-lg animate-pulse"
          />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="text-4xl">🥽</div>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              AR Experience Ready
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Step into the future of immersive creation. Point your device at a flat surface and start placing 3D objects in the real world.
            </p>
          </div>
          
          {showInstructions && (
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-6 mb-6 text-left backdrop-blur-sm">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-sm">📋</div>
                Quick Start Guide
              </h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Find a well-lit area with a flat surface
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Hold your device steady and allow camera access
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Tap to place objects in your space
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  Pinch to scale, rotate to turn objects
                </li>
              </ul>
              <button
                onClick={() => setShowInstructions(false)}
                className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Got it, don't show again
              </button>
            </div>
          )}
          
          <button
            onClick={startARSession}
            className="group relative bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-10 py-4 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              Launch AR Experience
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              WebXR Ready
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              iOS & Android
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Real-time Sync
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Hidden canvas for screenshots */}
      <canvas ref={canvasRef} className="hidden" />

      {/* AR Objects Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {arSession.objects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute pointer-events-auto ${
              selectedObject?.id === obj.id ? 'ring-2 ring-purple-500' : ''
            }`}
            style={{
              left: `calc(50% + ${obj.position.x * 100}px)`,
              top: `calc(50% + ${obj.position.y * 100}px)`,
              transform: `translate(-50%, -50%) scale(${obj.scale}) rotate(${obj.rotation}deg)`,
              transformOrigin: 'center'
            }}
            onClick={() => setSelectedObject(obj)}
          >
            {/* 3D Object Placeholder */}
            <div className="w-16 h-16 bg-white/20 border-2 border-white/50 rounded-lg flex items-center justify-center text-2xl backdrop-blur-sm">
              {obj.type === 'tree' && '🌲'}
              {obj.type === 'crystal' && '💎'}
              {obj.type === 'portal' && '🌀'}
              {obj.type === 'house' && '🏠'}
            </div>
            
            {/* Model Viewer for WebXR-compatible browsers */}
            {window.customElements && (
              <model-viewer
                src={obj.modelUrl}
                ar
                auto-rotate
                camera-controls
                className="w-16 h-16 hidden"
                style={{ display: 'none' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <button
          onClick={stopARSession}
          className="bg-black/70 text-white p-3 rounded-full backdrop-blur-sm"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={takeScreenshot}
            className="bg-black/70 text-white p-3 rounded-full backdrop-blur-sm"
          >
            <Camera className="h-6 w-6" />
          </button>
          
          <button
            onClick={shareARExperience}
            className="bg-black/70 text-white p-3 rounded-full backdrop-blur-sm"
          >
            <Share className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        {/* Object Placement Menu */}
        {isPlacementMode ? (
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <div className="grid grid-cols-4 gap-3 mb-3">
              {AR_OBJECTS.map((obj) => (
                <button
                  key={obj.type}
                  onClick={() => placeObject(obj.type)}
                  className="bg-white/20 text-white p-3 rounded-xl text-center backdrop-blur-sm"
                >
                  <div className="text-2xl mb-1">{obj.name.split(' ')[0]}</div>
                  <div className="text-xs">{obj.name.split(' ').slice(1).join(' ')}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsPlacementMode(false)}
              className="w-full bg-red-600/80 text-white py-2 rounded-xl backdrop-blur-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          /* Main Controls */
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsPlacementMode(true)}
              className="bg-green-600/80 text-white px-6 py-3 rounded-xl backdrop-blur-sm font-semibold"
            >
              + Add Object
            </button>
          </div>
        )}

        {/* Selected Object Controls */}
        {selectedObject && (
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 mt-4">
            <div className="text-white text-center mb-3">
              <span className="font-semibold">Selected: {selectedObject.type}</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mb-3">
              <button
                onClick={() => updateObjectTransform(selectedObject.id, {
                  scale: Math.max(0.1, selectedObject.scale - 0.1)
                })}
                className="bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm"
              >
                <ZoomOut className="h-4 w-4 mx-auto" />
              </button>
              
              <button
                onClick={() => updateObjectTransform(selectedObject.id, {
                  scale: Math.min(3, selectedObject.scale + 0.1)
                })}
                className="bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm"
              >
                <ZoomIn className="h-4 w-4 mx-auto" />
              </button>
              
              <button
                onClick={() => updateObjectTransform(selectedObject.id, {
                  rotation: (selectedObject.rotation + 45) % 360
                })}
                className="bg-white/20 text-white p-2 rounded-lg backdrop-blur-sm"
              >
                <RotateCcw className="h-4 w-4 mx-auto" />
              </button>
              
              <button
                onClick={() => deleteObject(selectedObject.id)}
                className="bg-red-600/80 text-white p-2 rounded-lg backdrop-blur-sm"
              >
                <X className="h-4 w-4 mx-auto" />
              </button>
            </div>
            
            <button
              onClick={() => setSelectedObject(null)}
              className="w-full bg-gray-600/80 text-white py-2 rounded-lg backdrop-blur-sm"
            >
              Deselect
            </button>
          </div>
        )}
      </div>

      {/* Device Orientation Debug (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-20 left-4 bg-black/70 text-white p-2 rounded text-xs backdrop-blur-sm">
          <div>α: {deviceOrientation.alpha.toFixed(1)}°</div>
          <div>β: {deviceOrientation.beta.toFixed(1)}°</div>
          <div>γ: {deviceOrientation.gamma.toFixed(1)}°</div>
        </div>
      )}
    </div>
  );
}