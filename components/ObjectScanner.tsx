"use client"

import { useState, useRef } from 'react';

interface ScanResult {
  id: string;
  originalImage: string;
  processedModel: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  metadata: {
    vertices: number;
    faces: number;
    fileSize: string;
    processingTime: number;
  };
}

export default function ObjectScanner() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    processImage(file);
  };

  const processImage = async (file: File) => {
    setIsScanning(true);
    
    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    
    // Initialize scan result
    const scanId = `scan_${Date.now()}`;
    const newScanResult: ScanResult = {
      id: scanId,
      originalImage: imageUrl,
      processedModel: '',
      status: 'processing',
      progress: 0,
      metadata: {
        vertices: 0,
        faces: 0,
        fileSize: '',
        processingTime: 0
      }
    };
    
    setScanResult(newScanResult);

    // Simulate 3D processing with progress updates
    const startTime = Date.now();
    
    try {
      // Simulate AI processing steps
      const steps = [
        { name: 'Analyzing image structure...', duration: 1000 },
        { name: 'Detecting depth information...', duration: 1500 },
        { name: 'Generating 3D geometry...', duration: 2000 },
        { name: 'Optimizing mesh...', duration: 1000 },
        { name: 'Finalizing model...', duration: 500 }
      ];

      let totalProgress = 0;
      
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        console.log(`🔄 ${step.name}`);
        
        await new Promise(resolve => setTimeout(resolve, step.duration));
        
        totalProgress = ((i + 1) / steps.length) * 100;
        setScanResult(prev => prev ? { ...prev, progress: totalProgress } : null);
      }

      // Mock successful result
      const processingTime = Date.now() - startTime;
      const finalResult: ScanResult = {
        ...newScanResult,
        status: 'completed',
        progress: 100,
        processedModel: '/models/scanned_object.glb', // Mock model URL
        metadata: {
          vertices: Math.floor(Math.random() * 5000) + 1000,
          faces: Math.floor(Math.random() * 2500) + 500,
          fileSize: `${(Math.random() * 5 + 1).toFixed(1)}MB`,
          processingTime
        }
      };

      setScanResult(finalResult);
      console.log('✅ 3D scan completed successfully');

    } catch (error) {
      console.error('❌ Scan failed:', error);
      setScanResult(prev => prev ? { ...prev, status: 'failed' } : null);
    } finally {
      setIsScanning(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const downloadModel = () => {
    if (scanResult?.processedModel) {
      const link = document.createElement('a');
      link.href = scanResult.processedModel;
      link.download = `scanned_object_${scanResult.id}.glb`;
      link.click();
    }
  };

  const addToWorld = () => {
    if (scanResult?.processedModel) {
      console.log('🌍 Adding scanned object to world builder');
      alert('Object added to your prefab library!');
    }
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 text-white max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">📸 Object-to-3D Scanner</h2>
        <p className="text-gray-400">
          Upload a photo of any object to generate a 3D model using AI photogrammetry
        </p>
      </div>

      {!scanResult ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-500/10' 
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-xl font-semibold mb-2">Drop an image here</h3>
          <p className="text-gray-400 mb-4">
            or click to browse files
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Select Image
          </button>
          
          <div className="mt-4 text-sm text-gray-500">
            Supports: JPG, PNG, WebP • Max size: 10MB
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Original Image */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Original Image</h3>
              <div className="bg-gray-800 rounded-lg p-4">
                <img 
                  src={scanResult.originalImage} 
                  alt="Original" 
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">3D Preview</h3>
              <div className="bg-gray-800 rounded-lg p-4 h-56 flex items-center justify-center">
                {scanResult.status === 'processing' ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔄</div>
                    <div className="text-sm text-gray-400">Processing...</div>
                  </div>
                ) : scanResult.status === 'completed' ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <div className="text-sm text-green-400">3D Model Ready</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">❌</div>
                    <div className="text-sm text-red-400">Processing Failed</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {scanResult.status === 'processing' && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Processing Progress</span>
                <span>{Math.round(scanResult.progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanResult.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Metadata */}
          {scanResult.status === 'completed' && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Model Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Vertices</div>
                  <div className="font-semibold">{scanResult.metadata.vertices.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400">Faces</div>
                  <div className="font-semibold">{scanResult.metadata.faces.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-400">File Size</div>
                  <div className="font-semibold">{scanResult.metadata.fileSize}</div>
                </div>
                <div>
                  <div className="text-gray-400">Process Time</div>
                  <div className="font-semibold">{(scanResult.metadata.processingTime / 1000).toFixed(1)}s</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            {scanResult.status === 'completed' && (
              <>
                <button
                  onClick={addToWorld}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  🌍 Add to World
                </button>
                <button
                  onClick={downloadModel}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition-colors"
                >
                  💾 Download GLB
                </button>
              </>
            )}
            
            <button
              onClick={resetScanner}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              🔄 New Scan
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
        <div className="text-sm text-blue-200">
          <strong>💡 Scanning Tips:</strong>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Use well-lit photos with clear object definition</li>
            <li>Avoid reflective or transparent surfaces</li>
            <li>Objects should fill most of the frame</li>
            <li>Higher resolution images produce better 3D models</li>
          </ul>
        </div>
      </div>
    </div>
  );
}