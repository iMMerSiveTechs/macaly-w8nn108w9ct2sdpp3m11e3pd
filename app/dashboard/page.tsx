'use client';
import { useState, useEffect } from 'react';
import { User, LogOut, TrendingUp, Zap, Crown, Settings, Plus, Eye, DollarSign, Users } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('nemurium_auth');
    const userData = localStorage.getItem('nemurium_user');
    
    if (!authStatus || authStatus !== 'true') {
      window.location.href = '/login';
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nemurium_auth');
    localStorage.removeItem('nemurium_user');
    window.location.href = '/';
  };

  const stats = {
    worldsCreated: 12,
    totalViews: 2847,
    tipsEarned: 247.50,
    followers: 89,
    realmVisits: 1429,
    assetsUploaded: 34
  };

  const recentActivity = [
    { type: 'world', action: 'Created "Cyberpunk Alley" world', time: '2 hours ago', icon: '🌃' },
    { type: 'tip', action: 'Received $15.00 tip on "Mystical Forest"', time: '4 hours ago', icon: '💰' },
    { type: 'view', action: '"Space Station Alpha" reached 500 views', time: '1 day ago', icon: '👁️' },
    { type: 'collaboration', action: 'Invited to collaborate on "Ocean Depths"', time: '2 days ago', icon: '🤝' },
    { type: 'achievement', action: 'Unlocked "Master Builder" badge', time: '3 days ago', icon: '🏆' }
  ];

  const quickActions = [
    { 
      title: 'Create New World', 
      description: 'Build an immersive realm from scratch',
      icon: '🌍',
      href: '/world-builder',
      color: 'from-purple-600 to-blue-600',
      hoverColor: 'from-purple-700 to-blue-700'
    },
    { 
      title: 'AI Copilot', 
      description: 'Get intelligent creation assistance',
      icon: '🤖',
      href: '/ai-copilot',
      color: 'from-green-600 to-teal-600',
      hoverColor: 'from-green-700 to-teal-700'
    },
    { 
      title: 'Asset Library', 
      description: 'Browse and upload 3D assets',
      icon: '📦',
      href: '/asset-library',
      color: 'from-orange-600 to-red-600',
      hoverColor: 'from-orange-700 to-red-700'
    },
    { 
      title: 'Realm Network', 
      description: 'Connect and explore worlds',
      icon: '🗺️',
      href: '/realm-map',
      color: 'from-indigo-600 to-purple-600',
      hoverColor: 'from-indigo-700 to-purple-700'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-purple-400 hover:text-white transition-colors"
              >
                🌌 Nemurium
              </button>
              <div className="h-6 w-px bg-white/20"></div>
              <h1 className="text-xl font-bold">Creator Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Pro</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">{user?.name || 'Creator'}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'Creator'}! 👋
          </h2>
          <p className="text-gray-400">
            Ready to build amazing immersive experiences? Let's create something extraordinary.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Worlds Created</h3>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-purple-400">{stats.worldsCreated}</p>
            <p className="text-xs text-gray-500 mt-1">+3 this week</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Total Views</h3>
              <Eye className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-400">{stats.totalViews.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Tips Earned</h3>
              <DollarSign className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">${stats.tipsEarned}</p>
            <p className="text-xs text-gray-500 mt-1">+$89 this week</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Followers</h3>
              <Users className="h-4 w-4 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-orange-400">{stats.followers}</p>
            <p className="text-xs text-gray-500 mt-1">+7 new followers</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => window.location.href = action.href}
                className={`bg-gradient-to-r ${action.color} hover:${action.hoverColor} p-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-left group`}
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-white">
                  {action.title}
                </h4>
                <p className="text-sm opacity-90 group-hover:opacity-100">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold mb-4">📈 Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                  <span className="text-xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats & Tools */}
          <div className="space-y-6">
            {/* Performance Overview */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">🎯 Performance Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Realm Visits</span>
                  <span className="font-bold">{stats.realmVisits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Assets Uploaded</span>
                  <span className="font-bold">{stats.assetsUploaded}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Avg. Session Time</span>
                  <span className="font-bold">8m 34s</span>
                </div>
              </div>
            </div>

            {/* Creator Tools */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">🛠️ Creator Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-black/20 hover:bg-black/30 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <span>📊</span>
                    <div>
                      <p className="font-medium">Analytics</p>
                      <p className="text-xs text-gray-400">View detailed metrics</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 bg-black/20 hover:bg-black/30 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <span>⚙️</span>
                    <div>
                      <p className="font-medium">Settings</p>
                      <p className="text-xs text-gray-400">Manage your account</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 bg-black/20 hover:bg-black/30 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <span>💡</span>
                    <div>
                      <p className="font-medium">Get Help</p>
                      <p className="text-xs text-gray-400">Documentation & support</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}