"use client"

import ImmersiveToolLoader from '@/components/ImmersiveToolLoader';
import VisionOSPortal from '@/components/VisionOSPortal';
import StripePricingTiers from '@/components/StripePricingTiers';
import ViralEngagement from '@/components/ViralEngagement';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🛠️ Creator Tools & Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access AI-powered tools, immersive experiences, and creator features all in one place. 
              Level up your content creation with integrated workflows.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Immersive Tools */}
        <section className="bg-gray-900 rounded-xl p-8">
          <ImmersiveToolLoader />
        </section>

        {/* VisionOS Portal */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🥽 Immersive Experience</h2>
            <p className="text-gray-600">Enter VisionOS and AR/VR environments directly from your browser</p>
          </div>
          <VisionOSPortal />
        </section>

        {/* Engagement & Gamification */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎮 Creator Progress</h2>
            <p className="text-gray-600">Track your growth, earn achievements, and unlock new features</p>
          </div>
          <ViralEngagement />
        </section>

        {/* Quick Actions */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h2>
            <p className="text-gray-600">Jump into creation mode or access advanced features</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="/world-builder"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🏗️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">World Builder</h3>
              <p className="text-gray-600 text-sm">Create immersive 3D worlds</p>
            </a>
            
            <a
              href="/asset-library"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📦</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Asset Library</h3>
              <p className="text-gray-600 text-sm">Browse premium 3D assets</p>
            </a>
            
            <a
              href="/sonarium"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎧</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonarium</h3>
              <p className="text-gray-600 text-sm">Spatial audio tools</p>
            </a>
            
            <a
              href="/nemura"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow text-center group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎬</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nemura</h3>
              <p className="text-gray-600 text-sm">Immersive video creation</p>
            </a>
          </div>
        </section>

        {/* Pricing Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">💎 Upgrade Your Experience</h2>
            <p className="text-gray-600">Unlock advanced features and premium tools</p>
          </div>
          <StripePricingTiers />
        </section>

        {/* Developer API Section */}
        <section>
          <div className="bg-gray-900 rounded-xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">🔧 Developer API</h2>
              <p className="text-gray-300">Integrate Nemurium into your own applications</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-2">📡</div>
                <h3 className="font-semibold mb-2">REST API</h3>
                <p className="text-gray-300 text-sm">Full CRUD operations for worlds and assets</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">🔌</div>
                <h3 className="font-semibold mb-2">WebSocket</h3>
                <p className="text-gray-300 text-sm">Real-time collaboration and updates</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <h3 className="font-semibold mb-2">SDKs</h3>
                <p className="text-gray-300 text-sm">JavaScript, Python, and Unity SDKs</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a
                href="/docs/api"
                className="inline-flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>📖</span>
                <span>View API Documentation</span>
              </a>
            </div>
          </div>
        </section>

        {/* Community & Support */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🤝 Community & Support</h2>
            <p className="text-gray-600">Connect with other creators and get help when you need it</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://discord.gg/nemurium"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white rounded-xl p-6 text-center hover:bg-indigo-700 transition-colors"
            >
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2">Discord Community</h3>
              <p className="text-indigo-100 text-sm">Chat with creators and get real-time help</p>
            </a>
            
            <a
              href="/help"
              className="bg-green-600 text-white rounded-xl p-6 text-center hover:bg-green-700 transition-colors"
            >
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">Help Center</h3>
              <p className="text-green-100 text-sm">Tutorials, guides, and documentation</p>
            </a>
            
            <a
              href="/support"
              className="bg-purple-600 text-white rounded-xl p-6 text-center hover:bg-purple-700 transition-colors"
            >
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Direct Support</h3>
              <p className="text-purple-100 text-sm">Get personalized help from our team</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}