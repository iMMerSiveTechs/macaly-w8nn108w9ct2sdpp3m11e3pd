"use client"

import { useState } from 'react';

export default function RoughDiamondsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 text-gradient bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            💎 Rough Diamonds Music
          </h1>
          <p className="text-2xl text-yellow-200 mb-8">
            Immersive Artist Hub & Label Portal
          </p>
          <p className="text-lg text-yellow-300 max-w-3xl mx-auto">
            Connect your music to immersive worlds. Upload albums, create virtual concerts, 
            and link your art to Sonarium spatial audio and VR experiences.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 border border-yellow-500/30">
            <h2 className="text-2xl font-bold mb-6 text-center">🎤 Upload to Label Vault</h2>
            
            <div className="mb-6">
              <input
                type="file"
                accept="audio/*,image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg text-white"
              />
            </div>

            {file && (
              <div className="mb-6 p-4 bg-yellow-800/30 rounded-lg">
                <p className="text-yellow-200">🎵 {file.name}</p>
                <p className="text-sm text-yellow-300">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <p className="text-xs text-yellow-400 mt-2">
                  Supports: MP3, WAV, FLAC, JPG, PNG • Album art & audio files
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                uploading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 transform hover:scale-105'
              }`}
            >
              {uploading ? 'Adding to Vault...' : uploaded ? '✅ Added to Label!' : 'Add to Label Vault'}
            </button>

            {uploaded && (
              <div className="mt-6 p-4 bg-green-900/30 rounded-lg text-center">
                <p className="text-green-300 mb-2">💎 Track added to Rough Diamonds!</p>
                <p className="text-sm text-green-400">Ready for immersive concert integration</p>
              </div>
            )}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">🎪 Virtual Concerts</h3>
              <ul className="space-y-2 text-sm text-yellow-200">
                <li>• Host live VR performances</li>
                <li>• Spatial audio integration</li>
                <li>• Interactive fan experiences</li>
                <li>• Multi-platform streaming</li>
              </ul>
            </div>
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">💰 Monetization</h3>
              <ul className="space-y-2 text-sm text-yellow-200">
                <li>• NFT album releases</li>
                <li>• Exclusive VR content</li>
                <li>• Fan support integration</li>
                <li>• Revenue sharing tools</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-yellow-500">
              🎸 Featured Artists: Connect with immersive music experiences
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}