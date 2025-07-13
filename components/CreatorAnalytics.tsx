"use client"

import { useEffect, useState } from "react";

interface CreatorStats {
  userId: string;
  name: string;
  worldsCreated: number;
  totalViews: number;
  assetsUploaded: number;
  revenueGenerated: number;
  tier: string;
  lastActive: string;
  aiToolUsage: { [tool: string]: number };
}

export default function CreatorAnalytics() {
  const [creators, setCreators] = useState<CreatorStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<keyof CreatorStats>('totalViews');

  useEffect(() => {
    // Simulate fetching creator data
    const fetchCreators = async () => {
      // Mock data - in production this would come from your database
      const mockCreators: CreatorStats[] = [
        {
          userId: 'creator_001',
          name: 'Alex Chen',
          worldsCreated: 12,
          totalViews: 5420,
          assetsUploaded: 34,
          revenueGenerated: 1250.50,
          tier: 'gold',
          lastActive: '2025-07-12T10:30:00Z',
          aiToolUsage: { 'VoiceType': 45, 'Artbreeder': 23, 'RabbitHoles': 12 }
        },
        {
          userId: 'creator_002', 
          name: 'Sarah Johnson',
          worldsCreated: 8,
          totalViews: 3210,
          assetsUploaded: 19,
          revenueGenerated: 890.25,
          tier: 'silver',
          lastActive: '2025-07-12T14:15:00Z',
          aiToolUsage: { 'PropStyle.ai': 67, 'Remove.bg': 34, 'VoiceType': 18 }
        },
        {
          userId: 'creator_003',
          name: 'Mike Rodriguez',
          worldsCreated: 25,
          totalViews: 8750,
          assetsUploaded: 67,
          revenueGenerated: 3420.80,
          tier: 'master',
          lastActive: '2025-07-12T09:45:00Z',
          aiToolUsage: { 'Kimi K2': 89, 'Artbreeder': 45, 'RabbitHoles': 56, 'VoiceType': 23 }
        },
        {
          userId: 'creator_004',
          name: 'Emma Wilson',
          worldsCreated: 6,
          totalViews: 1850,
          assetsUploaded: 15,
          revenueGenerated: 320.00,
          tier: 'bronze',
          lastActive: '2025-07-11T16:20:00Z',
          aiToolUsage: { 'Remove.bg': 23, 'VoiceType': 12 }
        }
      ];
      
      setCreators(mockCreators);
      setLoading(false);
    };

    fetchCreators();
  }, []);

  const sortedCreators = [...creators].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return bValue - aValue;
    }
    
    return String(bValue).localeCompare(String(aValue));
  });

  const getTierColor = (tier: string) => {
    const colors = {
      bronze: 'bg-amber-100 text-amber-800',
      silver: 'bg-gray-100 text-gray-800', 
      gold: 'bg-yellow-100 text-yellow-800',
      master: 'bg-purple-100 text-purple-800'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{creators.length}</div>
          <div className="text-sm text-gray-600">Total Creators</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600">
            {creators.reduce((sum, c) => sum + c.worldsCreated, 0)}
          </div>
          <div className="text-sm text-gray-600">Worlds Created</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">
            {creators.reduce((sum, c) => sum + c.totalViews, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-amber-600">
            {formatCurrency(creators.reduce((sum, c) => sum + c.revenueGenerated, 0))}
          </div>
          <div className="text-sm text-gray-600">Revenue Generated</div>
        </div>
      </div>

      {/* Creator List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">👥 Creator Performance Dashboard</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as keyof CreatorStats)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="totalViews">Sort by Views</option>
              <option value="worldsCreated">Sort by Worlds</option>
              <option value="revenueGenerated">Sort by Revenue</option>
              <option value="lastActive">Sort by Activity</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Worlds
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Tools Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedCreators.map((creator) => (
                <tr key={creator.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {creator.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{creator.name}</div>
                        <div className="text-sm text-gray-500">{creator.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(creator.tier)}`}>
                      {creator.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {creator.worldsCreated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {creator.totalViews.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(creator.revenueGenerated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(creator.aiToolUsage).slice(0, 3).map(([tool, count]) => (
                        <span key={tool} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {tool}: {count}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(creator.lastActive)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}