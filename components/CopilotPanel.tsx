'use client';
import { useState, useEffect, useRef } from 'react';
import { Mic, Send, Sparkles, Wand2, X, Move, Minimize2 } from 'lucide-react';
import { IntelligentBuilder } from '@/lib/ai/intelligentBuilder';

interface CopilotPanelProps {
  onSpawnPrefab?: (type: string) => void;
  onToggleTheme?: (theme: string) => void;
  onGenerateObjects?: (objects: any[]) => void;
  canvasSize?: { width: number; height: number };
  existingObjects?: any[];
}

export default function CopilotPanel({ 
  onSpawnPrefab, 
  onToggleTheme, 
  onGenerateObjects,
  canvasSize = { width: 600, height: 600 },
  existingObjects = []
}: CopilotPanelProps) {
  const [input, setInput] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    
    const rect = dragRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    setIsDragging(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y
      });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    // Generate suggestions based on current scene
    const newSuggestions = IntelligentBuilder.generateSuggestions(existingObjects, canvasSize);
    setSuggestions(newSuggestions);
  }, [existingObjects, canvasSize]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    // Immediate response for better UX
    setLog(prev => [...prev, `🧠 Processing: "${input}"`]);
    setInput(''); // Clear input immediately
    setIsGenerating(true);
    
    // Quick processing without delay
    try {
      // Quick keyword detection for instant response
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('forest') || lowerInput.includes('tree')) {
        onSpawnPrefab?.('tree');
        setLog(prev => [...prev, '🌲 Added forest elements']);
      } else if (lowerInput.includes('desert') || lowerInput.includes('sand')) {
        onSpawnPrefab?.('house');
        setLog(prev => [...prev, '🏛️ Added desert structures']);
      } else if (lowerInput.includes('crystal') || lowerInput.includes('magic')) {
        onSpawnPrefab?.('crystal');
        setLog(prev => [...prev, '💎 Added magical crystals']);
      } else if (lowerInput.includes('portal')) {
        onSpawnPrefab?.('portal');
        setLog(prev => [...prev, '🌀 Created portal']);
      } else if (lowerInput.includes('water') || lowerInput.includes('lake')) {
        onSpawnPrefab?.('water');
        setLog(prev => [...prev, '💧 Added water elements']);
      } else {
        setLog(prev => [...prev, '💭 Try: "forest", "crystal", "portal", "desert", or "water"']);
      }

      // Theme detection
      if (lowerInput.includes('dark') || lowerInput.includes('night')) {
        onToggleTheme?.('night');
        setLog(prev => [...prev, '🌙 Applied dark theme']);
      } else if (lowerInput.includes('bright') || lowerInput.includes('day')) {
        onToggleTheme?.('day');
        setLog(prev => [...prev, '☀️ Applied bright theme']);
      }
      
    } catch (error) {
      console.error('AI generation error:', error);
      setLog(prev => [...prev, '❌ Something went wrong. Please try again.']);
    } finally {
      setIsGenerating(false);
    }
  };

  const startVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      setLog(prev => [...prev, '🎤 Listening for voice input...']);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setLog(prev => [...prev, `🗣️ Heard: "${transcript}"`]);
      };
      
      recognition.onerror = (error: any) => {
        console.error('Speech recognition error:', error);
        setLog(prev => [...prev, '❌ Voice input failed. Please try again.']);
      };
      
      recognition.onend = () => {
        setLog(prev => [...prev, '🎤 Voice input ended']);
      };
      
      recognition.start();
    } else {
      setLog(prev => [...prev, '❌ Voice input not supported in this browser']);
      alert('Voice input not supported. Please use Chrome or Edge.');
    }
  };

  const quickPrompts = [
    'Create a mystical forest with glowing trees',
    'Build a cyberpunk cityscape with neon lights',
    'Generate a peaceful lakeside sanctuary',
    'Design a floating crystal palace'
  ];

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg z-50"
        title="Open AI Copilot"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div 
      ref={dragRef}
      className="fixed bg-black/90 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl w-96 border border-purple-500/30 z-50"
      style={{ 
        right: position.x, 
        bottom: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nemurium AI Copilot
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onMouseDown={handleMouseDown}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Drag to move"
          >
            <Move className="h-4 w-4 text-gray-400" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Minimize"
          >
            <Minimize2 className="h-4 w-4 text-gray-400" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
              placeholder="Describe your realm vision..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSubmit()}
            />
            <button
              onClick={startVoiceInput}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Voice input"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={isGenerating || !input.trim()}
              className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg transition-colors"
            >
              {isGenerating ? <Wand2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs text-gray-400">AI suggestions:</p>
              <div className="flex flex-wrap gap-1">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(suggestion)}
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors"
                  >
                    {suggestion.length > 25 ? suggestion.substring(0, 25) + '...' : suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generation Log */}
          <div className="text-sm space-y-1 max-h-32 overflow-y-auto bg-gray-800/50 rounded p-2">
            {log.length === 0 ? (
              <p className="text-gray-400 italic">Ready to build your realm...</p>
            ) : (
              log.slice(-5).map((entry, i) => (
                <p key={i} className={entry.startsWith('❌') ? 'text-red-400' : 'text-green-400'}>
                  {entry}
                </p>
              ))
            )}
          </div>

          {/* Scene Stats */}
          <div className="flex justify-between text-xs text-gray-400 border-t border-gray-700 pt-2">
            <span>Objects: {existingObjects.length}</span>
            <span>Canvas: {canvasSize.width}x{canvasSize.height}</span>
          </div>
        </div>
      )}
    </div>
  );
}