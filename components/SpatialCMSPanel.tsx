"use client"

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues
const SpatialEditor = dynamic(() => import("./core/SpatialEditor"), { 
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-800 h-96 rounded-lg"></div>
});

interface Asset {
  id: string;
  name: string;
  type: string;
  url: string;
  thumbnail?: string;
  createdAt: Date;
}

export default function SpatialCMSPanel() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mock data - in production this would come from Firebase/database
    const mockAssets: Asset[] = [
      { id: "1", name: "Forest Scene", type: "environment", url: "/assets/forest.glb", createdAt: new Date() },
      { id: "2", name: "Medieval Castle", type: "structure", url: "/assets/castle.glb", createdAt: new Date() },
      { id: "3", name: "Spaceship Cockpit", type: "vehicle", url: "/assets/spaceship.glb", createdAt: new Date() },
      { id: "4", name: "Crystal Cave", type: "environment", url: "/assets/crystal-cave.glb", createdAt: new Date() },
    ];
    setAssets(mockAssets);
  }, []);

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🌌 Spatial CMS</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
            <div className="flex bg-gray-700 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-l-lg ${viewMode === "grid" ? "bg-purple-600" : ""}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-r-lg ${viewMode === "list" ? "bg-purple-600" : ""}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Asset Library Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Asset Library</h2>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors ${
                      selectedAsset?.id === asset.id ? "ring-2 ring-purple-500" : ""
                    }`}
                  >
                    <div className="aspect-square bg-gray-600 rounded mb-2 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <p className="text-sm font-medium truncate">{asset.name}</p>
                    <p className="text-xs text-gray-400">{asset.type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors ${
                      selectedAsset?.id === asset.id ? "ring-2 ring-purple-500" : ""
                    }`}
                  >
                    <p className="font-medium">{asset.name}</p>
                    <p className="text-sm text-gray-400">{asset.type}</p>
                  </div>
                ))}
              </div>
            )}

            {filteredAssets.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>No assets found</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 bg-gray-900">
          <SpatialEditor selectedAsset={selectedAsset} />
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-4">Properties</h2>
          
          {selectedAsset ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={selectedAsset.name}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <input
                  type="text"
                  value={selectedAsset.type}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="text"
                  value={selectedAsset.url}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-xs"
                  readOnly
                />
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <h3 className="font-medium mb-2">Transform</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-400">Position</label>
                    <div className="grid grid-cols-3 gap-1">
                      <input type="number" placeholder="X" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                      <input type="number" placeholder="Y" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                      <input type="number" placeholder="Z" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Rotation</label>
                    <div className="grid grid-cols-3 gap-1">
                      <input type="number" placeholder="X" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                      <input type="number" placeholder="Y" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                      <input type="number" placeholder="Z" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400">Scale</label>
                    <div className="grid grid-cols-3 gap-1">
                      <input type="number" placeholder="X" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                      <input type="number" placeholder="Y" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                      <input type="number" placeholder="Z" className="px-2 py-1 bg-gray-700 rounded text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Select an asset to view properties</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}