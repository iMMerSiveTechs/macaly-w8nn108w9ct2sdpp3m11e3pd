'use client';
import { useState, useEffect } from 'react';
import { Calendar, Trophy, Clock, Users, Zap, Star, Target } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: string;
  participants: number;
  timeLeft: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic';
  progress: number;
  completed: boolean;
}

export default function WeeklyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Mystical Forest Challenge',
      description: 'Create a magical forest realm with at least 5 different tree types and mystical elements',
      reward: '🏆 Forest Guardian Badge + 500 XP',
      participants: 1247,
      timeLeft: '3d 14h',
      difficulty: 'Medium',
      progress: 60,
      completed: false
    },
    {
      id: '2', 
      title: 'Daily Creator',
      description: 'Build something new every day this week',
      reward: '⚡ Creator Streak Badge + XP Multiplier',
      participants: 892,
      timeLeft: '2d 8h',
      difficulty: 'Hard',
      progress: 85,
      completed: false
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Get 10 likes on your realm and comment on 5 others',
      reward: '🌟 Community Star + Profile Boost',
      participants: 2103,
      timeLeft: '5d 2h',
      difficulty: 'Easy',
      progress: 100,
      completed: true
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-orange-400 bg-orange-400/20';
      case 'Epic': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTimeUrgency = (timeLeft: string) => {
    if (timeLeft.includes('h') && !timeLeft.includes('d')) {
      return 'text-red-400 animate-pulse';
    } else if (timeLeft.includes('1d')) {
      return 'text-orange-400';
    }
    return 'text-gray-400';
  };

  return (
    <div className="bg-black/80 backdrop-blur-md rounded-xl p-6 text-white border border-purple-500/30 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Weekly Challenges</h2>
            <p className="text-gray-400 text-sm">Compete & earn exclusive rewards</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-bold">2/3</div>
          <div className="text-xs text-gray-400">completed</div>
        </div>
      </div>

      {/* Global Challenge Progress */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 mb-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Community Goal</span>
          <span className="text-sm text-gray-300">87% complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-[87%]"></div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>🌍 Create 10,000 realms this week</span>
          <span>8,743 / 10,000</span>
        </div>
      </div>

      {/* Individual Challenges */}
      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm">{challenge.title}</h3>
                  {challenge.completed && (
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-2">{challenge.description}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Users className="h-3 w-3" />
                    <span>{challenge.participants.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-3">
                <div className={`text-xs font-medium ${getTimeUrgency(challenge.timeLeft)}`}>
                  <Clock className="h-3 w-3 inline mr-1" />
                  {challenge.timeLeft}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Progress</span>
                <span className={challenge.completed ? 'text-green-400' : 'text-white'}>
                  {challenge.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    challenge.completed 
                      ? 'bg-green-500' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>

            {/* Reward */}
            <div className="flex items-center justify-between">
              <div className="text-xs">
                <span className="text-gray-400">Reward: </span>
                <span className="text-yellow-400 font-medium">{challenge.reward}</span>
              </div>
              
              {challenge.completed ? (
                <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Claimed
                </button>
              ) : (
                <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full font-medium transition-colors">
                  Join
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>New challenges every Monday</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400" />
            <span>Premium members get 2x rewards</span>
          </div>
        </div>
      </div>
    </div>
  );
}