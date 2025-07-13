'use client';
import { useState } from 'react';
import { Sparkles, Brain, Wand2, MessageCircle, Image, Music, Zap, ArrowRight } from 'lucide-react';

export default function AICopilotPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: "🧠 Welcome to Nemurium AI Copilot! I'm your creative partner for building immersive worlds. Ask me anything about world design, get instant realm generation, or brainstorm ideas together. What would you like to create today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickPrompts = [
    "Create a mystical forest with floating crystals",
    "Design a cyberpunk city with neon lights",
    "Build an underwater temple with bioluminescent life",
    "Generate a desert oasis with ancient ruins",
    "Make a floating sky island with waterfalls",
    "Create a volcanic landscape with lava flows"
  ];

  const features = [
    {
      id: 'chat',
      name: 'AI Chat',
      icon: MessageCircle,
      description: 'Get creative guidance and instant answers'
    },
    {
      id: 'generate',
      name: 'World Generator',
      icon: Wand2,
      description: 'Generate complete realms from descriptions'
    },
    {
      id: 'analyze',
      name: 'Scene Analyzer',
      icon: Brain,
      description: 'Analyze and improve existing worlds'
    },
    {
      id: 'assets',
      name: 'Asset Creator',
      icon: Image,
      description: 'Generate textures and 3D models'
    }
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage = inputMessage.trim();
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      let response = '';
      const input = userMessage.toLowerCase();

      if (input.includes('create') || input.includes('generate') || input.includes('make')) {
        response = `🌟 Great idea! I can help you create that. Here are some suggestions:

• Use the World Builder to place objects manually
• Try the AI Generator with this prompt: "${userMessage}"
• Consider adding atmospheric elements like lighting and sound
• Think about the story or purpose behind your world

Would you like me to generate this world automatically, or would you prefer step-by-step guidance?`;
      } else if (input.includes('help') || input.includes('how')) {
        response = `🛠️ I'm here to help! Here's what I can do:

**World Building:**
• Generate complete realms from text descriptions
• Suggest object placements and compositions
• Help with lighting and atmosphere

**Creative Guidance:**
• Brainstorm world concepts and themes
• Analyze existing scenes for improvements
• Provide technical tips and best practices

**Quick Actions:**
• Type "generate [description]" for instant world creation
• Ask "how do I..." for tutorials
• Say "analyze my world" for feedback

What specific aspect would you like help with?`;
      } else if (input.includes('mystical') || input.includes('magic')) {
        response = `✨ Mystical worlds are my specialty! For magical realms, consider:

**Essential Elements:**
• Floating crystals for ambient lighting
• Ancient portals as focal points
• Ethereal lighting effects
• Mysterious fog or mist

**Color Palette:**
• Deep purples and blues
• Glowing cyan accents
• Golden magical auras

**Sound Design:**
• Ambient magical humming
• Wind chimes and echoes
• Distant mystical voices

Would you like me to generate a mystical realm for you right now?`;
      } else if (input.includes('cyberpunk') || input.includes('futuristic')) {
        response = `🌆 Cyberpunk aesthetics are incredible! Here's what makes them work:

**Visual Elements:**
• Neon lighting in pink, blue, and cyan
• Dark, reflective surfaces
• Vertical architecture and towers
• Holographic displays

**Atmosphere:**
• Rain and wet reflections
• Steam and fog effects
• Electronic ambient sounds
• Contrast between light and shadow

**Objects to Include:**
• LED strip lighting
• Metallic structures
• Digital billboards
• Flying vehicles

Ready to build your cyber-city? I can generate one instantly!`;
      } else {
        response = `🤔 Interesting! Let me think about that...

"${userMessage}"

I can help you explore this idea further. Whether you're looking for:
• Creative inspiration and brainstorming
• Technical implementation guidance  
• World generation and design
• Asset recommendations

Just let me know what direction you'd like to take this, and I'll provide detailed suggestions and next steps!`;
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Sorry, I encountered an error. Please try again!' 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const useQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const generateWorldFromChat = async (prompt: string) => {
    // Redirect to world builder with the prompt
    const encodedPrompt = encodeURIComponent(prompt);
    window.location.href = `/world-builder?prompt=${encodedPrompt}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-indigo-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                🧠 Nemurium AI Copilot
              </h1>
            </div>
            <button 
              onClick={() => window.location.href = '/world-builder'}
              className="flex items-center gap-2 bg-purple-600/80 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
            >
              <Wand2 className="h-4 w-4" />
              Open World Builder
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Feature Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition ${
                  activeTab === feature.id
                    ? 'bg-purple-600/50 border-purple-500 text-white'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">{feature.name}</div>
                  <div className="text-xs opacity-75">{feature.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Chat Interface */}
        {activeTab === 'chat' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Messages */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 h-[600px] flex flex-col">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Creative Assistant
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-purple-600/80 text-white'
                            : 'bg-gray-800/50 text-gray-100'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.role === 'assistant' && message.content.includes('generate') && (
                          <button
                            onClick={() => generateWorldFromChat(message.content)}
                            className="mt-2 flex items-center gap-2 text-sm bg-purple-600/50 hover:bg-purple-600 px-3 py-1 rounded transition"
                          >
                            <Wand2 className="h-3 w-3" />
                            Generate This World
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>
                          <span>AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask me anything about world building..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isProcessing || !inputMessage.trim()}
                      className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Prompts Sidebar */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Prompts
                </h3>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => useQuickPrompt(prompt)}
                      className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition text-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Capabilities
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Generate complete 3D worlds</li>
                  <li>• Creative brainstorming and ideation</li>
                  <li>• Technical guidance and tutorials</li>
                  <li>• Scene composition advice</li>
                  <li>• Color and lighting suggestions</li>
                  <li>• Story and narrative development</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* World Generator Tab */}
        {activeTab === 'generate' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">🌍 AI World Generator</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-3">Describe your world:</label>
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Example: A mystical floating island with crystal formations, ancient ruins, and ethereal lighting. Include magical portals and glowing flora."
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 h-32 resize-none focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <button
                  onClick={() => generateWorldFromChat(inputMessage)}
                  disabled={!inputMessage.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-3"
                >
                  <Wand2 className="h-6 w-6" />
                  Generate World in Builder
                </button>
              </div>
              
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-bold mb-1">Instant Generation</h4>
                  <p className="text-sm text-gray-400">From prompt to world in seconds</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🎨</div>
                  <h4 className="font-bold mb-1">Fully Customizable</h4>
                  <p className="text-sm text-gray-400">Edit and refine every detail</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'chat' && activeTab !== 'generate' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="text-gray-400">This feature is under development!</p>
          </div>
        )}
      </div>
    </div>
  );
}