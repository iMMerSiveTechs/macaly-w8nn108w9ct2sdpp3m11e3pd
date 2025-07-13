"use client"

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [tier, setTier] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    const tierParam = searchParams.get('tier');
    setTier(tierParam);

    // Set features based on tier
    const tierFeatures = {
      bronze: [
        '25 AI generations/month',
        'Basic asset library access',
        'Community support',
        'Standard export formats'
      ],
      silver: [
        '75 AI generations/month',
        'Premium asset library',
        'Priority support',
        'Advanced export options',
        'Collaboration tools'
      ],
      gold: [
        '200 AI generations/month',
        'Full asset library access',
        'VIP support',
        'Commercial licensing',
        'Advanced collaboration',
        'Custom branding'
      ],
      master: [
        '500 AI generations/month',
        'Unlimited asset access',
        'Dedicated support',
        'IP ownership rights',
        'White-label options',
        'Revenue sharing',
        'Early access features'
      ]
    };

    if (tierParam && tierFeatures[tierParam as keyof typeof tierFeatures]) {
      setFeatures(tierFeatures[tierParam as keyof typeof tierFeatures]);
    }
  }, [searchParams]);

  const getTierColor = (tier: string | null) => {
    const colors = {
      bronze: 'from-amber-400 to-orange-500',
      silver: 'from-gray-400 to-gray-600',
      gold: 'from-yellow-400 to-yellow-600',
      master: 'from-purple-500 to-indigo-600'
    };
    return colors[tier as keyof typeof colors] || 'from-green-400 to-blue-500';
  };

  const getTierIcon = (tier: string | null) => {
    const icons = {
      bronze: '🥉',
      silver: '🥈',
      gold: '🥇',
      master: '👑'
    };
    return icons[tier as keyof typeof icons] || '🎉';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
            <div className="text-4xl animate-bounce">✅</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Nemurium!</h1>
          <p className="text-gray-600">Your subscription has been activated successfully</p>
        </div>

        {/* Tier Badge */}
        {tier && (
          <div className={`inline-flex items-center space-x-3 bg-gradient-to-r ${getTierColor(tier)} text-white px-6 py-3 rounded-full mb-8`}>
            <span className="text-2xl">{getTierIcon(tier)}</span>
            <span className="font-bold text-lg capitalize">{tier} Creator</span>
          </div>
        )}

        {/* Features List */}
        {features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your New Features:</h2>
            <div className="grid md:grid-cols-2 gap-3 text-left">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 What's Next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">1</span>
              <div>
                <div className="font-semibold text-gray-900">Explore the World Builder</div>
                <div className="text-gray-600 text-sm">Start creating your first immersive 3D world</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-semibold">2</span>
              <div>
                <div className="font-semibold text-gray-900">Browse the Asset Library</div>
                <div className="text-gray-600 text-sm">Discover premium 3D models and templates</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">3</span>
              <div>
                <div className="font-semibold text-gray-900">Join the Community</div>
                <div className="text-gray-600 text-sm">Connect with other creators on Discord</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="/world-builder"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            🏗️ Start Building
          </a>
          <a
            href="/asset-library"
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            📦 Browse Assets
          </a>
          <a
            href="https://discord.gg/nemurium"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            💬 Join Discord
          </a>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-2">
            Need help getting started? We're here to support you!
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="/help" className="text-blue-600 hover:underline">📚 Help Center</a>
            <a href="/support" className="text-blue-600 hover:underline">🎯 Contact Support</a>
            <a href="/docs" className="text-blue-600 hover:underline">📖 Documentation</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your success page...</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
}