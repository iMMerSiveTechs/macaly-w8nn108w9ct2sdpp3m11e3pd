'use client';
import { useState } from 'react';
import { Share2, Link, Twitter, MessageCircle, Eye, Heart, Star, Boost } from 'lucide-react';
import { notifications } from '@/utils/notifications';

interface RealmStats {
  views: number;
  likes: number;
  shares: number;
  comments: number;
}

interface ViralSharingProps {
  realmName: string;
  realmId: string;
  creatorName: string;
  stats: RealmStats;
}

export default function ViralSharing({ realmName, realmId, creatorName, stats }: ViralSharingProps) {
  const [showBoost, setShowBoost] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const realmUrl = `https://nemurium.com/realm/${realmId}`;
  
  const shareMessages = {
    twitter: `Just created "${realmName}" in @Nemurium! 🌍✨ The future of immersive creation is here. Check it out: ${realmUrl}`,
    discord: `🌟 New realm alert! "${realmName}" is live on Nemurium!\n\n🎮 Interactive 3D world\n🔮 AI-powered creation\n🚀 VR/AR ready\n\nExplore: ${realmUrl}`,
    general: `Experience "${realmName}" - an immersive 3D realm I created with AI on Nemurium! ${realmUrl}`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    notifications.realmShared('link');
  };

  const shareToSocial = (platform: string) => {
    const message = shareMessages[platform as keyof typeof shareMessages] || shareMessages.general;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
    } else if (platform === 'discord') {
      copyToClipboard(message);
      notifications.realmShared('discord');
    }
    
    setShowShareMenu(false);
  };

  const boostRealm = (tier: string) => {
    notifications.realmBoosted(tier);
    setShowBoost(false);
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 text-white border border-white/10">
      {/* Realm Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{realmName}</h3>
          <p className="text-gray-400 text-sm">by {creatorName}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-400">{stats.views.toLocaleString()}</div>
          <div className="text-xs text-gray-400">total views</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
            <Heart className="h-4 w-4" />
            <span className="font-bold">{stats.likes}</span>
          </div>
          <div className="text-xs text-gray-400">Likes</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
            <Share2 className="h-4 w-4" />
            <span className="font-bold">{stats.shares}</span>
          </div>
          <div className="text-xs text-gray-400">Shares</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
            <MessageCircle className="h-4 w-4" />
            <span className="font-bold">{stats.comments}</span>
          </div>
          <div className="text-xs text-gray-400">Comments</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Realm
        </button>
        
        <button
          onClick={() => setShowBoost(!showBoost)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Boost className="h-4 w-4" />
          Boost
        </button>
      </div>

      {/* Share Menu */}
      {showShareMenu && (
        <div className="bg-gray-800 rounded-lg p-3 mb-4 space-y-2">
          <button
            onClick={() => copyToClipboard(realmUrl)}
            className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center gap-3"
          >
            <Link className="h-4 w-4 text-gray-400" />
            <span>Copy Link</span>
          </button>
          
          <button
            onClick={() => shareToSocial('twitter')}
            className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center gap-3"
          >
            <Twitter className="h-4 w-4 text-blue-400" />
            <span>Share on Twitter</span>
          </button>
          
          <button
            onClick={() => shareToSocial('discord')}
            className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center gap-3"
          >
            <MessageCircle className="h-4 w-4 text-purple-400" />
            <span>Copy for Discord</span>
          </button>
        </div>
      )}

      {/* Boost Menu */}
      {showBoost && (
        <div className="bg-gray-800 rounded-lg p-3 space-y-2">
          <div className="text-sm text-gray-300 mb-2">Boost your realm's visibility:</div>
          
          <button
            onClick={() => boostRealm('silver')}
            className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-gray-400" />
              <span>Silver Boost - 24h</span>
            </div>
            <span className="text-green-400 font-bold">$2</span>
          </button>
          
          <button
            onClick={() => boostRealm('gold')}
            className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Gold Boost - 3 days</span>
            </div>
            <span className="text-green-400 font-bold">$5</span>
          </button>
          
          <button
            onClick={() => boostRealm('platinum')}
            className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Star className="h-4 w-4 text-purple-400" />
              <span>Platinum Boost - 1 week</span>
            </div>
            <span className="text-green-400 font-bold">$12</span>
          </button>
        </div>
      )}

      {/* Live Activity */}
      <div className="text-xs text-gray-400 flex items-center justify-between">
        <span>🔴 3 people viewing now</span>
        <span>+{Math.floor(Math.random() * 20) + 5} views today</span>
      </div>
    </div>
  );
}