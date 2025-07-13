"use client"

import { useState } from 'react';

export default function NemuraPage() {
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
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6">🎬 Nemura</h1>
          <p className="text-2xl text-purple-200 mb-8">
            Immersive Video Realm Creator
          </p>
          <p className="text-lg text-purple-300 max-w-3xl mx-auto">
            Upload 360° video, create cinematic worlds, and build immersive film experiences. 
            Transform your footage into spatial narratives with AI-powered scene understanding.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/30">
            <h2 className="text-2xl font-bold mb-6 text-center">📹 Upload Immersive Video</h2>
            
            <div className="mb-6">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-4 bg-purple-900/30 border border-purple-500/50 rounded-lg text-white"
              />
            </div>

            {file && (
              <div className="mb-6 p-4 bg-purple-800/30 rounded-lg">
                <p className="text-purple-200">🎥 {file.name}</p>
                <p className="text-sm text-purple-300">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <p className="text-xs text-purple-400 mt-2">
                  Supports: MP4, MOV, AVI, WebM • 360° video optimized
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                uploading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
              }`}
            >
              {uploading ? 'Processing Video...' : uploaded ? '✅ Video Processed!' : 'Upload to Nemura Studio'}
            </button>

            {uploaded && (
              <div className="mt-6 p-4 bg-green-900/30 rounded-lg text-center">
                <p className="text-green-300 mb-2">🎬 Video successfully processed!</p>
                <p className="text-sm text-green-400">Ready for immersive realm integration</p>
              </div>
            )}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-black/20 p-6 rounded-lg text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold mb-2">360° Support</h3>
              <p className="text-sm text-purple-300">Full spherical video processing</p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-bold mb-2">AI Enhancement</h3>
              <p className="text-sm text-purple-300">Smart scene understanding</p>
            </div>
            <div className="bg-black/20 p-6 rounded-lg text-center">
              <div className="text-3xl mb-2">🥽</div>
              <h3 className="font-bold mb-2">VR Ready</h3>
              <p className="text-sm text-purple-300">VisionOS & headset optimized</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}