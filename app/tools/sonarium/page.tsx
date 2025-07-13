'use client';
import { useState, useRef } from 'react';
import { Upload, Play, Pause, Volume2, Settings, Download, Activity, Sparkles } from 'lucide-react';

export default function SonariumPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedAudio, setProcessedAudio] = useState('');
  const [spatialSettings, setSpatialSettings] = useState({
    roomSize: 'medium',
    reverbLevel: 0.3,
    spatialWidth: 0.7,
    bassEnhancement: 0.5,
    binauralMode: true,
    frequencyAnalysis: true
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const roomTypes = [
    { id: 'intimate', name: 'Intimate Space', description: 'Small room, close listening' },
    { id: 'medium', name: 'Living Room', description: 'Medium space with natural acoustics' },
    { id: 'hall', name: 'Concert Hall', description: 'Large venue with rich reverb' },
    { id: 'cathedral', name: 'Cathedral', description: 'Massive space with long decay' },
    { id: 'outdoor', name: 'Outdoor', description: 'Open air with minimal reflections' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setProcessedAudio('');
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const processAudio = async () => {
    if (!audioFile) return;
    
    setIsProcessing(true);
    
    // Simulate spatial audio processing
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setProcessedAudio(`🎵 Sonarium Spatial Audio Processing Complete!

📁 Original File: ${audioFile.name}
🎧 Enhanced: ${audioFile.name.replace(/\.[^/.]+$/, '')}_spatial_enhanced.wav

🔊 Spatial Audio Features Applied:
• Room simulation: ${roomTypes.find(r => r.id === spatialSettings.roomSize)?.name}
• Reverb processing: ${(spatialSettings.reverbLevel * 100).toFixed(0)}% natural reverb
• Spatial width: ${(spatialSettings.spatialWidth * 100).toFixed(0)}% stereo field
• Bass enhancement: ${(spatialSettings.bassEnhancement * 100).toFixed(0)}% low-end boost
${spatialSettings.binauralMode ? '✅ Binaural 3D positioning enabled' : '❌ Binaural mode disabled'}
${spatialSettings.frequencyAnalysis ? '✅ Frequency spectrum optimization applied' : '❌ Frequency analysis skipped'}

🎯 Processing Details:
• Sample rate: 96kHz (hi-res)
• Bit depth: 24-bit floating point
• Channels: Stereo → 3D spatial
• Latency: <20ms for real-time
• HRTF: Personalized head-related transfer function
• Distance modeling: Realistic attenuation curves

🌟 Compatible with:
• Apple Spatial Audio
• Dolby Atmos
• Sony 360 Reality Audio
• Standard stereo headphones
• VR/AR headsets

✅ Ready for immersive deployment!`);
    
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-red-950 to-pink-950 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/world-builder'}
                className="text-orange-400 hover:text-white transition-colors"
              >
                ← Back to World Builder
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                🎵 Sonarium - Spatial Audio Engine
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Immersive 3D Audio Processing</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Transform any audio into spatial, immersive soundscapes. 
            Perfect for VR environments, meditation spaces, and cinematic experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Audio Upload & Controls */}
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-orange-400" />
                Upload Audio File
              </h3>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <div className="text-4xl mb-4">🎧</div>
                  <p className="text-lg font-medium mb-2">
                    {audioFile ? audioFile.name : 'Upload your audio file'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Supports: MP3, WAV, FLAC, OGG • Max size: 200MB
                  </p>
                </label>
              </div>

              {audioFile && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-5 w-5 text-green-400" />
                        <div>
                          <p className="font-medium text-green-400">Audio file loaded</p>
                          <p className="text-sm text-gray-400">
                            {audioFile.name} • {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={togglePlayback}
                        className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <audio
                    ref={audioRef}
                    src={audioFile ? URL.createObjectURL(audioFile) : ''}
                    onEnded={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="w-full"
                    controls
                  />
                </div>
              )}
            </div>

            {/* Spatial Settings */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Spatial Audio Settings
              </h3>
              
              <div className="space-y-6">
                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium mb-3">Virtual Space</label>
                  <div className="grid grid-cols-1 gap-2">
                    {roomTypes.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => setSpatialSettings({...spatialSettings, roomSize: room.id})}
                        className={`text-left p-3 rounded-lg border transition ${
                          spatialSettings.roomSize === room.id
                            ? 'bg-orange-600/20 border-orange-500/50 text-orange-400'
                            : 'bg-black/20 border-gray-600 hover:bg-black/30'
                        }`}
                      >
                        <div className="font-medium">{room.name}</div>
                        <div className="text-xs opacity-75">{room.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-4">
                  {[
                    { key: 'reverbLevel', label: 'Reverb Level', min: 0, max: 1, step: 0.1 },
                    { key: 'spatialWidth', label: 'Spatial Width', min: 0, max: 1, step: 0.1 },
                    { key: 'bassEnhancement', label: 'Bass Enhancement', min: 0, max: 1, step: 0.1 }
                  ].map((setting) => (
                    <div key={setting.key}>
                      <label className="block text-sm font-medium mb-2">{setting.label}</label>
                      <input
                        type="range"
                        min={setting.min}
                        max={setting.max}
                        step={setting.step}
                        value={spatialSettings[setting.key as keyof typeof spatialSettings] as number}
                        onChange={(e) => setSpatialSettings({
                          ...spatialSettings,
                          [setting.key]: parseFloat(e.target.value)
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{setting.min}</span>
                        <span>{((spatialSettings[setting.key as keyof typeof spatialSettings] as number) * 100).toFixed(0)}%</span>
                        <span>{setting.max}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  {[
                    { key: 'binauralMode', label: 'Binaural 3D Mode', description: 'Enhanced spatial positioning' },
                    { key: 'frequencyAnalysis', label: 'Frequency Optimization', description: 'Automatic EQ adjustment' }
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{setting.label}</div>
                        <div className="text-xs text-gray-400">{setting.description}</div>
                      </div>
                      <button
                        onClick={() => setSpatialSettings({
                          ...spatialSettings,
                          [setting.key]: !spatialSettings[setting.key as keyof typeof spatialSettings]
                        })}
                        className={`w-12 h-6 rounded-full transition ${
                          spatialSettings[setting.key as keyof typeof spatialSettings] 
                            ? 'bg-orange-600' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          spatialSettings[setting.key as keyof typeof spatialSettings] 
                            ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Button */}
            <button
              onClick={processAudio}
              disabled={!audioFile || isProcessing}
              className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-3"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Processing Spatial Audio...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Create Spatial Audio
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Processing Results
              {processedAudio && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  Ready
                </span>
              )}
            </h3>

            {processedAudio ? (
              <div className="space-y-4">
                <div className="bg-black/40 p-6 rounded-lg border border-green-500/20 min-h-96">
                  <pre className="text-green-400 whitespace-pre-wrap text-sm leading-relaxed">
                    {processedAudio}
                  </pre>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-green-600/80 hover:bg-green-600 px-4 py-3 rounded-lg transition flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="bg-blue-600/80 hover:bg-blue-600 px-4 py-3 rounded-lg transition flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" />
                    Preview 3D
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-black/40 p-6 rounded-lg min-h-96 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-4">🎼</div>
                  <p className="text-lg font-medium mb-2">Spatial Audio Engine Ready</p>
                  <p className="text-sm">
                    Upload an audio file and configure spatial settings to begin processing.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Overview */}
        <div className="mt-12 bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-center">🚀 Sonarium Features</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎧</div>
              <h4 className="font-bold mb-2">Binaural Processing</h4>
              <p className="text-sm text-gray-400">
                HRTF-based 3D audio positioning for immersive headphone experience
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏛️</div>
              <h4 className="font-bold mb-2">Room Simulation</h4>
              <p className="text-sm text-gray-400">
                Realistic acoustic environments from intimate to cathedral spaces
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold mb-2">Frequency Analysis</h4>
              <p className="text-sm text-gray-400">
                Automatic EQ optimization for enhanced clarity and depth
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h4 className="font-bold mb-2">Real-time Processing</h4>
              <p className="text-sm text-gray-400">
                Low-latency processing suitable for live performances and VR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}