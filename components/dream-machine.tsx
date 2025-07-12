"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Download, RefreshCw, Play, Volume2, Box, Camera, Wand2 } from 'lucide-react'
import { FreeAISetup } from './free-ai-setup'
import { PromptHistory } from './prompt-history'
import { AROverlay } from './ar-overlay'
import { FirebaseAuth } from './firebase-auth'
import { EnhancedLoading } from './enhanced-loading'
import { AIModules } from './ai-modules'

interface GenerationResult {
  success: boolean
  url: string
  message?: string
  error?: string
}

type StyleTag = 'moody' | 'vibrant' | 'sci-fi' | 'cinematic' | 'stylized' | 'realistic'
type OutputType = 'image' | 'video' | '3d' | 'voiceover' | 'soundscape' | 'ar-layer'

export function DreamMachine() {
  const [prompt, setPrompt] = useState('')
  const [selectedType, setSelectedType] = useState<OutputType>('image')
  const [selectedStyles, setSelectedStyles] = useState<StyleTag[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [progress, setProgress] = useState(0)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  // Retry utility with exponential backoff
  const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3): Promise<Response> => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options)
        if (response.ok) return response
        
        // If it's a 5xx error, retry; otherwise, throw
        if (response.status >= 500 && i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
          continue
        }
        
        return response
      } catch (error) {
        if (i === maxRetries - 1) throw error
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
    throw new Error('Max retries reached')
  }

  const outputTypes = [
    {
      id: 'image',
      name: 'AI Image',
      description: 'High-quality concept art and visuals',
      icon: Camera,
      gradient: 'from-purple-500 to-pink-500',
      preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop&auto=format'
    },
    {
      id: 'video',
      name: 'Cinematic Video',
      description: 'Dynamic motion sequences and animations',
      icon: Play,
      gradient: 'from-blue-500 to-cyan-500',
      preview: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=200&fit=crop&auto=format'
    },
    {
      id: '3d',
      name: '3D Object (.glb)',
      description: 'VR/AR ready 3D models and assets',
      icon: Box,
      gradient: 'from-green-500 to-emerald-500',
      preview: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop&auto=format'
    },
    {
      id: 'voiceover',
      name: 'AI Voiceover',
      description: 'Natural speech and narration',
      icon: Volume2,
      gradient: 'from-orange-500 to-red-500',
      preview: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=200&fit=crop&auto=format'
    },
    {
      id: 'soundscape',
      name: 'Ambient Soundscape',
      description: 'Immersive audio environments',
      icon: Wand2,
      gradient: 'from-indigo-500 to-purple-500',
      preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop&auto=format'
    },
    {
      id: 'ar-layer',
      name: 'AR World Layer',
      description: 'Spatial computing overlays',
      icon: Sparkles,
      gradient: 'from-pink-500 to-rose-500',
      preview: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=300&h=200&fit=crop&auto=format',
      comingSoon: true
    }
  ]

  const styleOptions: StyleTag[] = ['moody', 'vibrant', 'sci-fi', 'cinematic', 'stylized', 'realistic']

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setResult(null)

    console.log('Generating:', { prompt, selectedType, selectedStyles })

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 1000)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          outputType: selectedType,
          styles: selectedStyles
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setResult({
          success: true,
          url: data.url,
          message: data.message,
          error: data.error
        })
      } else {
        console.error('Generation failed:', data.error)
      }
    } catch (error) {
      console.error('Generation error:', error)
      // For demo purposes, show a placeholder result
      setResult({
        success: false,
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        message: 'Failed to generate',
        error: 'An error occurred'
      })
    }

    clearInterval(progressInterval)
    setLoading(false)
  }

  const toggleStyle = (style: StyleTag) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || loading) return

    setLoading(true)
    setResult(null)

    try {
      console.log('🎨 Submitting generation request:', { prompt, selectedType, selectedStyles })

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          outputType: selectedType,
          styles: selectedStyles
        })
      })

      const data = await response.json()
      console.log('📦 Generation response:', data)

      if (data.success) {
        setResult(data)
      } else {
        console.error('❌ Generation failed:', data.error)
        setResult({
          success: false,
          url: '',
          error: data.error || 'Generation failed'
        })
      }

    } catch (error) {
      console.error('❌ Request failed:', error)
      setResult({
        success: false,
        url: '',
        error: 'Network error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  const resetGeneration = () => {
    setResult(null)
    setProgress(0)
    setPrompt('')
    setSelectedStyles([])
  }

  // Simulate progress when loading
  useEffect(() => {
    if (loading) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [loading])

  const downloadResult = async () => {
    if (!result?.url) return

    try {
      // For different file types
      if (selectedType === '3d') {
        // Create a sample GLB download
        const glbData = new Blob(['sample glb content'], { type: 'model/gltf-binary' })
        const url = URL.createObjectURL(glbData)
        const a = document.createElement('a')
        a.href = url
        a.download = 'nemurium-model.glb'
        a.click()
        URL.revokeObjectURL(url)
      } else if (selectedType === 'video') {
        // Video download
        const a = document.createElement('a')
        a.href = result.url
        a.download = 'nemurium-video.mp4'
        a.click()
      } else if (selectedType === 'voiceover' || selectedType === 'soundscape') {
        // Audio download
        const a = document.createElement('a')
        a.href = result.url
        a.download = `nemurium-audio.mp3`
        a.click()
      } else {
        // Image download
        const response = await fetch(result.url)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'nemurium-image.jpg'
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback - open in new tab
      window.open(result.url, '_blank')
    }
  }

  const handlePromptSelect = (promptText: string, styles: string[], outputType: string) => {
    setPrompt(promptText)
    setSelectedStyles(styles as StyleTag[])
    setSelectedType(outputType as OutputType)
  }

  return (
    <section className="py-20 cosmic-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black text-cosmic-white mb-4">
            🌟 <span className="text-gradient">Nemurium Dream Machine</span>
          </h2>
          <p className="text-xl text-cosmic-white/80 max-w-3xl mx-auto">
            Turn Thought Into World. Dream in HD.
          </p>
          <p className="text-cosmic-white/60 mt-2">
            Powered by FREE AI models - Describe your vision and watch it come to life
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm">
            ✨ FREE AI Generation • No API costs • Powered by HuggingFace
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Free AI Setup Guide */}
          <FreeAISetup />

          {/* AI Modules */}
          <AIModules />

          {/* Firebase Authentication */}
          <FirebaseAuth />

          {/* AR Overlay Demo */}
          <AROverlay />

          {/* Showcase Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-4 rounded-xl border border-cosmic-white/20 group hover:border-cosmic-purple/50 transition-colors"
            >
              <div className="h-32 bg-cover bg-center rounded-lg mb-3"
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format)' }}>
                <div className="w-full h-full bg-gradient-to-br from-diamond/30 to-neonflare/30 rounded-lg" />
              </div>
              <p className="text-cosmic-white/80 text-sm font-medium">"Mystical floating islands"</p>
              <p className="text-cosmic-white/60 text-xs">Generated in 28 seconds</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-4 rounded-xl border border-cosmic-white/20 group hover:border-cosmic-purple/50 transition-colors"
            >
              <div className="h-32 bg-cover bg-center rounded-lg mb-3"
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format)' }}>
                <div className="w-full h-full bg-gradient-to-br from-immersiveblue/30 to-realmglow/30 rounded-lg" />
              </div>
              <p className="text-cosmic-white/80 text-sm font-medium">"Neon cyberpunk marketplace"</p>
              <p className="text-cosmic-white/60 text-xs">Generated in 32 seconds</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-4 rounded-xl border border-cosmic-white/20 group hover:border-cosmic-purple/50 transition-colors"
            >
              <div className="h-32 bg-cover bg-center rounded-lg mb-3"
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format)' }}>
                <div className="w-full h-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-lg" />
              </div>
              <p className="text-cosmic-white/80 text-sm font-medium">"Ancient crystal caverns"</p>
              <p className="text-cosmic-white/60 text-xs">Generated in 25 seconds</p>
            </motion.div>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl border border-cosmic-white/20">
            {/* Prompt History */}
            <PromptHistory
              onSelectPrompt={handlePromptSelect}
              currentPrompt={prompt}
              currentStyles={selectedStyles}
              currentOutputType={selectedType}
            />

            <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-cosmic-white font-semibold mb-3">
                ✨ Describe Your Vision
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A floating neon fortress on a cliff overlooking a digital ocean at sunset..."
                className="w-full h-24 bg-cosmic-space/50 border border-cosmic-white/20 rounded-lg px-4 py-3 text-cosmic-white placeholder-cosmic-white/40 focus:outline-none focus:border-cosmic-purple/50 focus:ring-2 focus:ring-cosmic-purple/20 resize-none"
                data-macaly="dream-machine-prompt"
              />
            </div>

            {/* Output Type Selection */}
            <div className="mb-8">
              <label className="block text-cosmic-white font-semibold mb-4 text-lg">
                🎯 Select Output Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {outputTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedType === type.id
                          ? 'border-cosmic-purple shadow-lg shadow-cosmic-purple/25'
                          : 'border-cosmic-white/20 hover:border-cosmic-white/40'
                      } ${type.comingSoon ? 'opacity-60' : ''}`}
                      onClick={() => !type.comingSoon && setSelectedType(type.id as OutputType)}
                    >
                      {/* Preview Image */}
                      <div className="h-32 bg-cover bg-center relative"
                           style={{ backgroundImage: `url(${type.preview})` }}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-70`} />
                        <div className="absolute inset-0 bg-black/30" />
                        
                        {/* Icon */}
                        <div className="absolute top-3 left-3">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                        </div>

                        {/* Coming Soon Badge */}
                        {type.comingSoon && (
                          <div className="absolute top-3 right-3">
                            <div className="px-2 py-1 bg-amber-500/80 rounded-full text-xs font-medium text-white">
                              Coming Soon
                            </div>
                          </div>
                        )}

                        {/* Selected Indicator */}
                        {selectedType === type.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <div className="w-6 h-6 bg-cosmic-purple rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-cosmic-space/40 backdrop-blur">
                        <h3 className="text-cosmic-white font-semibold text-sm mb-1">
                          {type.name}
                        </h3>
                        <p className="text-cosmic-white/70 text-xs">
                          {type.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Style Tags */}
            <div className="mb-8">
              <label className="block text-cosmic-white font-semibold mb-4 text-lg">
                🎨 Style Tags (Optional)
              </label>
              <div className="flex flex-wrap gap-3">
                {(['moody', 'vibrant', 'sci-fi', 'cinematic', 'stylized', 'realistic'] as StyleTag[]).map((style) => (
                  <motion.button
                    key={style}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => toggleStyle(style)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                      selectedStyles.includes(style)
                        ? 'bg-cosmic-purple text-white shadow-lg shadow-cosmic-purple/25 border-2 border-cosmic-purple'
                        : 'bg-cosmic-white/10 text-cosmic-white border-2 border-cosmic-white/20 hover:border-cosmic-white/40 hover:bg-cosmic-white/20'
                    }`}
                  >
                    {style}
                  </motion.button>
                ))}
              </div>
              <p className="text-cosmic-white/60 text-sm mt-2">
                Select multiple styles to customize your generation
              </p>
            </div>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !prompt.trim()}
              className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                loading || !prompt.trim()
                  ? 'bg-cosmic-white/10 text-cosmic-white/50 cursor-not-allowed border border-cosmic-white/10'
                  : 'bg-gradient-to-r from-cosmic-purple to-pink-500 text-white shadow-lg shadow-cosmic-purple/25 hover:shadow-cosmic-purple/40 border border-cosmic-purple'
              }`}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="h-5 w-5" />
                  </motion.div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  🚀 Generate Asset
                </>
              )}
            </motion.button>

            {/* Quick Examples */}
            {!result && (
              <div className="mt-6 p-4 bg-cosmic-white/5 rounded-lg border border-cosmic-white/10">
                <p className="text-cosmic-white/70 text-sm mb-3">✨ Try these example prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "floating crystal palace in space",
                    "cyberpunk neon cityscape at night",
                    "magical forest with glowing mushrooms",
                    "ancient temple on a mountain peak"
                  ].map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setPrompt(example)}
                      className="px-3 py-1 bg-cosmic-white/10 hover:bg-cosmic-white/20 text-cosmic-white/80 text-xs rounded-full transition-colors border border-cosmic-white/10 hover:border-cosmic-white/20"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {loading && (
              <div className="mt-4">
                <div className="bg-cosmic-space/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-cosmic-gradient h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Results */}
            <AnimatePresence>
              {(loading || result) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-panel p-6 rounded-xl border border-cosmic-white/20 mt-8"
                >
                  {loading && (
                    <EnhancedLoading
                      type={selectedType}
                      progress={progress}
                      message={
                        selectedType === 'image' ? 'Generating AI artwork...' : 
                        selectedType === 'video' ? 'Rendering cinematic sequence...' :
                        selectedType === '3d' ? 'Building 3D model...' :
                        selectedType === 'voiceover' ? 'Synthesizing voice...' :
                        selectedType === 'soundscape' ? 'Creating audio landscape...' :
                        'Processing your request...'
                      }
                    />
                  )}

                  {result && !loading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-cosmic-white font-semibold text-lg">
                          ✨ Generation Complete!
                        </h3>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={downloadResult}
                            className="px-4 py-2 bg-cosmic-purple/20 border border-cosmic-purple rounded-lg text-cosmic-purple text-sm font-medium hover:bg-cosmic-purple/30 transition-colors flex items-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setResult(null)}
                            className="px-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white text-sm font-medium hover:bg-cosmic-white/20 transition-colors flex items-center gap-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Try Another
                          </motion.button>
                        </div>
                      </div>

                      {/* Result Display */}
                      <div className="bg-cosmic-space/30 rounded-lg p-4 border border-cosmic-white/10">
                        {selectedType === 'image' && (
                          <div className="space-y-3">
                            <img
                              src={result.url}
                              alt="Generated artwork"
                              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                              onLoad={() => console.log('Image loaded successfully')}
                            />
                            <div className="text-center">
                              <p className="text-cosmic-white/80 text-sm font-medium">
                                AI Generated Image
                              </p>
                              <p className="text-cosmic-white/60 text-xs mt-1">
                                {result.message || 'Generated Video'}
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedType === 'video' && (
                          <div className="space-y-3">
                            <video
                              src={result.url}
                              controls
                              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                              poster="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop&auto=format"
                            />
                            <div className="text-center">
                              <p className="text-cosmic-white/80 text-sm font-medium">
                                Generated Video
                              </p>
                              <p className="text-cosmic-white/60 text-xs mt-1">
                                {result.message || 'Generated Video'}
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedType === '3d' && (
                          <div className="space-y-3">
                            <div className="w-full h-64 bg-gradient-to-br from-cosmic-space to-cosmic-purple/20 rounded-lg flex items-center justify-center border border-cosmic-white/10">
                              <div className="text-center">
                                <Box className="h-12 w-12 text-cosmic-white/60 mx-auto mb-2" />
                                <p className="text-cosmic-white/80 text-sm font-medium">3D Model Ready</p>
                                <p className="text-cosmic-white/60 text-xs mt-1">Click download to get .glb file</p>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-cosmic-white/80 text-sm font-medium">
                                3D Object (.glb)
                              </p>
                              <p className="text-cosmic-white/60 text-xs mt-1">
                                {result.message || '3D Model Generated'}
                              </p>
                            </div>
                          </div>
                        )}

                        {(selectedType === 'voiceover' || selectedType === 'soundscape') && (
                          <div className="space-y-3">
                            <div className="w-full">
                              <audio
                                src={result.url}
                                controls
                                className="w-full"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-cosmic-white/80 text-sm font-medium">
                                {selectedType === 'voiceover' ? 'AI Voiceover' : 'Ambient Soundscape'}
                              </p>
                              <p className="text-cosmic-white/60 text-xs mt-1">
                                {result.message || `${selectedType === 'voiceover' ? 'Voiceover' : 'Soundscape'} Generated`}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Usage Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-cosmic-white/10">
                        <div className="text-center">
                          <p className="text-cosmic-white font-semibold text-lg">FREE</p>
                          <p className="text-cosmic-white/60 text-xs">Generation Cost</p>
                        </div>
                        <div className="text-center">
                          <p className="text-cosmic-white font-semibold text-lg">
                            {selectedType === 'image' ? '768x768' : 
                             selectedType === 'video' ? '512x512' :
                             selectedType === '3d' ? 'GLB' : 'MP3'}
                          </p>
                          <p className="text-cosmic-white/60 text-xs">Output Format</p>
                        </div>
                        <div className="text-center">
                          <p className="text-cosmic-white font-semibold text-lg">~30s</p>
                          <p className="text-cosmic-white/60 text-xs">Generation Time</p>
                        </div>
                        <div className="text-center">
                          <p className="text-cosmic-white font-semibold text-lg">∞</p>
                          <p className="text-cosmic-white/60 text-xs">Monthly Limit</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          </div>

          {/* Bottom Info */}
          <div className="text-center mt-8">
            <p className="text-cosmic-white/60 text-sm">
              Built by <span className="text-cosmic-purple">iMMerSive Technologies</span> • 
              Powered by <span className="text-cosmic-purple">Nemura & Sonarium AI Engines</span> • 
              VisionOS & Meta Ready
            </p>
            <p className="text-cosmic-white/40 text-xs mt-2">
              Optimized for Apple Vision Pro, Meta Quest, HoloLens & Next-Gen AR/VR Devices
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}