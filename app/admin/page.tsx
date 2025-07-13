"use client"

import { useState } from 'react';
import AdminAnalytics from '@/components/AdminAnalytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'tools', name: 'AI Tools', icon: '🧰' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'legal', name: 'Legal Vault', icon: '🔐' },
    { id: 'system', name: 'System', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nemurium Admin Dashboard</h1>
              <p className="text-gray-600">Manage platform operations and analytics</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              🟢 System Online
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'analytics' && (
            <div>
              <AdminAnalytics />
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">🧰 AI Tools Management</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold">Tool Integration Status</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>VoiceType</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>RabbitHoles</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>PropStyle.ai</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Testing</span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold">Partner Tools Pipeline</h3>
                  <p className="text-gray-600 mt-2">Tools under consideration for integration</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    <li>• KeepMind - Knowledge bases</li>
                    <li>• AgentPass.ai - Secure agents</li>
                    <li>• Inkr - Creative tools</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">👥 User Management</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">89</div>
                    <div className="text-sm text-gray-600">Active Today</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">23</div>
                    <div className="text-sm text-gray-600">Premium Users</div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Recent Signups</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>user@example.com</span>
                      <span className="text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>creator@domain.com</span>
                      <span className="text-gray-500">5 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">🔐 Legal & Licensing Vault</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold">Licensing Status</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Platform License (CC-BY-NC)</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>AI Tools Compliance</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Verified</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>IP Protection</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Implemented</span>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold">Legal Documents</h3>
                  <ul className="mt-2 space-y-1">
                    <li><a href="/legal/terms.pdf" className="text-blue-600 hover:underline">📄 Terms of Service</a></li>
                    <li><a href="/legal/privacy.pdf" className="text-blue-600 hover:underline">🔒 Privacy Policy</a></li>
                    <li><a href="/legal/ai-policy.md" className="text-blue-600 hover:underline">🤖 AI Usage Policy</a></li>
                    <li><a href="/LICENSE" className="text-blue-600 hover:underline">📜 License Agreement</a></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">⚙️ System Management</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold">System Health</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>API Status</span>
                        <span className="text-green-600">🟢 Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Database</span>
                        <span className="text-green-600">🟢 Connected</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage</span>
                        <span className="text-green-600">🟢 Available</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold">Security Monitoring</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span>Threat Detection</span>
                        <span className="text-green-600">🛡️ Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed Login Attempts</span>
                        <span className="text-blue-600">0 today</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPUHammer Protection</span>
                        <span className="text-green-600">🔒 Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}