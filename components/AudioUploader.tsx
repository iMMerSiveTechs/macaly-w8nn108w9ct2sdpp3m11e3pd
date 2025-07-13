"use client"

import { useState } from 'react';

export default function AudioUploader() {
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
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-12">
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">🎵 Upload Spatial Audio</h2>
        
        <div className="mb-6">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
          />
        </div>

        {file && (
          <div className="mb-4 p-3 bg-blue-900/30 rounded-lg">
            <p className="text-blue-300">📁 {file.name}</p>
            <p className="text-sm text-gray-400">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            uploading 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {uploading ? 'Uploading...' : uploaded ? '✅ Uploaded!' : 'Upload to Sonarium'}
        </button>

        {uploaded && (
          <div className="mt-4 p-4 bg-green-900/30 rounded-lg text-center">
            <p className="text-green-300">🎧 Audio uploaded to spatial audio library</p>
          </div>
        )}
      </div>
    </div>
  );
}