'use client';
import { useState } from 'react';
import { Lock, Unlock, Zap, Crown, Star, Sparkles, ArrowUp } from 'lucide-react';

interface TierFeature {
  name: string;
  free: string | number;
  basic: string | number;
  pro: string | number;
  unlimited: boolean;
}

interface TierLimitsProps {
  currentTier: 'free' | 'basic' | 'pro';
  onUpgrade: (tier: string) => void;
}

export default function TierLimits({ currentTier, onUpgrade }: TierLimitsProps) {
  const [showComparison, setShowComparison] = useState(false);

  const features: TierFeature[] = [
    { name: 'AI Generations', free: '1/day', basic: '25/month', pro: '200/month', unlimited: false },
    { name: 'Realms', free: 1, basic: 5, pro: 'Unlimited', unlimited: true },
    { name: 'Asset Uploads', free: 3, basic: 50, pro: 'Unlimited', unlimited: true },
    { name: 'Portal Links', free: 1, basic: 5, pro: 25, unlimited: false },
    { name: 'Multiplayer Invites', free: 1, basic: 10, pro: 'Unlimited', unlimited: true },
    { name: 'Marketplace Access', free: 'View Only', basic: 'Buy & Sell', pro: 'Priority Listing', unlimited: false },
    { name: 'Storage', free: '100MB', basic: '2GB', pro: '20GB', unlimited: false },
    { name: 'Support', free: 'Community', basic: 'Email', pro: 'Priority Chat', unlimited: false }
  ];

  const tierNames = {
    free: 'Builder Trial',
    basic: 'Creator',
    pro: 'Architect'
  };

  const tierPrices = {
    basic: '$9/month',
    pro: '$24/month'
  };

  const getCurrentUsage = (feature: string) => {
    // Simulated usage data
    const usage = {
      'AI Generations': { used: 1, limit: 1 },
      'Realms': { used: 1, limit: 1 },
      'Asset Uploads': { used: 2, limit: 3 },
      'Portal Links': { used: 1, limit: 1 },
      'Multiplayer Invites': { used: 0, limit: 1 }
    };
    return usage[feature] || { used: 0, limit: 0 };
  };

  const isLimited = (feature: string) => {
    if (currentTier === 'pro') return false;
    const usage = getCurrentUsage(feature);
    return usage.used >= usage.limit;
  };

  const getFeatureValue = (feature: TierFeature, tier: string) => {
    switch (tier) {
      case 'free': return feature.free;
      case 'basic': return feature.basic;
      case 'pro': return feature.pro;
      default: return feature.free;
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'free': return <Zap className="h-4 w-4" />;
      case 'basic': return <Star className="h-4 w-4" />;
      case 'pro': return <Crown className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'free': return 'from-gray-500 to-gray-600';
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'pro': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-black/80 backdrop-blur-md rounded-xl p-6 text-white border border-purple-500/30 max-w-lg">
      {/* Current Tier Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${getTierColor(currentTier)} rounded-lg flex items-center justify-center`}>
            {getTierIcon(currentTier)}
          </div>
          <div>
            <h2 className="font-bold text-lg">{tierNames[currentTier]}</h2>
            <p className="text-gray-400 text-sm">Your current plan</p>
          </div>
        </div>
        
        {currentTier !== 'pro' && (
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            Upgrade
          </button>
        )}
      </div>

      {/* Usage Overview */}
      <div className="space-y-3 mb-6">
        {features.slice(0, 5).map((feature) => {
          const usage = getCurrentUsage(feature.name);
          const current = getFeatureValue(feature, currentTier);
          const limited = isLimited(feature.name);
          
          return (
            <div key={feature.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {limited ? (
                  <Lock className="h-4 w-4 text-red-400" />
                ) : (
                  <Unlock className="h-4 w-4 text-green-400" />
                )}
                <span className="text-sm">{feature.name}</span>
              </div>
              
              <div className="text-right">
                {usage.limit > 0 && (
                  <div className="text-xs text-gray-400 mb-1">
                    {usage.used} / {current}
                  </div>
                )}
                <div className={`text-sm font-medium ${limited ? 'text-red-400' : 'text-green-400'}`}>
                  {current}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade CTA */}
      {currentTier !== 'pro' && (
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="font-medium text-sm">Unlock More Power</span>
          </div>
          <p className="text-xs text-gray-300 mb-3">
            {currentTier === 'free' 
              ? 'Upgrade to Creator for unlimited realms and 25 AI generations per month'
              : 'Upgrade to Architect for unlimited everything and priority support'
            }
          </p>
          <button
            onClick={() => onUpgrade(currentTier === 'free' ? 'basic' : 'pro')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all"
          >
            {currentTier === 'free' ? `Upgrade to Creator ${tierPrices.basic}` : `Upgrade to Architect ${tierPrices.pro}`}
          </button>
        </div>
      )}

      {/* Full Comparison Table */}
      {showComparison && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h3 className="font-medium mb-4 text-center">Compare All Plans</h3>
          
          <div className="grid grid-cols-4 gap-3 text-xs">
            <div className="font-medium text-gray-400">Feature</div>
            <div className="text-center font-medium text-gray-400">Trial</div>
            <div className="text-center font-medium text-blue-400">Creator</div>
            <div className="text-center font-medium text-purple-400">Architect</div>
            
            {features.map((feature) => (
              <>
                <div key={feature.name} className="py-2 text-gray-300">{feature.name}</div>
                <div className="py-2 text-center text-gray-400">{feature.free}</div>
                <div className="py-2 text-center text-blue-400">{feature.basic}</div>
                <div className="py-2 text-center text-purple-400">{feature.pro}</div>
              </>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div></div>
            <button
              onClick={() => onUpgrade('basic')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded text-xs transition-colors"
            >
              {tierPrices.basic}
            </button>
            <button
              onClick={() => onUpgrade('pro')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-3 rounded text-xs transition-colors"
            >
              {tierPrices.pro}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}