"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Eye, Layers, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AROverlay() {
  const [isARSupported, setIsARSupported] = useState(false)
  const [showARView, setShowARView] = useState(false)

  useEffect(() => {
    // Check for AR support
    if (typeof window !== 'undefined') {
      const checkARSupport = () => {
        // Check for WebXR support
        if ('xr' in navigator) {
          // @ts-ignore
          navigator.xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
            setIsARSupported(supported)
          }).catch(() => {
            console.log('AR not supported')
          })
        }
        
        // Check for getUserMedia (camera access)
        if (typeof navigator.mediaDevices?.getUserMedia === 'function') {
          setIsARSupported(true)
        }
      }
      
      checkARSupport()
    }
  }, [])

  const initializeAR = () => {
    setShowARView(true)
    
    // Dynamically load AR.js if needed
    if (typeof window !== 'undefined' && !document.getElementById('aframe-script')) {
      const aframeScript = document.createElement('script')
      aframeScript.id = 'aframe-script'
      aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
      
      const arScript = document.createElement('script')
      arScript.src = 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.min.js'
      
      document.head.appendChild(aframeScript)
      aframeScript.onload = () => {
        document.head.appendChild(arScript)
      }
    }
  }

  return (
    <div className="relative">
      {/* AR Support Indicator */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isARSupported ? 'bg-green-400' : 'bg-amber-400'}`} />
          <span className="text-cosmic-white/80 text-sm">
            {isARSupported ? 'AR Compatible Device' : 'Limited AR Support'}
          </span>
        </div>
        
        <Button
          onClick={initializeAR}
          variant="outline"
          size="sm"
          className="border-neonflare/50 text-neonflare hover:bg-neonflare/10"
        >
          <Eye className="h-4 w-4 mr-2" />
          Launch AR View
        </Button>
      </div>

      {/* AR View Modal */}
      <AnimatePresence>
        {showARView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full max-w-4xl max-h-3xl bg-cosmic-space border border-cosmic-white/20 rounded-xl overflow-hidden"
            >
              {/* AR Scene Container */}
              <div className="relative w-full h-full">
                {/* A-Frame AR Scene */}
                <div 
                  id="ar-scene-container"
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{
                    __html: `
                      <a-scene 
                        embedded 
                        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
                        style="width: 100%; height: 100%;"
                      >
                        <!-- Immersive 3D Objects -->
                        <a-box 
                          position="0 0.5 0" 
                          material="color: #e879f9; metalness: 0.7; roughness: 0.3;" 
                          animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
                        ></a-box>
                        
                        <a-sphere 
                          position="2 1.25 -5" 
                          radius="1.25" 
                          material="color: #6ee7b7; metalness: 0.5; roughness: 0.4;"
                          animation="property: position; to: -2 1.25 -5; dir: alternate; dur: 4000; loop: true"
                        ></a-sphere>
                        
                        <a-cylinder 
                          position="1 0.75 -3" 
                          radius="0.5" 
                          height="1.5" 
                          material="color: #a5f3fc; metalness: 0.8; roughness: 0.2;"
                        ></a-cylinder>
                        
                        <!-- Lighting -->
                        <a-light type="ambient" color="#404040"></a-light>
                        <a-light type="point" intensity="2" position="2 4 4" color="#e879f9"></a-light>
                        
                        <!-- Camera -->
                        <a-marker-camera preset="hiro"></a-marker-camera>
                      </a-scene>
                    `
                  }}
                />

                {/* AR Overlay UI */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="bg-cosmic-space/80 backdrop-blur rounded-lg p-3 border border-cosmic-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4 text-neonflare" />
                      <span className="text-cosmic-white font-medium text-sm">Nemurium AR</span>
                    </div>
                    <p className="text-cosmic-white/70 text-xs">
                      Point camera at Hiro marker to see 3D objects
                    </p>
                  </div>

                  <Button
                    onClick={() => setShowARView(false)}
                    variant="ghost"
                    size="sm"
                    className="bg-cosmic-space/80 backdrop-blur text-cosmic-white hover:bg-cosmic-white/10"
                  >
                    Exit AR
                  </Button>
                </div>

                {/* Bottom Instructions */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-cosmic-space/80 backdrop-blur rounded-lg p-4 border border-cosmic-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-realmglow" />
                      <span className="text-cosmic-white font-medium">AR Instructions</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-cosmic-white/70">
                      <div>
                        <strong className="text-cosmic-white">Step 1:</strong> Allow camera access
                      </div>
                      <div>
                        <strong className="text-cosmic-white">Step 2:</strong> Print or display Hiro marker
                      </div>
                      <div>
                        <strong className="text-cosmic-white">Step 3:</strong> Point camera at marker
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Description */}
      <div className="glass-panel p-6 rounded-xl border border-cosmic-white/20 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-immersive-gradient rounded-lg flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-cosmic-white font-semibold">AR World Overlay</h3>
            <p className="text-cosmic-white/60 text-sm">Spatial computing for smart glasses and mobile</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-cosmic-white/5 rounded-lg p-3">
            <h4 className="text-diamond font-medium mb-1">Smart Glasses Ready</h4>
            <p className="text-cosmic-white/70">Meta Ray-Ban, Apple Vision Pro, HoloLens support</p>
          </div>
          
          <div className="bg-cosmic-white/5 rounded-lg p-3">
            <h4 className="text-realmglow font-medium mb-1">Mobile AR</h4>
            <p className="text-cosmic-white/70">iPhone, Android with camera-based tracking</p>
          </div>
          
          <div className="bg-cosmic-white/5 rounded-lg p-3">
            <h4 className="text-neonflare font-medium mb-1">WebXR Compatible</h4>
            <p className="text-cosmic-white/70">Browser-based AR experiences</p>
          </div>
        </div>
      </div>
    </div>
  )
}