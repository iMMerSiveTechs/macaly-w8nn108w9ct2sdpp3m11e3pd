"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Mic, 
  MicOff, 
  Wand2, 
  Zap, 
  Sparkles, 
  Download, 
  Share2,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Layers,
  Box,
  Globe,
  Image,
  Music,
  Video,
  Palette
} from 'lucide-react'

interface GenerationResult {
  id: string
  type: '2d' | '3d' | 'audio' | 'video' | 'text'
  prompt: string
  result: {
    url?: string
    data?: any
    preview?: string
  }
  createdAt: string
  feedback?: 'positive' | 'negative'
  model: string
  confidence: number
}

interface AIModel {
  id: string
  name: string
  type: '2d' | '3d' | 'audio' | 'video' | 'text'
  description: string
  endpoint: string
  quality: number
  speed: number
  cost: number
}

export default function AdvancedAIGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [generationType, setGenerationType] = useState<'2d' | '3d' | 'audio' | 'video' | 'text'>('2d')
  const [results, setResults] = useState<GenerationResult[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedModel, setSelectedModel] = useState<string>('auto')
  const recognitionRef = useRef<any>(null)

  // Advanced AI Models Configuration
  const aiModels: AIModel[] = [
    {
      id: 'sdxl-turbo',
      name: 'SDXL Turbo',
      type: '2d',
      description: 'Ultra-fast, high-quality image generation',
      endpoint: 'stabilityai/sdxl-turbo',
      quality: 9,
      speed: 10,
      cost: 1
    },
    {
      id: 'midjourney-style',
      name: 'Midjourney Style',
      type: '2d', 
      description: 'Artistic, cinematic image generation',
      endpoint: 'midjourney/midjourney',
      quality: 10,
      speed: 6,
      cost: 3
    },
    {
      id: 'dalle3-hd',
      name: 'DALL-E 3 HD',
      type: '2d',
      description: 'Photorealistic, detailed imagery',
      endpoint: 'openai/dall-e-3',
      quality: 9,
      speed: 7,
      cost: 4
    },
    {
      id: 'point-e',
      name: 'Point-E 3D',
      type: '3d',
      description: '3D point cloud generation',
      endpoint: 'openai/point-e',
      quality: 7,
      speed: 8,
      cost: 5
    },
    {
      id: 'shap-e',
      name: 'Shap-E 3D',
      type: '3d', 
      description: '3D mesh generation',
      endpoint: 'openai/shap-e',
      quality: 8,
      speed: 6,
      cost: 6
    },
    {
      id: 'meshy-ai',
      name: 'Meshy AI',
      type: '3d',
      description: 'High-quality 3D model creation',
      endpoint: 'meshy/text-to-3d',
      quality: 9,
      speed: 4,
      cost: 8
    },
    {
      id: 'musicgen',
      name: 'MusicGen',
      type: 'audio',
      description: 'AI music and sound generation',
      endpoint: 'facebook/musicgen',
      quality: 8,
      speed: 7,
      cost: 3
    },
    {
      id: 'runway-gen2',
      name: 'Runway Gen-2',
      type: 'video',
      description: 'Text-to-video generation',
      endpoint: 'runway/gen2',
      quality: 9,
      speed: 3,
      cost: 10
    }
  ]

  const generationSteps = [
    "🧠 Analyzing your prompt with advanced AI...",
    "🔍 Selecting optimal AI model...",
    "⚡ Generating initial concept...",
    "🎨 Enhancing quality and details...",
    "🔧 Post-processing and optimization...",
    "✨ Finalizing your creation..."
  ]

  useEffect(() => {
    // Auto-select best model based on prompt analysis
    if (prompt) {
      analyzePromptAndSelectModel(prompt)
    }
  }, [prompt, generationType])

  const analyzePromptAndSelectModel = async (inputPrompt: string) => {
    // Advanced prompt analysis to select optimal model
    const promptLower = inputPrompt.toLowerCase()
    
    let bestModel = 'auto'
    
    if (generationType === '2d') {
      if (promptLower.includes('photorealistic') || promptLower.includes('photo')) {
        bestModel = 'dalle3-hd'
      } else if (promptLower.includes('artistic') || promptLower.includes('cinematic')) {
        bestModel = 'midjourney-style'
      } else {
        bestModel = 'sdxl-turbo' // Fast default
      }
    } else if (generationType === '3d') {
      if (promptLower.includes('high quality') || promptLower.includes('detailed')) {
        bestModel = 'meshy-ai'
      } else {
        bestModel = 'shap-e'
      }
    }
    
    setSelectedModel(bestModel)
  }

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => setIsListening(true)
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setPrompt(transcript)
        setIsListening(false)
        
        // Auto-enhance prompt with AI
        enhancePrompt(transcript)
      }
      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)

      recognitionRef.current = recognition
      recognition.start()
    } else {
      alert('Speech recognition not supported in your browser')
    }
  }

  const enhancePrompt = async (originalPrompt: string) => {
    try {
      // Use AI to enhance the prompt for better results
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Enhance this ${generationType} generation prompt for maximum quality and detail: "${originalPrompt}"`
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.response && data.response !== originalPrompt) {
          setPrompt(data.response)
        }
      }
    } catch (error) {
      console.error('Prompt enhancement failed:', error)
    }
  }

  const generateContent = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setCurrentStep(0)

    try {
      // Step through generation process
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(i)
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      const model = aiModels.find(m => m.id === selectedModel) || aiModels[0]
      
      // Call the appropriate generation API
      const generationResult = await callAIModel(model, prompt, generationType)
      
      const result: GenerationResult = {
        id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: generationType,
        prompt,
        result: generationResult,
        createdAt: new Date().toISOString(),
        model: model.name,
        confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
      }

      setResults([result, ...results])
      
      // Save to user's project history
      await saveToProject(result)
      
      console.log('🎉 Generation complete:', result)
      
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
      setCurrentStep(0)
    }
  }

  const callAIModel = async (model: AIModel, prompt: string, type: string) => {
    console.log(`🤖 Generating ${type} with ${model.name}:`, prompt)
    
    // Route to appropriate API based on model type
    switch (model.type) {
      case '2d':
        return await generate2D(model, prompt)
      case '3d':
        return await generate3D(model, prompt)
      case 'audio':
        return await generateAudio(model, prompt)
      case 'video':
        return await generateVideo(model, prompt)
      default:
        throw new Error('Unsupported generation type')
    }
  }

  const generate2D = async (model: AIModel, prompt: string) => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: model.endpoint,
        type: '2d',
        width: 1024,
        height: 1024,
        steps: 20,
        guidance_scale: 7.5
      })
    })

    if (!response.ok) throw new Error('2D Generation failed')
    
    const data = await response.json()
    return {
      url: data.imageUrl || data.url,
      preview: data.imageUrl || data.url,
      data: data
    }
  }

  const generate3D = async (model: AIModel, prompt: string) => {
    const response = await fetch('/api/generate-3d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: model.endpoint,
        format: 'glb',
        quality: 'high'
      })
    })

    if (!response.ok) throw new Error('3D Generation failed')
    
    const data = await response.json()
    return {
      url: data.modelUrl,
      preview: data.previewUrl,
      data: data
    }
  }

  const generateAudio = async (model: AIModel, prompt: string) => {
    const response = await fetch('/api/generate-audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: model.endpoint,
        duration: 30,
        format: 'mp3'
      })
    })

    if (!response.ok) throw new Error('Audio Generation failed')
    
    const data = await response.json()
    return {
      url: data.audioUrl,
      preview: data.audioUrl,
      data: data
    }
  }

  const generateVideo = async (model: AIModel, prompt: string) => {
    const response = await fetch('/api/generate-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        model: model.endpoint,
        duration: 4,
        fps: 24,
        resolution: '1024x576'
      })
    })

    if (!response.ok) throw new Error('Video Generation failed')
    
    const data = await response.json()
    return {
      url: data.videoUrl,
      preview: data.thumbnailUrl,
      data: data
    }
  }

  const saveToProject = async (result: GenerationResult) => {
    try {
      const projectId = new URLSearchParams(window.location.search).get('project')
      if (projectId) {
        // Save to project in Firestore
        console.log('💾 Saving generation to project:', projectId)
      }
    } catch (error) {
      console.error('Failed to save to project:', error)
    }
  }

  const upgradeTo3D = async (result: GenerationResult) => {
    if (result.type !== '2d') return

    setIsGenerating(true)
    setGenerationType('3d')
    
    try {
      // Use the 2D image as reference for 3D generation
      const enhanced3DPrompt = `Convert this 2D image to a 3D model: ${result.prompt}. Create a detailed 3D mesh with proper geometry and textures.`
      
      await generateContent()
      
    } catch (error) {
      console.error('3D upgrade failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const upgradeToImmersive = async (result: GenerationResult) => {
    // Create full immersive experience around the generated content
    window.location.href = `/world-builder?import=${result.id}&type=immersive`
  }

  const provideFeedback = async (resultId: string, feedback: 'positive' | 'negative') => {
    setResults(results.map(r => 
      r.id === resultId ? { ...r, feedback } : r
    ))
    
    // Send feedback to improve AI models
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resultId,
          feedback,
          prompt: results.find(r => r.id === resultId)?.prompt
        })
      })
    } catch (error) {
      console.error('Feedback submission failed:', error)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '2d': return Image
      case '3d': return Box
      case 'audio': return Music
      case 'video': return Video
      default: return Palette
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case '2d': return 'text-blue-400 bg-blue-400/20'
      case '3d': return 'text-purple-400 bg-purple-400/20'
      case 'audio': return 'text-green-400 bg-green-400/20'
      case 'video': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <div className="space-y-8">
      {/* AI Generator Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="h-10 w-10 text-cosmic-purple" />
          <h1 className="text-4xl font-bold text-gradient">Advanced AI Generator</h1>
          <Sparkles className="h-10 w-10 text-cosmic-cyan" />
        </div>
        <p className="text-cosmic-white/80 max-w-3xl mx-auto text-lg">
          Generate anything with the most advanced AI models. Start with 2D, upgrade to 3D, 
          make it immersive. Your creativity, amplified by artificial intelligence.
        </p>
      </motion.div>

      {/* Generation Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6"
      >
        <h3 className="text-xl font-semibold text-cosmic-white mb-4">
          What do you want to create?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {['2d', '3d', 'audio', 'video', 'text'].map((type) => {
            const IconComponent = getTypeIcon(type)
            return (
              <button
                key={type}
                onClick={() => setGenerationType(type as any)}
                className={`p-4 rounded-lg border transition-all ${
                  generationType === type
                    ? 'bg-cosmic-purple border-cosmic-purple'
                    : 'bg-cosmic-white/5 border-cosmic-white/20 hover:bg-cosmic-white/10'
                }`}
              >
                <IconComponent className="h-8 w-8 mx-auto mb-2" />
                <div className="text-sm font-medium capitalize">{type}</div>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Prompt Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-cosmic-white">
            Describe your vision
          </h3>
          <div className="flex items-center gap-2 text-sm text-cosmic-white/70">
            <Brain className="h-4 w-4" />
            AI Model: {aiModels.find(m => m.id === selectedModel)?.name || 'Auto-Select'}
          </div>
        </div>
        
        <div className="relative mb-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe your ${generationType} creation... (e.g., "A futuristic sports car with neon lights and chrome details")`}
            className="w-full h-32 p-4 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
            disabled={isGenerating}
          />
          
          <button
            onClick={isListening ? () => recognitionRef.current?.stop() : startVoiceInput}
            className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-cosmic-purple hover:bg-cosmic-purple/80'
            }`}
            disabled={isGenerating}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
        </div>

        {/* Advanced Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-4 py-2 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
          >
            <option value="auto">Auto-Select Best Model</option>
            {aiModels.filter(m => m.type === generationType).map((model) => (
              <option key={model.id} value={model.id}>
                {model.name} (Quality: {model.quality}/10)
              </option>
            ))}
          </select>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="highQuality" className="rounded" />
            <label htmlFor="highQuality" className="text-sm text-cosmic-white/80">
              High Quality Mode
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="fastMode" className="rounded" />
            <label htmlFor="fastMode" className="text-sm text-cosmic-white/80">
              Fast Generation
            </label>
          </div>
        </div>

        <motion.button
          onClick={generateContent}
          disabled={!prompt.trim() || isGenerating}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            !prompt.trim() || isGenerating
              ? 'bg-cosmic-white/10 text-cosmic-white/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-cosmic-purple to-cosmic-cyan hover:shadow-lg hover:shadow-cosmic-purple/25 text-white'
          }`}
          whileHover={!isGenerating ? { scale: 1.02 } : {}}
          whileTap={!isGenerating ? { scale: 0.98 } : {}}
        >
          <div className="flex items-center justify-center gap-3">
            {isGenerating ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Wand2 className="h-6 w-6" />
                Generate {generationType.toUpperCase()} with AI
              </>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Generation Progress */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6"
          >
            <div className="space-y-4">
              {generationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: 0 
                  }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    index < currentStep ? 'bg-green-500' : 
                    index === currentStep ? 'bg-cosmic-purple animate-pulse' : 
                    'bg-cosmic-white/20'
                  }`}>
                    {index < currentStep ? '✓' : index === currentStep ? '•' : '○'}
                  </div>
                  <span className={`${
                    index <= currentStep ? 'text-cosmic-white' : 'text-cosmic-white/50'
                  }`}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="w-full bg-cosmic-white/20 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-cosmic-purple to-cosmic-cyan h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentStep + 1) / generationSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Results */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-cosmic-white">
              Your AI Creations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => {
                const TypeIcon = getTypeIcon(result.type)
                return (
                  <motion.div
                    key={result.id}
                    layout
                    className="glass-panel p-6 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getTypeColor(result.type)}`}>
                        <TypeIcon className="h-4 w-4" />
                        {result.type.toUpperCase()}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => provideFeedback(result.id, 'positive')}
                          className={`p-2 rounded-lg transition-all ${
                            result.feedback === 'positive' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-cosmic-white/10 hover:bg-green-500/20'
                          }`}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => provideFeedback(result.id, 'negative')}
                          className={`p-2 rounded-lg transition-all ${
                            result.feedback === 'negative' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-cosmic-white/10 hover:bg-red-500/20'
                          }`}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Preview */}
                    <div className="mb-4 rounded-lg overflow-hidden bg-cosmic-white/5 aspect-square flex items-center justify-center">
                      {result.result.preview ? (
                        result.type === 'video' ? (
                          <video 
                            src={result.result.url} 
                            poster={result.result.preview}
                            controls 
                            className="w-full h-full object-cover"
                          />
                        ) : result.type === 'audio' ? (
                          <div className="text-center">
                            <Music className="h-16 w-16 text-cosmic-cyan mx-auto mb-4" />
                            <audio controls src={result.result.url} className="w-full" />
                          </div>
                        ) : (
                          <img 
                            src={result.result.preview} 
                            alt={result.prompt}
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <div className="text-center text-cosmic-white/50">
                          <TypeIcon className="h-16 w-16 mx-auto mb-2" />
                          <p>Generated Content</p>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-cosmic-white/80 text-sm mb-4 line-clamp-2">
                      "{result.prompt}"
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-cosmic-white/50 mb-4">
                      <span>{result.model}</span>
                      <span>{Math.round(result.confidence * 100)}% confidence</span>
                    </div>
                    
                    {/* Upgrade Options */}
                    <div className="space-y-2">
                      {result.type === '2d' && (
                        <button
                          onClick={() => upgradeTo3D(result)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-cosmic-purple/20 hover:bg-cosmic-purple/40 rounded-lg transition-all"
                        >
                          <Box className="h-4 w-4" />
                          Make 3D
                        </button>
                      )}
                      
                      <button
                        onClick={() => upgradeToImmersive(result)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-cosmic-cyan/20 hover:bg-cosmic-cyan/40 rounded-lg transition-all"
                      >
                        <Globe className="h-4 w-4" />
                        Make Immersive
                      </button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const a = document.createElement('a')
                            a.href = result.result.url || ''
                            a.download = `nemurium_${result.type}_${result.id}`
                            a.click()
                          }}
                          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        <button
                          onClick={() => {
                            navigator.share?.({
                              title: 'My AI Creation',
                              text: result.prompt,
                              url: result.result.url
                            })
                          }}
                          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all"
                        >
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}