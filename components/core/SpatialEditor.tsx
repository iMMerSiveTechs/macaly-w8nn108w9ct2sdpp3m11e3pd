"use client"

import { useState, useRef, useEffect } from "react";

interface Asset {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface SpatialEditorProps {
  selectedAsset?: Asset | null;
}

export default function SpatialEditor({ selectedAsset }: SpatialEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placedObjects, setPlacedObjects] = useState<any[]>([]);

  useEffect(() => {
    // Initialize 3D context when component mounts
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear canvas
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        ctx.strokeStyle = '#404040';
        ctx.lineWidth = 1;
        
        const gridSize = 50;
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
        
        // Draw placed objects
        placedObjects.forEach((obj, index) => {
          ctx.fillStyle = '#8b5cf6';
          ctx.fillRect(obj.x - 15, obj.y - 15, 30, 30);
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px Arial';
          ctx.fillText(`${index + 1}`, obj.x - 5, obj.y + 4);
        });
        
        // Draw center point
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }, [placedObjects]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedAsset) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newObject = {
      id: Date.now().toString(),
      asset: selectedAsset,
      x,
      y,
      z: 0,
    };
    
    setPlacedObjects(prev => [...prev, newObject]);
    console.log(`Placed ${selectedAsset.name} at (${x}, ${y})`);
  };

  const clearScene = () => {
    setPlacedObjects([]);
  };

  const exportScene = () => {
    const sceneData = {
      objects: placedObjects,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(sceneData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spatial-scene.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              Objects: {placedObjects.length}
            </span>
            {selectedAsset && (
              <span className="text-sm text-purple-400">
                Selected: {selectedAsset.name}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={clearScene}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
            >
              Clear Scene
            </button>
            <button
              onClick={exportScene}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
            >
              Export Scene
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative bg-gray-900 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onClick={handleCanvasClick}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Overlay UI */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
          <h3 className="font-semibold mb-2">Spatial Scene Editor</h3>
          <div className="text-xs space-y-1">
            <p>• Click to place selected asset</p>
            <p>• Grid represents 3D space</p>
            <p>• Red dot = world origin</p>
          </div>
        </div>
        
        {!selectedAsset && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-6 text-center text-white">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Select an Asset</h3>
              <p className="text-gray-300">Choose an asset from the library to start building</p>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="animate-spin w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
              <span>Loading spatial environment...</span>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 p-2 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Canvas: 800 × 600</span>
          <span>Ready to build</span>
        </div>
      </div>
    </div>
  );
}