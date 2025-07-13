"use client"

import { useEffect, useRef, useState } from "react";

export default function VisionOSPortal() {
  const portalRef = useRef<HTMLDivElement>(null);
  const [isXRSupported, setIsXRSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkXRSupport = async () => {
        try {
          const navigator = (window as any).navigator;
          if (navigator.xr) {
            const supported = await navigator.xr.isSessionSupported("immersive-ar");
            setIsXRSupported(supported);
            console.log("🥽 VisionOS/XR Support:", supported);
          } else {
            console.log("❌ XR not available in this browser");
          }
        } catch (error) {
          console.log("⚠️ XR check failed:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkXRSupport();
    }
  }, []);

  const handleEnterImmersive = async () => {
    console.log("🚀 Attempting to enter immersive mode...");
    
    if (isXRSupported) {
      try {
        const navigator = (window as any).navigator;
        const session = await navigator.xr.requestSession("immersive-ar");
        console.log("✅ VisionOS session started:", session);
        // Handle XR session here
      } catch (error) {
        console.error("❌ Failed to start XR session:", error);
      }
    } else {
      // Fallback for non-XR devices
      console.log("📱 Opening fallback immersive experience...");
      window.open("/realm-viewer?mode=immersive", "_blank");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-black text-white flex items-center justify-center rounded-xl">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Initializing VisionOS Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={portalRef}
      className="w-full h-64 bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center rounded-xl relative overflow-hidden"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="text-center z-10">
        <div className="text-6xl mb-4">🌀</div>
        <h3 className="text-2xl font-bold mb-2">VisionOS Portal</h3>
        <p className="text-gray-300 mb-6 max-w-sm">
          {isXRSupported 
            ? "VisionOS detected. Ready for immersive experience." 
            : "Immersive mode available. Enter to explore realms."
          }
        </p>
        
        <button
          onClick={handleEnterImmersive}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isXRSupported ? "🥽 Enter VisionOS" : "🚀 Enter Immersive Mode"}
        </button>
        
        <div className="mt-4 text-xs text-gray-400">
          {isXRSupported ? "✅ XR Hardware Detected" : "📱 Fallback Mode Ready"}
        </div>
      </div>
    </div>
  );
}