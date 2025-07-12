'use client';
import { useState } from 'react';
import { Sparkles, Wand2, Save, Share2, Play, Settings } from 'lucide-react';

export default function WorldBuilderPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorld, setGeneratedWorld] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    { id: 'cyberpunk', name: 'Cyberpunk City', prompt: 'A neon-lit cyberpunk city with flying cars and holographic billboards', color: 'from-pink-500 to-purple-600' },
    { id: 'forest', name: 'Enchanted Forest', prompt: 'A mystical forest with glowing trees and floating fairy lights', color: 'from-green-500 to-emerald-600' },
    { id: 'space', name: 'Space Station', prompt: 'A futuristic space station orbiting a distant blue planet', color: 'from-blue-500 to-indigo-600' },
    { id: 'ocean', name: 'Ocean Depths', prompt: 'An underwater coral reef with tropical fish and ancient ruins', color: 'from-teal-500 to-cyan-600' },
    { id: 'desert', name: 'Desert Oasis', prompt: 'A magical desert oasis with crystal formations and flowing water', color: 'from-orange-500 to-yellow-600' },
    { id: 'arctic', name: 'Arctic Tundra', prompt: 'A frozen arctic landscape with aurora borealis and ice formations', color: 'from-cyan-400 to-blue-500' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setGeneratedWorld(`🌟 Generated Immersive World: "${prompt}"

✨ World Features Created:
• 🌍 3D Environment with dynamic lighting
• 🎵 Ambient soundscape synchronized to visual elements  
• 🎮 Interactive objects and physics simulation
• 🚪 Portal connections to other realms
• 🤖 AI-powered NPCs with conversation abilities
• 🌤️ Dynamic weather and day/night cycles
• 👥 Multi-user collaboration support
• 📱 Cross-platform VR/AR compatibility

🔧 Technical Specifications:
• Optimized for WebXR and Vision Pro
• Real-time ray tracing enabled
• Spatial audio with 360° positioning
• Haptic feedback integration
• Cloud save and version control

🎯 Ready for deployment to the Immersive Internet!`);
    setIsGenerating(false);
  };

  const selectTemplate = (template: any) => {
    setSelectedTemplate(template.id);
    setPrompt(template.prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      {/* Navigation Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-cosmic-purple hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                🌍 World Builder
              </h1>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-green-600/80 hover:bg-green-600 rounded-lg transition flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save
              </button>
              <button className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg transition flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="px-4 py-2 bg-purple-600/80 hover:bg-purple-600 rounded-lg transition flex items-center gap-2">
                <Play className="h-4 w-4" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Main Prompt Area */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-purple-400" />
                Describe Your World
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your world description here... Be creative and detailed! (e.g., 'A mystical forest with glowing trees, ancient ruins, and magical creatures')"
                className="w-full h-32 p-4 bg-black/30 border border-white/20 rounded-lg resize-none text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Generating World...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate World
                    </>
                  )}
                </button>
                
                <button className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600 rounded-lg transition flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Advanced
                </button>
              </div>
            </div>

            {/* Quick Templates */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">⚡ Quick Templates</h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => selectTemplate(template)}
                    className={`p-4 rounded-lg text-left transition group ${
                      selectedTemplate === template.id 
                        ? 'bg-gradient-to-r ' + template.color + ' text-white' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600'
                    }`}
                  >
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs opacity-75 mt-1 line-clamp-2">
                      {template.prompt}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Tools */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4">🤖 AI Enhancement Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg text-sm transition">
                  🎵 Generate Audio
                </button>
                <button className="p-3 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded-lg text-sm transition">
                  💡 Auto Lighting
                </button>
                <button className="p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-sm transition">
                  🌤️ Add Weather
                </button>
                <button className="p-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-lg text-sm transition">
                  🚪 Create Portal
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              👁️ World Preview
              {generatedWorld && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  Ready
                </span>
              )}
            </h2>
            
            {generatedWorld ? (
              <div className="space-y-4">
                <div className="bg-black/40 p-6 rounded-lg min-h-96 border border-green-500/20">
                  <pre className="text-green-400 whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedWorld}
                  </pre>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <button className="bg-green-600/80 hover:bg-green-600 px-4 py-2 rounded transition text-sm">
                    💾 Save World
                  </button>
                  <button className="bg-blue-600/80 hover:bg-blue-600 px-4 py-2 rounded transition text-sm">
                    🔗 Get Link
                  </button>
                  <button className="bg-purple-600/80 hover:bg-purple-600 px-4 py-2 rounded transition text-sm">
                    🥽 Enter VR
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 p-6 rounded-lg min-h-96 border border-gray-600/30 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-4">🌌</div>
                  <p className="text-lg font-medium mb-2">Your World Awaits</p>
                  <p className="text-sm">
                    Enter a description and click "Generate World" to begin creating your immersive realm!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-orange-600/80 hover:bg-orange-600 px-4 py-2 rounded transition flex items-center gap-2 text-sm">
              🎵 Sonarium Audio
            </button>
            <button className="bg-pink-600/80 hover:bg-pink-600 px-4 py-2 rounded transition flex items-center gap-2 text-sm">
              🎬 Nemura Cinema
            </button>
            <button className="bg-teal-600/80 hover:bg-teal-600 px-4 py-2 rounded transition flex items-center gap-2 text-sm">
              👤 Avatar Studio
            </button>
            <button className="bg-cyan-600/80 hover:bg-cyan-600 px-4 py-2 rounded transition flex items-center gap-2 text-sm">
              🌐 Realm Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}