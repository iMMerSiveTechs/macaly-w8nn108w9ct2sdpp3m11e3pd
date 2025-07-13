'use client';
import { useState } from 'react';
import { Shield, FileText, Download, Eye, Share2, Clock, User, DollarSign } from 'lucide-react';

interface AssetOwnership {
  id: string;
  assetName: string;
  assetType: 'realm' | 'model' | 'texture' | 'audio' | 'template';
  owner: string;
  creator: string;
  licenseType: 'personal' | 'commercial' | 'exclusive';
  mintedAt: Date;
  blockchain?: string;
  contractAddress?: string;
  tokenId?: string;
  price?: number;
  royaltyPercentage?: number;
  transferable: boolean;
  usage: {
    downloads: number;
    views: number;
    remixes: number;
  };
}

interface SmartContractOwnershipProps {
  userId?: string;
  mode?: 'creator' | 'collector';
}

export default function SmartContractOwnership({ userId = 'user-123', mode = 'creator' }: SmartContractOwnershipProps) {
  const [activeTab, setActiveTab] = useState<'owned' | 'created' | 'marketplace'>('owned');
  
  // Mock ownership data
  const [ownedAssets] = useState<AssetOwnership[]>([
    {
      id: 'asset-1',
      assetName: 'Mystical Forest Pack',
      assetType: 'template',
      owner: userId,
      creator: 'nemurium-ai',
      licenseType: 'commercial',
      mintedAt: new Date('2025-07-10'),
      blockchain: 'Polygon',
      contractAddress: '0x742d35Cc6634C0532925a3b8D3Ac6745d3C5',
      tokenId: '1001',
      price: 49.99,
      royaltyPercentage: 10,
      transferable: true,
      usage: {
        downloads: 23,
        views: 156,
        remixes: 8
      }
    },
    {
      id: 'asset-2',
      assetName: 'Cyberpunk Building Set',
      assetType: 'model',
      owner: userId,
      creator: 'tech-artist-99',
      licenseType: 'personal',
      mintedAt: new Date('2025-07-08'),
      price: 19.99,
      transferable: false,
      usage: {
        downloads: 12,
        views: 89,
        remixes: 3
      }
    },
    {
      id: 'asset-3',
      assetName: 'Crystal Cave Realm',
      assetType: 'realm',
      owner: userId,
      creator: userId,
      licenseType: 'exclusive',
      mintedAt: new Date('2025-07-12'),
      blockchain: 'Ethereum',
      contractAddress: '0x8f5B2b7608c8f6c4C4b5E4d3e4A0Cc98D3C9',
      tokenId: '2047',
      royaltyPercentage: 15,
      transferable: true,
      usage: {
        downloads: 0,
        views: 5,
        remixes: 0
      }
    }
  ]);

  const [mintingAsset, setMintingAsset] = useState({
    name: '',
    type: 'model' as AssetOwnership['assetType'],
    licenseType: 'personal' as AssetOwnership['licenseType'],
    price: '',
    royalty: '10',
    transferable: true
  });

  const handleMintAsset = () => {
    console.log('Minting asset:', mintingAsset);
    alert('🪙 Asset minted successfully! NFT ownership recorded on blockchain.');
  };

  const handleTransfer = (asset: AssetOwnership) => {
    if (!asset.transferable) {
      alert('This asset is not transferable.');
      return;
    }
    const recipient = prompt('Enter recipient wallet address:');
    if (recipient) {
      console.log('Transferring asset:', asset.id, 'to:', recipient);
      alert(`📤 Asset "${asset.assetName}" transferred to ${recipient}`);
    }
  };

  const getLicenseColor = (license: string) => {
    switch (license) {
      case 'exclusive': return 'text-purple-300 bg-purple-600/20 border-purple-500/30';
      case 'commercial': return 'text-green-300 bg-green-600/20 border-green-500/30';
      default: return 'text-blue-300 bg-blue-600/20 border-blue-500/30';
    }
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'realm': return '🌍';
      case 'model': return '🏗️';
      case 'texture': return '🎨';
      case 'audio': return '🎵';
      case 'template': return '📦';
      default: return '📄';
    }
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold">Smart Contract Ownership</h2>
        </div>
        <div className="text-sm text-gray-400">
          Blockchain-verified asset ownership
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-6 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('owned')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'owned' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
          }`}
        >
          <Shield className="h-4 w-4 inline mr-2" />
          My Assets ({ownedAssets.length})
        </button>
        <button
          onClick={() => setActiveTab('created')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'created' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
          }`}
        >
          <FileText className="h-4 w-4 inline mr-2" />
          Mint New Asset
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'marketplace' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
          }`}
        >
          <DollarSign className="h-4 w-4 inline mr-2" />
          Marketplace
        </button>
      </div>

      {activeTab === 'owned' && (
        <div className="space-y-4">
          {ownedAssets.map((asset) => (
            <div key={asset.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getAssetIcon(asset.assetType)}</div>
                  <div>
                    <h3 className="text-lg font-bold">{asset.assetName}</h3>
                    <p className="text-gray-400 text-sm capitalize">{asset.assetType}</p>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-lg border text-xs font-medium ${getLicenseColor(asset.licenseType)}`}>
                  {asset.licenseType}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400">Creator</div>
                  <div className="font-medium">{asset.creator}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Minted</div>
                  <div className="font-medium">{asset.mintedAt.toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Downloads</div>
                  <div className="font-medium">{asset.usage.downloads}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Royalty</div>
                  <div className="font-medium">{asset.royaltyPercentage || 0}%</div>
                </div>
              </div>

              {asset.blockchain && (
                <div className="bg-gray-700/50 rounded p-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-medium">Blockchain Verified</span>
                  </div>
                  <div className="text-gray-400">
                    {asset.blockchain} • Token #{asset.tokenId}
                  </div>
                  <div className="text-gray-400 font-mono text-xs">
                    {asset.contractAddress}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors">
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors">
                  <Download className="h-4 w-4" />
                  Download
                </button>
                {asset.transferable && (
                  <button 
                    onClick={() => handleTransfer(asset)}
                    className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    Transfer
                  </button>
                )}
                <button className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors">
                  <FileText className="h-4 w-4" />
                  License
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'created' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Mint New Asset NFT</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Asset Name</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="My Amazing Asset"
                value={mintingAsset.name}
                onChange={(e) => setMintingAsset(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Asset Type</label>
              <select
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                value={mintingAsset.type}
                onChange={(e) => setMintingAsset(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="model">3D Model</option>
                <option value="texture">Texture</option>
                <option value="audio">Audio</option>
                <option value="template">Template</option>
                <option value="realm">Full Realm</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">License Type</label>
              <select
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                value={mintingAsset.licenseType}
                onChange={(e) => setMintingAsset(prev => ({ ...prev, licenseType: e.target.value as any }))}
              >
                <option value="personal">Personal Use</option>
                <option value="commercial">Commercial License</option>
                <option value="exclusive">Exclusive Rights</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="29.99"
                value={mintingAsset.price}
                onChange={(e) => setMintingAsset(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Royalty (%)</label>
              <input
                type="number"
                min="0"
                max="50"
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-500"
                placeholder="10"
                value={mintingAsset.royalty}
                onChange={(e) => setMintingAsset(prev => ({ ...prev, royalty: e.target.value }))}
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="transferable"
                checked={mintingAsset.transferable}
                onChange={(e) => setMintingAsset(prev => ({ ...prev, transferable: e.target.checked }))}
                className="w-4 h-4"
              />
              <label htmlFor="transferable" className="text-sm">
                Allow transfers/resales
              </label>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-bold mb-2">🔗 Blockchain Benefits</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Immutable ownership proof</li>
              <li>• Automatic royalty collection</li>
              <li>• Global marketplace access</li>
              <li>• Creator attribution protection</li>
            </ul>
          </div>

          <button
            onClick={handleMintAsset}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Mint NFT Asset
          </button>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-xl font-bold mb-2">NFT Marketplace</h3>
          <p className="text-gray-400 mb-4">
            Trade, buy, and sell verified digital assets
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Explore Marketplace
          </button>
        </div>
      )}
    </div>
  );
}