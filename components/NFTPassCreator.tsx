"use client"

import { useState } from 'react';

interface NFTPass {
  id: string;
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
  totalSupply: number;
  currentSupply: number;
  price: number;
  royalty: number;
}

export default function NFTPassCreator() {
  const [pass, setPass] = useState<Partial<NFTPass>>({
    name: '',
    description: '',
    image: '',
    totalSupply: 100,
    price: 0.1,
    royalty: 10,
    attributes: []
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const addAttribute = () => {
    setPass(prev => ({
      ...prev,
      attributes: [...(prev.attributes || []), { trait_type: '', value: '' }]
    }));
  };

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    setPass(prev => ({
      ...prev,
      attributes: prev.attributes?.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      ) || []
    }));
  };

  const removeAttribute = (index: number) => {
    setPass(prev => ({
      ...prev,
      attributes: prev.attributes?.filter((_, i) => i !== index) || []
    }));
  };

  const createPass = async () => {
    if (!pass.name || !pass.description) {
      alert('Please fill in name and description');
      return;
    }

    setIsCreating(true);
    console.log('🎟️ Creating NFT Pass:', pass);
    
    // Simulate creation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`✅ NFT Pass "${pass.name}" created successfully!`);
    setIsCreating(false);
    setPreviewMode(true);
  };

  if (previewMode) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 text-white max-w-lg mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">🎟️ Pass Created!</h2>
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 mb-4">
            <div className="text-6xl mb-4">💎</div>
            <h3 className="text-xl font-bold">{pass.name}</h3>
            <p className="text-purple-200 text-sm mt-2">{pass.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-gray-400">Supply</div>
              <div className="font-bold">{pass.totalSupply}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-gray-400">Price</div>
              <div className="font-bold">{pass.price} ETH</div>
            </div>
          </div>

          <button
            onClick={() => setPreviewMode(false)}
            className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            Create Another Pass
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 text-white max-w-lg mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">🎟️ Create NFT Pass</h2>
        <p className="text-gray-400">Create exclusive access passes for your realms</p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium mb-2">Pass Name</label>
          <input
            type="text"
            value={pass.name || ''}
            onChange={(e) => setPass(prev => ({ ...prev, name: e.target.value }))}
            placeholder="VIP Realm Access"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={pass.description || ''}
            onChange={(e) => setPass(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Exclusive access to premium realm features..."
            rows={3}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
          />
        </div>

        {/* Supply & Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Total Supply</label>
            <input
              type="number"
              value={pass.totalSupply || 100}
              onChange={(e) => setPass(prev => ({ ...prev, totalSupply: parseInt(e.target.value) }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Price (ETH)</label>
            <input
              type="number"
              step="0.01"
              value={pass.price || 0.1}
              onChange={(e) => setPass(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Attributes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium">Attributes</label>
            <button
              onClick={addAttribute}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              + Add Trait
            </button>
          </div>
          
          <div className="space-y-2">
            {pass.attributes?.map((attr, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Trait type"
                  value={attr.trait_type}
                  onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                  className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-sm focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={attr.value}
                  onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                  className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-sm focus:border-purple-500 focus:outline-none"
                />
                <button
                  onClick={() => removeAttribute(index)}
                  className="px-2 py-2 text-red-400 hover:text-red-300"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Royalty */}
        <div>
          <label className="block text-sm font-medium mb-2">Royalty (%)</label>
          <input
            type="number"
            min="0"
            max="50"
            value={pass.royalty || 10}
            onChange={(e) => setPass(prev => ({ ...prev, royalty: parseInt(e.target.value) }))}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Percentage you earn from secondary sales</p>
        </div>

        {/* Create Button */}
        <button
          onClick={createPass}
          disabled={isCreating || !pass.name || !pass.description}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isCreating || !pass.name || !pass.description
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
          }`}
        >
          {isCreating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Pass...</span>
            </div>
          ) : (
            '🚀 Create NFT Pass'
          )}
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
        <div className="text-sm text-blue-200">
          <strong>💡 Pro Tip:</strong> NFT passes can grant special privileges like early access to new realms, 
          exclusive content, or VIP status in multiplayer sessions.
        </div>
      </div>
    </div>
  );
}