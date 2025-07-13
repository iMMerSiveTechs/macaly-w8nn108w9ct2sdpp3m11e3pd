'use client';
import { useState } from 'react';
import TierBasedDashboard from '@/components/TierBasedDashboard';
import RealmTicketSystem from '@/components/RealmTicketSystem';
import SmartContractOwnership from '@/components/SmartContractOwnership';
import VisionOSViewer from '@/components/VisionOSViewer';
import { UserTier } from '@/lib/config';

export default function DashboardPage() {
  // Demo user state - in production, get from auth
  const [userTier, setUserTier] = useState<UserTier>('silver');
  const [activeSection, setActiveSection] = useState<'overview' | 'tickets' | 'ownership' | 'visionos'>('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'tickets', label: 'Realm Tickets', icon: '🎫' },
    { id: 'ownership', label: 'Asset Ownership', icon: '🛡️' },
    { id: 'visionos', label: 'VisionOS Preview', icon: '👓' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Navigation */}
      <div className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Creator Dashboard</h1>
            
            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>

            {/* Tier Switcher (Demo) */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Demo Tier:</span>
              <select
                value={userTier}
                onChange={(e) => setUserTier(e.target.value as UserTier)}
                className="bg-gray-700 text-white text-sm px-3 py-1 rounded border border-gray-600"
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="master">Master</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {activeSection === 'overview' && (
          <TierBasedDashboard userTier={userTier} userId="demo-user" />
        )}

        {activeSection === 'tickets' && (
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Realm Monetization</h2>
              <p className="text-gray-400">Create tickets for exclusive access to your immersive realms</p>
            </div>
            <RealmTicketSystem creatorMode={true} />
          </div>
        )}

        {activeSection === 'ownership' && (
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Blockchain Ownership</h2>
              <p className="text-gray-400">Mint, manage, and trade your digital assets as NFTs</p>
            </div>
            <SmartContractOwnership userId="demo-user" mode="creator" />
          </div>
        )}

        {activeSection === 'visionos' && (
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">VisionOS Integration</h2>
              <p className="text-gray-400">Experience your realms in spatial computing</p>
            </div>
            <VisionOSViewer />
          </div>
        )}
      </div>

      {/* Quick Actions Panel */}
      <div className="fixed bottom-6 right-6 bg-gray-800/90 backdrop-blur-md rounded-xl p-4 text-white">
        <div className="text-sm font-semibold mb-3">Quick Actions</div>
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm transition-colors">
            🌍 New Realm
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded text-sm transition-colors">
            🧠 AI Generate
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm transition-colors">
            💾 Save Progress
          </button>
        </div>
      </div>
    </div>
  );
}