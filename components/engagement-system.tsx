'use client';
import { useState, useEffect } from 'react';
import { Flame, Trophy, Star, Zap, Eye, Users, Gift } from 'lucide-react';

interface UserStats {
  streak: number;
  xp: number;
  level: number;
  realmsCreated: number;
  totalViews: number;
  rank: string;
}

export default function EngagementSystem() {
  const [stats, setStats] = useState<UserStats>({
    streak: 7,
    xp: 2850,
    level: 12,
    realmsCreated: 3,
    totalViews: 1247,
    rank: "Creator"
  });
  
  const [showReward, setShowReward] = useState(false);
  const [dailyReward, setDailyReward] = useState<string | null>(null);

  const spinForReward = () => {
    const rewards = [
      "✨ Mystic Crystal",
      "🌟 XP Boost x2", 
      "🎨 Premium Texture Pack",
      "🚀 Realm Boost Token",
      "💎 Rare Asset Unlock"
    ];
    
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    setDailyReward(reward);
    setShowReward(true);
    
    setTimeout(() => setShowReward(false), 3000);
  };

  const getXPToNextLevel = () => {
    const baseXP = stats.level * 200;
    const currentLevelXP = stats.xp % 200;
    return 200 - currentLevelXP;
  };

  return (
    <div className="fixed top-20 left-4 bg-black/80 backdrop-blur-md text-white rounded-xl p-4 w-72 z-40 border border-purple-500/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Trophy className="h-4 w-4" />
          </div>
          <span className="font-bold">Level {stats.level} {stats.rank}</span>
        </div>
        <div className="flex items-center gap-1 text-orange-400">
          <Flame className="h-4 w-4" />
          <span className="font-bold">{stats.streak}</span>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>XP: {stats.xp}</span>
          <span>{getXPToNextLevel()} to Level {stats.level + 1}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((stats.xp % 200) / 200) * 100}%` }}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
            <Eye className="h-3 w-3" />
            <span className="text-xs">Views</span>
          </div>
          <div className="font-bold text-sm">{stats.totalViews.toLocaleString()}</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
            <Users className="h-3 w-3" />
            <span className="text-xs">Realms</span>
          </div>
          <div className="font-bold text-sm">{stats.realmsCreated}</div>
        </div>
      </div>

      {/* Daily Reward */}
      <div className="mb-4">
        <button
          onClick={spinForReward}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Gift className="h-4 w-4" />
          Spin the Crystal
        </button>
        
        {showReward && dailyReward && (
          <div className="mt-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-2 text-center animate-pulse">
            <div className="text-yellow-400 font-bold text-sm">You got: {dailyReward}!</div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>Daily Goals</span>
          <span>2/3 complete</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="line-through text-gray-500">Visit Nemurium</span>
            <span className="text-green-400">+10 XP</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="line-through text-gray-500">Create 1 asset</span>
            <span className="text-green-400">+25 XP</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span>Share a realm</span>
            <span className="text-blue-400">+50 XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}