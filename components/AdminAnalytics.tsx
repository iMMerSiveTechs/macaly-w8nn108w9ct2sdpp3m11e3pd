"use client"

import { useEffect, useState } from "react";

interface ToolStats {
  totalClicks: number;
  toolStats: { [key: string]: number };
  recentClicks: Array<{ tool: string; timestamp: string; userId: string }>;
}

export default function AdminAnalytics() {
  const [stats, setStats] = useState<ToolStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/track-tool-click");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  const topTools = Object.entries(stats.toolStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          📊 AI Tools Analytics Dashboard
          <span className="ml-2 text-sm font-normal bg-green-100 text-green-800 px-2 py-1 rounded">Live</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{stats.totalClicks}</div>
            <div className="text-sm text-gray-600">Total Tool Clicks</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{Object.keys(stats.toolStats).length}</div>
            <div className="text-sm text-gray-600">Active Tools</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {stats.recentClicks.length > 0 ? "🟢" : "🔴"}
            </div>
            <div className="text-sm text-gray-600">System Status</div>
          </div>
        </div>
      </div>

      {/* Top Tools */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🔥 Most Popular Tools</h3>
        <div className="space-y-3">
          {topTools.map(([tool, count], index) => (
            <div key={tool} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                <span className="font-semibold text-gray-900">{tool}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {count} clicks
                </div>
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(count / Math.max(...Object.values(stats.toolStats))) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Recent Activity</h3>
        <div className="space-y-2">
          {stats.recentClicks.length > 0 ? (
            stats.recentClicks.reverse().map((click, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-semibold">{click.tool}</span>
                  <span className="text-gray-500">clicked by</span>
                  <span className="text-purple-600">{click.userId}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(click.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}