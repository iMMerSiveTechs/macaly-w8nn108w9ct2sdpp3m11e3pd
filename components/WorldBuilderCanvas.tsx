'use client';
import { useState, useRef, useEffect } from 'react';
import { Download, Upload, RotateCcw, Maximize, Eye, Share2 } from 'lucide-react';
import { notifications } from '@/utils/notifications';

interface WorldObject {
  id: string;
  type: string;
  name?: string;
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
  color?: string;
  reasoning?: string;
}

interface WorldBuilderCanvasProps {
  onObjectPlace?: (object: WorldObject) => void;
  onObjectSelect?: (object: WorldObject) => void;
  onGenerateObjects?: (objects: WorldObject[]) => void;
}

export default function WorldBuilderCanvas({
  onObjectPlace,
  onObjectSelect,
  onGenerateObjects
}: WorldBuilderCanvasProps) {
  const [objects, setObjects] = useState<WorldObject[]>([]);
  const [selectedObject, setSelectedObject] = useState<WorldObject | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasSize({ width: rect.width, height: rect.height });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on an object
    const clickedObject = objects.find(obj => {
      const objX = obj.x;
      const objY = obj.y;
      const size = 40 * (obj.scale || 1);
      return x >= objX - size/2 && x <= objX + size/2 && 
             y >= objY - size/2 && y <= objY + size/2;
    });

    if (clickedObject) {
      setSelectedObject(clickedObject);
      onObjectSelect?.(clickedObject);
    } else {
      setSelectedObject(null);
    }
  };

  const getObjectIcon = (type: string) => {
    switch (type) {
      case 'tree': return '🌲';
      case 'crystal': return '💎';
      case 'portal': return '🌀';
      case 'house': return '🏛️';
      case 'nature': return '🌿';
      case 'mineral': return '⛰️';
      case 'structure': return '🏗️';
      case 'effect': return '✨';
      default: return '📦';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
      {/* Main Canvas */}
      <div 
        ref={canvasRef}
        className="relative h-96 md:h-[500px] bg-gray-900 cursor-crosshair overflow-hidden"
        onClick={handleCanvasClick}
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      >
        {/* Center Guidelines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-px h-full bg-purple-500/20"></div>
          <div className="absolute w-full h-px bg-purple-500/20"></div>
        </div>

        {/* Objects */}
        {objects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none ${
              selectedObject?.id === obj.id ? 'ring-2 ring-purple-400' : ''
            }`}
            style={{
              left: obj.x,
              top: obj.y,
              transform: `translate(-50%, -50%) rotate(${obj.rotation || 0}deg) scale(${obj.scale || 1})`
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedObject(obj);
              onObjectSelect?.(obj);
            }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl border border-white/20"
              style={{ backgroundColor: obj.color || '#6b7280' }}
              title={obj.name || obj.type}
            >
              {getObjectIcon(obj.type)}
            </div>
            {selectedObject?.id === obj.id && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {obj.name || obj.type}
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {objects.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🌍</div>
              <p className="text-lg font-medium">Your immersive world awaits</p>
              <p className="text-sm mt-1 opacity-75">Use AI Copilot or the Asset Library to start building</p>
            </div>
          </div>
        )}
      </div>

      {/* Canvas Footer */}
      <div className="bg-gray-800 px-4 py-2 border-t border-gray-600">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <span>Canvas: {canvasSize.width} × {canvasSize.height}</span>
            {selectedObject && (
              <span>Selected: {selectedObject.name || selectedObject.type}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Ready to build</span>
          </div>
        </div>
      </div>
    </div>
  );
}