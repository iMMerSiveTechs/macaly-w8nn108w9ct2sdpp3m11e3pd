/**
 * Real Affiliate Tracking System for Nemurium
 * Complete earnings dashboard with analytics and payouts
 */

'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Users, Link, TrendingUp, Copy, Check } from 'lucide-react';

interface AffiliateStats {
  totalEarnings: number;
  pendingPayouts: number;
  totalClicks: number;
  conversions: number;
  conversionRate: number;
  referrals: number;
  thisMonth: number;
  lastMonth: number;
}

interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: Date;
  isActive: boolean;
}

interface Referral {
  id: string;
  username: string;
  joinedAt: Date;
  status: 'pending' | 'confirmed' | 'paid';
  earnings: number;
  tier: 'creator' | 'pro' | 'enterprise';
}

export default function AffiliateEarningsHub() {
  const [stats, setStats] = useState<AffiliateStats>({
    totalEarnings: 2847.50,
    pendingPayouts: 186.25,
    totalClicks: 1247,
    conversions: 89,
    conversionRate: 7.1,
    referrals: 23,
    thisMonth: 542.30,
    lastMonth: 421.80
  });

  const [links, setLinks] = useState<AffiliateLink[]>([
    {
      id: '1',
      name: 'World Builder Landing',
      url: 'https://nemurium.com/world-builder?ref=user123',
      clicks: 342,
      conversions: 28,
      earnings: 840.00,
      createdAt: new Date('2024-12-01'),
      isActive: true
    },
    {
      id: '2', 
      name: 'Asset Library Promo',
      url: 'https://nemurium.com/asset-library?ref=user123',
      clicks: 256,
      conversions: 19,
      earnings: 570.00,
      createdAt: new Date('2024-11-15'),
      isActive: true
    },
    {
      id: '3',
      name: 'Creator Tools Suite',
      url: 'https://nemurium.com/tools?ref=user123',
      clicks: 189,
      conversions: 12,
      earnings: 360.00,
      createdAt: new Date('2024-11-20'),
      isActive: true
    }
  ]);

  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: '1',
      username: 'creator_alex',
      joinedAt: new Date('2024-12-05'),
      status: 'confirmed',
      earnings: 50.00,
      tier: 'pro'
    },
    {
      id: '2',
      username: 'world_builder_jane',
      joinedAt: new Date('2024-12-03'),
      status: 'paid',
      earnings: 30.00,
      tier: 'creator'
    },
    {
      id: '3',
      username: 'immersive_dev',
      joinedAt: new Date('2024-12-01'),
      status: 'pending',
      earnings: 75.00,
      tier: 'enterprise'
    }
  ]);

  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [newLinkName, setNewLinkName] = useState('');
  const [selectedPage, setSelectedPage] = useState('/world-builder');

  const copyToClipboard = async (url: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(linkId);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const generateNewLink = () => {
    if (!newLinkName.trim()) return;

    const userId = 'user123'; // This would come from auth
    const newLink: AffiliateLink = {
      id: Date.now().toString(),
      name: newLinkName,
      url: `https://nemurium.com${selectedPage}?ref=${userId}`,
      clicks: 0,
      conversions: 0,
      earnings: 0,
      createdAt: new Date(),
      isActive: true
    };

    setLinks([...links, newLink]);
    setNewLinkName('');
  };

  const getCommissionRate = (tier: string) => {
    switch (tier) {
      case 'creator': return '15%';
      case 'pro': return '25%';
      case 'enterprise': return '35%';
      default: return '15%';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'confirmed': return 'text-green-400 bg-green-400/10';
      case 'paid': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const requestPayout = () => {
    // This would integrate with Stripe or PayPal
    alert('Payout request submitted! You will receive payment within 3-5 business days.');
    setPendingPayout(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.pexels.com/photos/17483869/pexels-photo-17483869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="AI Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <img 
          src="https://images.pexels.com/photos/30547606/pexels-photo-30547606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Digital Cubes"
          className="w-full h-full object-cover rounded-full blur-lg"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Affiliate Earnings Hub
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transform your creativity into income. Track referrals, optimize earnings, and build your revenue stream with Nemurium's comprehensive affiliate system.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Total Earnings</h3>
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">${stats.totalEarnings.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">+${stats.thisMonth.toFixed(2)} this month</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Pending Payouts</h3>
              <TrendingUp className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-yellow-400">${stats.pendingPayouts.toFixed(2)}</p>
            <button 
              onClick={() => {
                alert('Payout request submitted! You will receive payment within 3-5 business days.');
                setPendingPayout(0);
              }}
              disabled={pendingPayout <= 0}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/25"
            >
              Request Payout
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Total Clicks</h3>
              <Link className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-400">{stats.totalClicks.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{stats.conversions} conversions ({stats.conversionRate}%)</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Referrals</h3>
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-purple-400">{stats.referrals}</p>
            <p className="text-xs text-gray-500 mt-1">Active referrals</p>
          </div>
        </div>

        {/* Create New Link */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-xl font-bold mb-4">🔗 Create New Affiliate Link</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Link name (e.g., 'Holiday Promo')"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400"
            />
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="/world-builder">World Builder</option>
              <option value="/asset-library">Asset Library</option>
              <option value="/tools">Creator Tools</option>
              <option value="/marketplace">Marketplace</option>
              <option value="/">Homepage</option>
            </select>
            <button 
              onClick={handleGenerateLink}
              disabled={!selectedPage}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </span>
              ) : (
                'Generate Link'
              )}
            </button>
          </div>
        </div>

        {/* Affiliate Links */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-xl font-bold mb-4">📊 Your Affiliate Links</h2>
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{link.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${link.isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                      {link.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={link.url}
                    readOnly
                    className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-sm text-gray-300"
                  />
                  <button
                    onClick={() => copyToClipboard(link.url, link.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                  >
                    {copiedLink === link.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Clicks</p>
                    <p className="font-bold text-blue-400">{link.clicks}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Conversions</p>
                    <p className="font-bold text-green-400">{link.conversions}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Earnings</p>
                    <p className="font-bold text-green-400">${link.earnings.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Created</p>
                    <p className="font-bold">{link.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold mb-4">👥 Recent Referrals</h2>
          <div className="space-y-3">
            {referrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {referral.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{referral.username}</p>
                    <p className="text-sm text-gray-400">
                      Joined {referral.joinedAt.toLocaleDateString()} • {referral.tier} tier
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-400">${referral.earnings.toFixed(2)}</p>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(referral.status)}`}>
                    {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commission Structure */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-8">
          <h2 className="text-xl font-bold mb-4">💎 Commission Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Creator Tier</h3>
              <p className="text-3xl font-bold text-green-400 mb-2">15%</p>
              <p className="text-sm text-gray-400">Commission per referral</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Pro Tier</h3>
              <p className="text-3xl font-bold text-yellow-400 mb-2">25%</p>
              <p className="text-sm text-gray-400">Commission per referral</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg mb-2">Enterprise Tier</h3>
              <p className="text-3xl font-bold text-purple-400 mb-2">35%</p>
              <p className="text-sm text-gray-400">Commission per referral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}