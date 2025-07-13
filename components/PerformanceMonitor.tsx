'use client';
import { useEffect, useState } from 'react';

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple FPS monitor
    let frameCount = 0;
    let lastTime = performance.now();
    
    const updateFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(updateFPS);
    };
    
    updateFPS();
  }, []);

  // Toggle visibility with keyboard shortcut
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        setIsVisible(!isVisible);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 bg-black/80 text-white p-3 rounded-lg text-sm font-mono z-50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${fps >= 55 ? 'bg-green-400' : fps >= 30 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
          <span>FPS: {fps}</span>
        </div>
        <div className="text-gray-400 text-xs">
          Ctrl + ` to hide
        </div>
      </div>
    </div>
  );
}