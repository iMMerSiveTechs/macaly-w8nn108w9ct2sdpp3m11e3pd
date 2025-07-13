'use client';
import React, { useState } from 'react';
import { Crown, Zap, Star, Shield, Lock, CheckCircle } from 'lucide-react';
import { TIER_CONFIG, UserTier, canAccessFeature } from '@/lib/config';

interface TierBasedDashboardProps {
  userTier: UserTier;
  userId?: string;
}

export default function TierBasedDashboard({ userTier, userId }: TierBasedDashboardProps) {
  const [currentUsage, setCurrentUsage] = useState({
    generations: 12,
    realmsCreated: 3,
    assetsUploaded: 8
  });

  const tierConfig = TIER_CONFIG[userTier];
  const tierLevel = Object.keys(TIER_CONFIG).indexOf(userTier);

  const getTierIcon = (tier: UserTier) => {
    switch (tier) {
      case 'master': return Crown;
      case 'gold': return Star;
      case 'silver': return Zap;
      default: return Shield;
    }
  };

  const getTierColor = (tier: UserTier) => {
    switch (tier) {
      case 'master': return 'from-purple-600 to-pink-600';
      case 'gold': return 'from-yellow-500 to-orange-500';
      case 'silver': return 'from-gray-400 to-gray-600';
      default: return 'from-blue-500 to-blue-700';
    }
  };

  const features = [
    {
      name: 'World Builder',
      description: 'Create immersive 3D realms',
      available: true,
      tier: 'bronze'
    },
    {
      name: 'AI Copilot',
      description: 'AI-powered world generation',
      available: true,
      tier: 'bronze'
    },
    {
      name: 'Asset Library',
      description: 'Access to premium 3D assets',
      available: true,
      tier: 'bronze'
    },
    {
      name: 'Realm Linking',
      description: 'Connect worlds with portals',
      available: canAccessFeature(userTier, 'realm_linking'),
      tier: 'silver'
    },
    {
      name: 'VR Preview',
      description: 'Test realms in VR/AR mode',
      available: canAccessFeature(userTier, 'vr_preview'),
      tier: 'gold'
    },
    {
      name: 'IP Licensing',
      description: 'Commercial rights & revenue sharing',
      available: canAccessFeature(userTier, 'ip_licensing'),
      tier: 'master'
    },
    {
      name: 'Priority Support',
      description: '24/7 technical assistance',
      available: canAccessFeature(userTier, 'priority_support'),
      tier: 'silver'
    },
    {
      name: 'Advanced Analytics',
      description: 'Detailed realm performance metrics',
      available: tierLevel >= 2,
      tier: 'gold'
    }
  ];

  const upgradePrompt = tierLevel < 3 ? Object.keys(TIER_CONFIG)[tierLevel + 1] as UserTier : null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Tier Status Header */}
      <div className={`bg-gradient-to-r ${getTierColor(userTier)} rounded-xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-lg">
              {React.createElement(getTierIcon(userTier), { className: "h-8 w-8" })}
            </div>
            <div>
              <h1 className="text-3xl font-bold capitalize">{userTier} Member</h1>
              <p className="text-white/80">
                ${tierConfig.amount}/month • {tierConfig.limit} AI generations
              </p>
            </div>
          </div>
          
          {upgradePrompt && (
            <div className="text-right">
              <p className="text-sm text-white/80 mb-2">Want more features?</p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                Upgrade to {upgradePrompt}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">AI Generations</h3>
            <Zap className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-2xl font-bold">{currentUsage.generations}</span>
              <span className="text-gray-400">/ {tierConfig.limit}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentUsage.generations / tierConfig.limit) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">
              {tierConfig.limit - currentUsage.generations} remaining this month
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Realms Created</h3>
            <Star className="h-5 w-5 text-purple-400" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{currentUsage.realmsCreated}</div>
            <p className="text-sm text-gray-400">All time</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Assets Uploaded</h3>
            <Shield className="h-5 w-5 text-green-400" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{currentUsage.assetsUploaded}</div>
            <p className="text-sm text-gray-400">Personal library</p>
          </div>
        </div>
      </div>

      {/* Feature Access Grid */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Feature Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                feature.available
                  ? 'bg-green-600/10 border-green-600/30'
                  : 'bg-gray-700/50 border-gray-600/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {feature.available ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${
                      feature.available ? 'text-white' : 'text-gray-400'
                    }`}>
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
                
                <div className={`text-xs px-2 py-1 rounded capitalize ${
                  feature.tier === 'master' ? 'bg-purple-600/20 text-purple-300' :
                  feature.tier === 'gold' ? 'bg-yellow-600/20 text-yellow-300' :
                  feature.tier === 'silver' ? 'bg-gray-600/20 text-gray-300' :
                  'bg-blue-600/20 text-blue-300'
                }`}>
                  {feature.tier}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      {upgradePrompt && (
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to unlock more features?
            </h3>
            <p className="text-gray-300 mb-4">
              Upgrade to {upgradePrompt} and get access to advanced tools, more AI generations, and premium support.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Upgrade to {upgradePrompt}
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Compare Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}