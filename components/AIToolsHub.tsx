"use client"

import React from "react";

const tools = [
  {
    name: "VoiceType",
    desc: "Speech-to-text app, 9x faster writing",
    url: "https://voicetype.com",
    icon: "🗣️",
    category: "Productivity"
  },
  {
    name: "RabbitHoles",
    desc: "Canvas that connects multiple AIs",
    url: "https://rabbitholes.ai",
    icon: "🧠",
    category: "AI Tools"
  },
  {
    name: "PropStyle.ai",
    desc: "Styled real estate images",
    url: "https://propstyle.ai",
    icon: "🏡",
    category: "Real Estate"
  },
  {
    name: "Artbreeder",
    desc: "Remix AI-generated art/images",
    url: "https://www.artbreeder.com",
    icon: "🎨",
    category: "Creative"
  },
  {
    name: "Kimi K2",
    desc: "Open-source AI model beating GPT-4",
    url: "https://moonshot.cn",
    icon: "🚀",
    category: "AI Models"
  },
  {
    name: "Remove.bg",
    desc: "Remove image backgrounds instantly",
    url: "https://remove.bg",
    icon: "✂️",
    category: "Image Editing"
  }
];

export default function AIToolsHub() {
  const handleToolClick = async (toolName: string, url: string) => {
    console.log(`Tracking click for ${toolName}`);
    
    // Track the click
    try {
      await fetch("/api/track-tool-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: toolName, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      console.error("Failed to track tool click:", error);
    }
    
    // Open the tool
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🧰 AI Tools Integration Hub</h2>
        <p className="text-gray-600">Curated AI tools for creators, integrated into Nemurium workflow</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.name}
            onClick={() => handleToolClick(tool.name, tool.url)}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-purple-300 bg-gradient-to-br from-white to-gray-50"
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{tool.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{tool.name}</div>
                <div className="text-sm text-gray-500 mb-2">{tool.category}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{tool.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          📊 Tool usage is tracked for analytics and partnership optimization
        </p>
      </div>
    </div>
  );
}