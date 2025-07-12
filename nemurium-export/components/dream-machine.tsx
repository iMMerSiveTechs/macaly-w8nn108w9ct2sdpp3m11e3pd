"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Download, Wand2, Image, Video, Volume2, Cube, Eye } from 'lucide-react'

const outputTypes = [
  { id: 'image', label: 'Image', icon: Image, description: 'AI-generated visuals' },
  { id: 'video', label: 'Video', icon: Video, description: 'Cinematic scenes' },
  { id: 'audio', label: 'Audio', icon: Volume2, description: 'Ambient soundscapes' },
  { id: '3d', label: '3D Model', icon: Cube, description: 'Three-dimensional assets' },
  { id: 'ar', label: 'AR Scene', icon: Eye, description: 'Augmented reality' },
]

const styleOptions = [
  'Cinematic', 'Vibrant', 'Moody', 'Sci-fi', 'Fantasy', 'Realistic', 'Stylized', 'Neon'
]

export function DreamMachine() {
  const [prompt, setPrompt] = useState('')
  const [selectedType, setSelectedType] = useState('image')
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setResult(null)

    try {
      console.log('Generating with prompt:', prompt)
      console.log('Type:', selectedType)
      console.log('Styles:', selectedStyles)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock result based on type
      if (selectedType === 'image') {
        setResult('/api/placeholder/400/300')
      } else if (selectedType === 'video') {
        setResult('video_generated.mp4')
      } else if (selectedType === 'audio') {
        setResult('audio_generated.mp3')
      } else if (selectedType === '3d') {
        setResult('model_generated.glb')
      } else {
        setResult('ar_scene_generated.json')
      }
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    )
  }

  return (
    <section className="py-20 px-6" id="dream-machine">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cosmic-purple/20 border border-cosmic-purple/30 rounded-full text-sm text-cosmic-white/90 mb-6">
            <Wand2 className="h-4 w-4" />
            AI Content Generation
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Dream Machine
          </h2>
          <p className="text-xl text-cosmic-white/70 max-w-2xl mx-auto">
            Transform your ideas into immersive content with AI-powered generation
          </p>
        </motion.div>

        {/* Main Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-2xl"
        >
          {/* Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cosmic-white/80 mb-3">
              Describe your vision
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A floating neon fortress on a cliff overlooking a cyberpunk city at sunset..."
              className="w-full h-32 px-4 py-3 bg-cosmic-space/50 border border-cosmic-white/10 rounded-xl text-cosmic-white placeholder-cosmic-white/40 focus:outline-none focus:border-cosmic-purple/50 focus:ring-2 focus:ring-cosmic-purple/20 transition-all resize-none"
              disabled={isGenerating}
            />
          </div>

          {/* Output Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-cosmic-white/80 mb-3">
              Output Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {outputTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    disabled={isGenerating}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedType === type.id
                        ? 'bg-cosmic-purple/20 border-cosmic-purple text-cosmic-purple'
                        : 'bg-cosmic-space/30 border-cosmic-white/10 text-cosmic-white/70 hover:border-cosmic-purple/30'
                    }`}
                  >
                    <IconComponent className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{type.label}</div>
                    <div className="text-xs opacity-60 mt-1">{type.description}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Style Tags */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-cosmic-white/80 mb-3">
              Style Tags (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {styleOptions.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleStyle(style)}
                  disabled={isGenerating}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedStyles.includes(style)
                      ? 'bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30'
                      : 'bg-cosmic-space/30 text-cosmic-white/60 border border-cosmic-white/10 hover:border-cosmic-cyan/30'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              isGenerating
                ? 'bg-cosmic-white/10 cursor-not-allowed'
                : 'bg-cosmic-gradient hover:shadow-lg hover:shadow-cosmic-purple/25 hover:scale-[1.02]'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate {outputTypes.find(t => t.id === selectedType)?.label}
              </>
            )}
          </button>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-cosmic-space/30 rounded-xl border border-cosmic-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cosmic-white">Generated Content</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple/20 hover:bg-cosmic-purple/30 text-cosmic-purple border border-cosmic-purple/30 rounded-lg transition-all">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
              
              {selectedType === 'image' && (
                <div className="aspect-video bg-cosmic-space/50 rounded-lg flex items-center justify-center">
                  <Image className="h-12 w-12 text-cosmic-white/40" />
                </div>
              )}
              
              {selectedType === 'video' && (
                <div className="aspect-video bg-cosmic-space/50 rounded-lg flex items-center justify-center">
                  <Video className="h-12 w-12 text-cosmic-white/40" />
                </div>
              )}
              
              {selectedType === 'audio' && (
                <div className="p-8 bg-cosmic-space/50 rounded-lg flex items-center justify-center">
                  <Volume2 className="h-12 w-12 text-cosmic-white/40" />
                </div>
              )}
              
              {selectedType === '3d' && (
                <div className="aspect-square bg-cosmic-space/50 rounded-lg flex items-center justify-center">
                  <Cube className="h-12 w-12 text-cosmic-white/40" />
                </div>
              )}
              
              {selectedType === 'ar' && (
                <div className="aspect-video bg-cosmic-space/50 rounded-lg flex items-center justify-center">
                  <Eye className="h-12 w-12 text-cosmic-white/40" />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}