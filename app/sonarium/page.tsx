"use client"

import AudioUploader from '@/components/AudioUploader';

export default function SonariumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6">🎧 Sonarium</h1>
          <p className="text-2xl text-purple-200 mb-8">
            Immersive Spatial Audio Platform
          </p>
          <p className="text-lg text-purple-300 max-w-3xl mx-auto">
            Upload spatial audio, create immersive soundscapes, and build audio experiences 
            that respond to 3D environments. Connect your audio to VR worlds and mixed reality experiences.
          </p>
        </div>

        <AudioUploader />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-black/30 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">🌌</div>
            <h3 className="text-xl font-bold mb-2">Spatial Audio</h3>
            <p className="text-gray-300">Position audio in 3D space with HRTF processing</p>
          </div>
          
          <div className="bg-black/30 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-bold mb-2">Multi-Format</h3>
            <p className="text-gray-300">Support for MP3, WAV, OGG, and spatial audio formats</p>
          </div>
          
          <div className="bg-black/30 p-6 rounded-xl text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2">World Integration</h3>
            <p className="text-gray-300">Connect directly to Nemurium worlds and VR experiences</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">🎧 Featured Audio Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Spatial Positioning</h3>
              <p className="text-gray-300 mb-4">Place audio sources in 3D space with precise positioning and distance modeling</p>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors">
                Learn More
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900/50 to-teal-900/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Interactive Soundscapes</h3>
              <p className="text-gray-300 mb-4">Create dynamic audio that responds to user actions and world events</p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}