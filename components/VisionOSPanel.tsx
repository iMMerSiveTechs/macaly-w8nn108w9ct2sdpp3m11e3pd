"use client"

import { useState, useRef, useEffect } from 'react';

interface PanelProps {
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  resizable?: boolean;
  minimizable?: boolean;
  className?: string;
}

export default function VisionOSPanel({ 
  title, 
  children, 
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 400, height: 300 },
  resizable = true,
  minimizable = true,
  className = ""
}: PanelProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isLocked) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
      
      if (isResizing && !isLocked) {
        const rect = panelRef.current?.getBoundingClientRect();
        if (rect) {
          setSize({
            width: Math.max(200, e.clientX - rect.left),
            height: Math.max(150, e.clientY - rect.top)
          });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, isLocked]);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return;
    
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return;
    e.stopPropagation();
    setIsResizing(true);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const bringToFront = () => {
    if (panelRef.current) {
      panelRef.current.style.zIndex = String(Date.now());
    }
  };

  return (
    <div
      ref={panelRef}
      className={`fixed bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'h-12' : ''
      } ${isDragging ? 'cursor-grabbing' : ''} ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? 200 : size.width,
        height: isMinimized ? 48 : size.height,
        zIndex: 1000
      }}
      onClick={bringToFront}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className={`flex items-center justify-between p-4 border-b border-white/10 rounded-t-2xl ${
          !isLocked ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        } ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleHeaderMouseDown}
      >
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full" onClick={toggleMinimize} />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div 
            className={`w-3 h-3 rounded-full ${isLocked ? 'bg-red-500' : 'bg-green-500'}`}
            onClick={toggleLock}
          />
        </div>
        
        <h3 className="text-white font-semibold text-sm truncate mx-4 flex-1">
          {title}
        </h3>
        
        <div className="flex items-center space-x-2">
          {minimizable && (
            <button
              onClick={toggleMinimize}
              className="text-white/60 hover:text-white transition-colors"
            >
              {isMinimized ? '⬆️' : '⬇️'}
            </button>
          )}
          
          <button
            onClick={toggleLock}
            className={`transition-colors ${
              isLocked ? 'text-red-400' : 'text-white/60 hover:text-white'
            }`}
          >
            {isLocked ? '🔒' : '🔓'}
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="p-4 text-white overflow-auto" style={{ height: size.height - 60 }}>
          {children}
        </div>
      )}

      {/* Resize Handle */}
      {!isMinimized && resizable && !isLocked && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity"
          onMouseDown={handleResizeMouseDown}
        >
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/40 transform rotate-45" />
        </div>
      )}

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
    </div>
  );
}

// Panel Manager Component for handling multiple panels
export function VisionOSPanelManager({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>
  );
}

// Pre-built Panel Types
export function ToolsPanel() {
  return (
    <VisionOSPanel title="🛠️ Tools" defaultPosition={{ x: 50, y: 100 }}>
      <div className="space-y-3">
        <button className="w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          🎯 Object Placer
        </button>
        <button className="w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          🎨 Material Editor
        </button>
        <button className="w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          🌅 Environment
        </button>
        <button className="w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          💡 Lighting
        </button>
      </div>
    </VisionOSPanel>
  );
}

export function PropertiesPanel() {
  return (
    <VisionOSPanel title="⚙️ Properties" defaultPosition={{ x: 300, y: 100 }}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Position</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" placeholder="X" className="bg-white/10 rounded p-2 text-sm" />
            <input type="number" placeholder="Y" className="bg-white/10 rounded p-2 text-sm" />
            <input type="number" placeholder="Z" className="bg-white/10 rounded p-2 text-sm" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Scale</label>
          <input type="range" min="0.1" max="5" step="0.1" className="w-full" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Material</label>
          <select className="w-full bg-white/10 rounded p-2">
            <option>Default</option>
            <option>Metal</option>
            <option>Glass</option>
            <option>Wood</option>
          </select>
        </div>
      </div>
    </VisionOSPanel>
  );
}

export function AssetsPanel() {
  return (
    <VisionOSPanel title="📦 Assets" defaultPosition={{ x: 550, y: 100 }} defaultSize={{ width: 300, height: 400 }}>
      <div className="grid grid-cols-2 gap-3">
        {['🌳', '🏠', '🚗', '⭐', '💎', '🔥', '💧', '🌙'].map((emoji, i) => (
          <div
            key={i}
            className="aspect-square bg-white/10 rounded-lg flex items-center justify-center text-2xl cursor-pointer hover:bg-white/20 transition-colors"
          >
            {emoji}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="w-full p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
          + Upload Asset
        </button>
      </div>
    </VisionOSPanel>
  );
}