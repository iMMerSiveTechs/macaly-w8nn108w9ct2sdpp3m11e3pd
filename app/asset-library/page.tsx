'use client';
import EnhancedAssetLibrary from '@/components/enhanced-asset-library';
import VisionOSViewer from '@/components/VisionOSViewer';

export default function AssetLibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Immersive Asset Library
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Discover thousands of premium 3D assets, environments, and templates to build incredible immersive experiences
          </p>
        </div>

        {/* VisionOS Preview Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            ✨ Preview in VisionOS
          </h2>
          <div className="max-w-4xl mx-auto">
            <VisionOSViewer />
          </div>
        </div>

        {/* Enhanced Asset Library */}
        <EnhancedAssetLibrary />
      </div>
    </div>
  );
}