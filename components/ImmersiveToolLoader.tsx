"use client"

import { useEffect, useState } from "react";

interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

const staticTools: Tool[] = [
  { id: "ai-worlds", slug: "ai-worlds", name: "AI World Generator", description: "Generate 3D worlds from AI prompts", icon: "🌍", category: "AI" },
  { id: "prefab-upload", slug: "prefab-upload", name: "Prefab Uploader", description: "Upload custom 3D models", icon: "📦", category: "Assets" },
  { id: "voice-gen", slug: "voice-gen", name: "VoiceType Integration", description: "Speech-to-text creation tools", icon: "🗣️", category: "Audio" },
  { id: "avatar-fusion", slug: "avatar-fusion", name: "Avatar Fusion", description: "Create custom avatars", icon: "👤", category: "Characters" },
  { id: "video-gen", slug: "video-gen", name: "VR Video Creator", description: "360° video tools", icon: "🎥", category: "Video" },
  { id: "object-sculpt", slug: "object-sculpt", name: "3D Object Sculptor", description: "Sculpt 3D objects in VR", icon: "🗿", category: "Modeling" },
  { id: "story-realm", slug: "story-realm", name: "Story to World", description: "Convert stories to 3D realms", icon: "📚", category: "AI" },
  { id: "sonarium-uplink", slug: "sonarium-uplink", name: "Sonarium Integration", description: "Spatial audio tools", icon: "🎧", category: "Audio" },
  { id: "visionos-launch", slug: "visionos-launch", name: "VisionOS Portal", description: "Apple Vision Pro integration", icon: "🥽", category: "XR" },
  { id: "realm-portal", slug: "realm-portal", name: "Realm Portal Linker", description: "Connect realms together", icon: "🌀", category: "Navigation" },
];

export default function ImmersiveToolLoader() {
  const [tools, setTools] = useState<Tool[]>(staticTools);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(false);

  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const categories = ["all", ...Array.from(new Set(tools.map(tool => tool.category)))];

  const handleToolClick = (tool: Tool) => {
    console.log(`🚀 Opening tool: ${tool.name}`);
    alert(`Opening ${tool.name}: ${tool.description}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">🛠️ Immersive Creation Tools</h1>
        <p className="text-gray-300">Professional-grade tools for building immersive experiences</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category === "all" ? "All Tools" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mb-4 text-center text-sm text-gray-400">
        Showing {filteredTools.length} of {tools.length} tools in "{selectedCategory}" category
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleToolClick(tool)}
            className="bg-gray-800 hover:bg-gray-700 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-purple-500"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{tool.description}</p>
              <div className="inline-block px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                {tool.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p>No tools found in this category</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          💡 More tools are being added regularly. Check back for updates!
        </p>
      </div>
    </div>
  );
}