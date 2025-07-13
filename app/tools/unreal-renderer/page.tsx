'use client';
import { useState, useEffect } from 'react';
import { Upload, Download, Settings, Zap, Monitor, Cpu, Eye, Layers } from 'lucide-react';

interface RenderJob {
  id: string;
  name: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  inputFile: string;
  outputFile?: string;
  renderTime: number;
  quality: 'draft' | 'standard' | 'ultra' | 'cinematic';
  resolution: string;
  estimatedTime: number;
}

export default function UnrealRendererPage() {
  const [renderJobs, setRenderJobs] = useState<RenderJob[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [renderSettings, setRenderSettings] = useState({
    quality: 'standard',
    resolution: '1920x1080',
    rayTracing: true,
    globalIllumination: true,
    antiAliasing: 'FXAA',
    postProcessing: true
  });

  const qualityOptions = [
    { value: 'draft', label: 'Draft (Fast)', time: '2-5 min', description: 'Basic quality for quick previews' },
    { value: 'standard', label: 'Standard', time: '5-15 min', description: 'Good balance of quality and speed' },
    { value: 'ultra', label: 'Ultra', time: '15-45 min', description: 'High quality with advanced effects' },
    { value: 'cinematic', label: 'Cinematic', time: '45-120 min', description: 'Maximum quality for final output' }
  ];

  const resolutionOptions = [
    '1280x720',
    '1920x1080',
    '2560x1440',
    '3840x2160',
    '7680x4320'
  ];

  useEffect(() => {
    // Mock render jobs
    const mockJobs: RenderJob[] = [
      {
        id: '1',
        name: 'Cyberpunk_City_Scene_v3.uasset',
        status: 'completed',
        progress: 100,
        inputFile: 'cyberpunk_scene.blend',
        outputFile: 'cyberpunk_rendered.mp4',
        renderTime: 23,
        quality: 'ultra',
        resolution: '1920x1080',
        estimatedTime: 25
      },
      {
        id: '2',
        name: 'Forest_Environment_Final.uasset',
        status: 'processing',
        progress: 67,
        inputFile: 'forest_env.fbx',
        renderTime: 15,
        quality: 'standard',
        resolution: '1920x1080',
        estimatedTime: 22
      },
      {
        id: '3',
        name: 'Space_Station_Walkthrough.uasset',
        status: 'queued',
        progress: 0,
        inputFile: 'space_station.blend',
        renderTime: 0,
        quality: 'cinematic',
        resolution: '3840x2160',
        estimatedTime: 78
      }
    ];
    
    setRenderJobs(mockJobs);

    // Simulate progress updates
    const interval = setInterval(() => {
      setRenderJobs(prev => prev.map(job => {
        if (job.status === 'processing' && job.progress < 100) {
          const newProgress = Math.min(job.progress + Math.random() * 5, 100);
          return {
            ...job,
            progress: newProgress,
            renderTime: job.renderTime + 1,
            status: newProgress >= 100 ? 'completed' : 'processing'
          };
        }
        return job;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newJob: RenderJob = {
      id: Date.now().toString(),
      name: file.name,
      status: 'queued',
      progress: 0,
      inputFile: file.name,
      renderTime: 0,
      quality: renderSettings.quality as any,
      resolution: renderSettings.resolution,
      estimatedTime: getEstimatedTime(renderSettings.quality, renderSettings.resolution)
    };
    
    setRenderJobs(prev => [newJob, ...prev]);
    setIsUploading(false);

    // Start processing after a delay
    setTimeout(() => {
      setRenderJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'processing' } : job
      ));
    }, 3000);
  };

  const getEstimatedTime = (quality: string, resolution: string) => {
    const baseTime = {
      draft: 5,
      standard: 12,
      ultra: 30,
      cinematic: 75
    }[quality] || 12;
    
    const resolutionMultiplier = {
      '1280x720': 1,
      '1920x1080': 1.5,
      '2560x1440': 2.2,
      '3840x2160': 4,
      '7680x4320': 8
    }[resolution] || 1.5;
    
    return Math.round(baseTime * resolutionMultiplier);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'processing': return 'text-blue-400 bg-blue-400/20';
      case 'queued': return 'text-yellow-400 bg-yellow-400/20';
      case 'failed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'draft': return 'text-gray-400';
      case 'standard': return 'text-blue-400';
      case 'ultra': return 'text-purple-400';
      case 'cinematic': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-blue-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                🎬 Unreal Quality Renderer
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center gap-2 bg-gray-600/80 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
                <Monitor className="h-4 w-4" />
                System Status
              </button>
              <button className="flex items-center gap-2 bg-indigo-600/80 hover:bg-indigo-600 px-4 py-2 rounded-lg transition">
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload & Settings Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload 3D Scene
              </h3>
              
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-400/50 transition">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".blend,.fbx,.uasset,.gltf,.glb"
                  className="hidden"
                  id="scene-upload"
                  disabled={isUploading}
                />
                <label 
                  htmlFor="scene-upload" 
                  className={`cursor-pointer ${isUploading ? 'opacity-50' : ''}`}
                >
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-400 border-t-transparent mx-auto"></div>
                      <p className="text-sm">Uploading...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm">
                        Drop your 3D scene file here or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports .blend, .fbx, .uasset, .gltf, .glb
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Render Settings */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Render Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quality Preset</label>
                  <select
                    value={renderSettings.quality}
                    onChange={(e) => setRenderSettings(prev => ({ ...prev, quality: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  >
                    {qualityOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label} ({option.time})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">
                    {qualityOptions.find(o => o.value === renderSettings.quality)?.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Resolution</label>
                  <select
                    value={renderSettings.resolution}
                    onChange={(e) => setRenderSettings(prev => ({ ...prev, resolution: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  >
                    {resolutionOptions.map(res => (
                      <option key={res} value={res} className="bg-gray-800">
                        {res} {res === '3840x2160' && '(4K)'} {res === '7680x4320' && '(8K)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ray Tracing</span>
                    <input
                      type="checkbox"
                      checked={renderSettings.rayTracing}
                      onChange={(e) => setRenderSettings(prev => ({ ...prev, rayTracing: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Global Illumination</span>
                    <input
                      type="checkbox"
                      checked={renderSettings.globalIllumination}
                      onChange={(e) => setRenderSettings(prev => ({ ...prev, globalIllumination: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Post Processing</span>
                    <input
                      type="checkbox"
                      checked={renderSettings.postProcessing}
                      onChange={(e) => setRenderSettings(prev => ({ ...prev, postProcessing: e.target.checked }))}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-sm text-gray-400">
                    Estimated render time: {getEstimatedTime(renderSettings.quality, renderSettings.resolution)} minutes
                  </div>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Render Farm Status
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Available GPUs</span>
                  <span className="text-green-400">24/32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Queue Position</span>
                  <span className="text-blue-400">#3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Power</span>
                  <span className="text-purple-400">RTX 4090 Cluster</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Load</span>
                  <span className="text-yellow-400">75%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Render Jobs Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Render Queue
                </h3>
                <div className="text-sm text-gray-400">
                  {renderJobs.filter(j => j.status === 'processing').length} processing • 
                  {renderJobs.filter(j => j.status === 'queued').length} queued • 
                  {renderJobs.filter(j => j.status === 'completed').length} completed
                </div>
              </div>

              <div className="space-y-4">
                {renderJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-blue-500/50 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-lg mb-1">{job.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Input: {job.inputFile}</span>
                          <span className={getQualityColor(job.quality)}>
                            {job.quality.charAt(0).toUpperCase() + job.quality.slice(1)}
                          </span>
                          <span>{job.resolution}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(job.status)}`}>
                          {job.status.toUpperCase()}
                        </span>
                        {job.status === 'completed' && job.outputFile && (
                          <button className="text-blue-400 hover:text-blue-300 p-1">
                            <Download className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {job.status === 'processing' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress: {Math.round(job.progress)}%</span>
                          <span>
                            {job.renderTime}m / ~{job.estimatedTime}m
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {job.status === 'completed' && (
                      <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-green-400">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm">Render completed in {job.renderTime} minutes</span>
                          </div>
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            Download
                          </button>
                        </div>
                      </div>
                    )}

                    {job.status === 'queued' && (
                      <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">
                            Estimated start time: ~{Math.round(job.estimatedTime * 0.3)} minutes
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {renderJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Layers className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">No render jobs yet</h4>
                    <p className="text-gray-400">Upload a 3D scene to start your first render</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}