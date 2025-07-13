"use client"

import { useState, useEffect } from 'react';

interface UserProgress {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalWorlds: number;
  achievements: string[];
}

const achievements = [
  { id: 'first_world', name: 'First Steps', desc: 'Created your first world', icon: '🌍' },
  { id: 'week_streak', name: 'Dedicated Creator', desc: '7-day creation streak', icon: '🔥' },
  { id: 'viral_world', name: 'Viral Creator', desc: 'World reached 1000+ views', icon: '🚀' },
  { id: 'ai_master', name: 'AI Whisperer', desc: 'Used 50+ AI tools', icon: '🧠' },
  { id: 'collaborator', name: 'Team Player', desc: 'Collaborated on 5+ worlds', icon: '🤝' },
  { id: 'monetizer', name: 'Entrepreneur', desc: 'Earned $100+ from creations', icon: '💰' }
];

export default function ViralEngagement() {
  const [progress, setProgress] = useState<UserProgress>({
    level: 5,
    xp: 1250,
    xpToNext: 1500,
    streak: 7,
    totalWorlds: 12,
    achievements: ['first_world', 'week_streak', 'ai_master']
  });
  
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [dailyReward, setDailyReward] = useState<string | null>(null);

  useEffect(() => {
    // Check for daily reward
    const lastReward = localStorage.getItem('lastDailyReward');
    const today = new Date().toDateString();
    
    if (lastReward !== today) {
      const rewards = ['🎁 50 XP Bonus', '⚡ 2x Generation Speed', '🌟 Premium Asset Access'];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setDailyReward(randomReward);
      localStorage.setItem('lastDailyReward', today);
    }
  }, []);

  const handleShareWorld = async (platform: string) => {
    console.log(`🔗 Sharing world on ${platform}`);
    
    const shareData = {
      title: '🌍 Check out my immersive world in Nemurium!',
      text: 'I just created an amazing 3D world using AI. Come explore it with me!',
      url: `${window.location.origin}/world/demo-${Date.now()}`
    };

    try {
      if (platform === 'native' && navigator.share) {
        await navigator.share(shareData);
      } else if (platform === 'twitter') {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
        window.open(twitterUrl, '_blank');
      } else if (platform === 'copy') {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
      
      // Award XP for sharing
      setProgress(prev => ({ ...prev, xp: prev.xp + 50 }));
      
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const handleClaimReward = () => {
    setDailyReward(null);
    setProgress(prev => ({ ...prev, xp: prev.xp + 50 }));
  };

  const progressPercent = (progress.xp / progress.xpToNext) * 100;

  return (
    <div className="space-y-6">
      {/* Daily Reward Popup */}
      {dailyReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm mx-4 text-center">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold mb-2">Daily Reward!</h3>
            <p className="text-gray-600 mb-4">Welcome back! Here's your reward:</p>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 mb-6">
              <div className="text-lg font-semibold text-purple-700">{dailyReward}</div>
            </div>
            <button
              onClick={handleClaimReward}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Claim Reward
            </button>
          </div>
        </div>
      )}

      {/* Level Progress */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Level {progress.level} Creator</h2>
            <p className="text-purple-100">Keep creating to level up!</p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Next Level</div>
            <div className="text-lg font-semibold">{progress.xp}/{progress.xpToNext} XP</div>
          </div>
        </div>
        
        <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-4">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{progress.streak}</div>
            <div className="text-sm opacity-80">Day Streak 🔥</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{progress.totalWorlds}</div>
            <div className="text-sm opacity-80">Worlds Created</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{progress.achievements.length}</div>
            <div className="text-sm opacity-80">Achievements</div>
          </div>
        </div>
      </div>

      {/* Viral Sharing */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          🚀 Share Your Creations
          <span className="ml-2 text-sm font-normal bg-green-100 text-green-800 px-2 py-1 rounded">+50 XP</span>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => handleShareWorld('twitter')}
            className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors"
          >
            <span>🐦</span>
            <span>Share on Twitter</span>
          </button>
          
          <button
            onClick={() => handleShareWorld('copy')}
            className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-800 text-white p-4 rounded-lg transition-colors"
          >
            <span>🔗</span>
            <span>Copy Link</span>
          </button>
          
          <button
            onClick={() => handleShareWorld('native')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-lg transition-colors"
          >
            <span>📱</span>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">🏆 Achievements</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const unlocked = progress.achievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  unlocked
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className={`font-semibold ${unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                      {achievement.name}
                    </div>
                    <div className={`text-sm ${unlocked ? 'text-green-600' : 'text-gray-500'}`}>
                      {achievement.desc}
                    </div>
                  </div>
                  {unlocked && (
                    <div className="ml-auto">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        ✓ Unlocked
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">⚡ Weekly Challenge</h3>
        <p className="mb-4 text-amber-100">Create a world with the theme "Underwater City"</p>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-80">Progress</div>
            <div className="text-lg font-semibold">2/5 elements added</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Reward</div>
            <div className="text-lg font-semibold">🎁 Exclusive Asset Pack</div>
          </div>
        </div>
        
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-4">
          <div className="bg-white h-2 rounded-full" style={{ width: '40%' }}></div>
        </div>
      </div>
    </div>
  );
}