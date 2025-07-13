'use client';
import { useState } from 'react';
import { Trophy, Star, Crown, Zap, Target, Heart, Medal, Award } from 'lucide-react';

interface Trophy {
  id: string;
  title: string;
  description: string;
  date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: any;
  progress?: number;
  maxProgress?: number;
}

interface TrophyRoomProps {
  trophies?: Trophy[];
  userId?: string;
}

export default function TrophyRoom({ trophies = [], userId }: TrophyRoomProps) {
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Mock trophies for demo
  const defaultTrophies: Trophy[] = [
    {
      id: '1',
      title: 'World Builder',
      description: 'Created your first immersive realm',
      date: '2025-07-12',
      rarity: 'common',
      icon: Target
    },
    {
      id: '2',
      title: 'Founders Pass',
      description: 'Early supporter of Nemurium',
      date: '2025-07-11',
      rarity: 'legendary',
      icon: Crown
    },
    {
      id: '3',
      title: 'Community Builder',
      description: 'Helped 10+ creators with their realms',
      date: '2025-07-10',
      rarity: 'rare',
      icon: Heart,
      progress: 7,
      maxProgress: 10
    },
    {
      id: '4',
      title: 'AI Whisperer',
      description: 'Generated 50+ AI-powered assets',
      date: '2025-07-09',
      rarity: 'epic',
      icon: Zap
    },
    {
      id: '5',
      title: 'Portal Master',
      description: 'Created connections between 5 realms',
      date: '2025-07-08',
      rarity: 'rare',
      icon: Star
    }
  ];

  const displayTrophies = trophies.length > 0 ? trophies : defaultTrophies;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-purple-500 to-pink-500 border-purple-400';
      case 'epic': return 'from-blue-500 to-purple-500 border-blue-400';
      case 'rare': return 'from-green-500 to-blue-500 border-green-400';
      case 'common': return 'from-gray-500 to-gray-600 border-gray-400';
      default: return 'from-gray-500 to-gray-600 border-gray-400';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'shadow-purple-500/50';
      case 'epic': return 'shadow-blue-500/50';
      case 'rare': return 'shadow-green-500/50';
      default: return 'shadow-gray-500/30';
    }
  };

  const filteredTrophies = filter === 'all' 
    ? displayTrophies 
    : displayTrophies.filter(t => t.rarity === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="h-10 w-10 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Trophy Room
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Showcase your achievements in the immersive realm
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {['all', 'legendary', 'epic', 'rare', 'common'].map((rarityFilter) => (
            <button
              key={rarityFilter}
              onClick={() => setFilter(rarityFilter)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                filter === rarityFilter
                  ? 'bg-white text-black'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {rarityFilter}
            </button>
          ))}
        </div>

        {/* Trophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrophies.map((trophy) => {
            const Icon = trophy.icon;
            return (
              <div
                key={trophy.id}
                onClick={() => setSelectedTrophy(trophy)}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${getRarityColor(trophy.rarity)} ${getRarityGlow(trophy.rarity)} shadow-xl bg-gradient-to-br`}
              >
                {/* Rarity indicator */}
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-black/50 capitalize ${
                    trophy.rarity === 'legendary' ? 'text-purple-300' :
                    trophy.rarity === 'epic' ? 'text-blue-300' :
                    trophy.rarity === 'rare' ? 'text-green-300' : 'text-gray-300'
                  }`}>
                    {trophy.rarity}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-2">{trophy.title}</h3>
                  <p className="text-sm text-white/80 mb-3">{trophy.description}</p>
                  
                  {/* Progress bar if applicable */}
                  {trophy.progress !== undefined && trophy.maxProgress && (
                    <div className="mb-3">
                      <div className="w-full bg-black/30 rounded-full h-2">
                        <div 
                          className="bg-white h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(trophy.progress / trophy.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1 text-white/70">
                        {trophy.progress}/{trophy.maxProgress}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xs text-white/60">{new Date(trophy.date).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTrophies.length === 0 && (
          <div className="text-center py-12">
            <Medal className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2">No trophies yet</h3>
            <p className="text-gray-500">
              Start building realms and achievements to earn your first trophy!
            </p>
          </div>
        )}

        {/* Trophy Details Modal */}
        {selectedTrophy && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTrophy(null)}
          >
            <div 
              className={`max-w-md w-full p-6 rounded-xl border-2 ${getRarityColor(selectedTrophy.rarity)} ${getRarityGlow(selectedTrophy.rarity)} shadow-2xl bg-gradient-to-br`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                  <selectedTrophy.icon className="h-10 w-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{selectedTrophy.title}</h2>
                <p className="text-white/80 mb-4">{selectedTrophy.description}</p>
                
                <div className="flex items-center justify-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span className="capitalize">{selectedTrophy.rarity}</span>
                  </div>
                  <div>
                    Earned: {new Date(selectedTrophy.date).toLocaleDateString()}
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedTrophy(null)}
                  className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}