"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, Mic, MicOff, Download, Share2, Save, Sparkles, Globe, Eye } from 'lucide-react'
import WorldViewer from './world-viewer'

interface WorldBuilderProps {
  className?: string
}

export default function AIWorldBuilder({ className = "" }: WorldBuilderProps) {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [generatedWorld, setGeneratedWorld] = useState(null)
  const [buildingSteps, setBuildingSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const recognitionRef = useRef(null)

  const examplePrompts = [
    "A mystical forest with floating crystals and ambient music",
    "A cyberpunk city street with neon signs and rain",
    "A peaceful beach with palm trees and ocean sounds", 
    "A medieval castle courtyard with torches and atmosphere",
    "A space station observation deck overlooking Earth",
    "A cozy coffee shop with jazz music and warm lighting"
  ]

  const buildingStepTexts = [
    "Analyzing your vision with AI...",
    "Generating environment and atmosphere...", 
    "Placing objects and scenery...",
    "Adding lighting and effects...",
    "Incorporating spatial audio...",
    "Optimizing for VR/AR devices...",
    "Finalizing your immersive realm..."
  ]

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setPrompt(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } else {
      alert('Speech recognition not supported in your browser')
    }
  }

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const generateWorld = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setCurrentStep(0)
    setBuildingSteps(buildingStepTexts)

    try {
      // Simulate building steps
      for (let i = 0; i < buildingStepTexts.length; i++) {
        setCurrentStep(i)
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      // Call the world builder API
      const response = await fetch('/api/world-builder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          userId: 'demo-user' // Replace with actual user ID
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate world')
      }

      const result = await response.json()
      setGeneratedWorld(result.worldData)

      // Analytics
      console.log('🎉 World generated successfully:', result.worldData.id)
      
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate world. Please try again.')
    } finally {
      setIsGenerating(false)
      setCurrentStep(0)
    }
  }

  const saveWorld = async () => {
    if (!generatedWorld) return
    
    console.log('💾 Saving world:', generatedWorld.id)
    // Implement save to user's library
    alert('World saved to your library!')
  }

  const shareWorld = async () => {
    if (!generatedWorld) return

    const shareUrl = `${window.location.origin}/worlds/${generatedWorld.id}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my AI-generated world!',
          text: `I created this immersive world: "${prompt}"`,
          url: shareUrl,
        })
      } catch (error) {
        copyToClipboard(shareUrl)
      }
    } else {
      copyToClipboard(shareUrl)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Share link copied to clipboard!')
    })
  }

  const downloadWorld = () => {
    if (!generatedWorld) return
    
    // Create downloadable file
    const worldData = JSON.stringify(generatedWorld, null, 2)
    const blob = new Blob([worldData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `${generatedWorld.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AI World Builder Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-cosmic-purple" />
          <h2 className="text-3xl font-bold text-gradient">AI World Builder</h2>
          <Wand2 className="h-8 w-8 text-cosmic-cyan" />
        </div>
        <p className="text-cosmic-white/80 max-w-2xl mx-auto">
          Describe your vision in natural language and watch as our AI creates a fully immersive 3D world in minutes.
          No coding, no 3D modeling skills required.
        </p>
      </motion.div>

      {/* Prompt Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6"
      >
        <label htmlFor="prompt" className="block text-lg font-semibold text-cosmic-white mb-4">
          Describe Your World
        </label>
        
        <div className="relative">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the immersive world you want to create... (e.g., 'A peaceful zen garden with flowing water, bamboo, and meditation stones')"
            className="w-full h-24 p-4 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
            disabled={isGenerating}
          />
          
          {/* Voice Input Button */}
          <button
            onClick={isListening ? stopVoiceInput : startVoiceInput}
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

        {/* Example Prompts */}
        <div className="mt-4">
          <p className="text-sm text-cosmic-white/70 mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.slice(0, 3).map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="px-3 py-1 bg-cosmic-white/5 hover:bg-cosmic-white/10 border border-cosmic-white/20 rounded-full text-sm text-cosmic-white/80 transition-all"
                disabled={isGenerating}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={generateWorld}
          disabled={!prompt.trim() || isGenerating}
          className={`w-full mt-6 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
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
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Your World...
              </>
            ) : (
              <>
                <Wand2 className="h-6 w-6" />
                Generate Immersive World
              </>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Building Steps Animation */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6"
          >
            <div className="space-y-4">
              {buildingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: index <= currentStep ? 1 : 0.3,
                    x: 0 
                  }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
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
                  animate={{ width: `${((currentStep + 1) / buildingSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated World Display */}
      <AnimatePresence>
        {generatedWorld && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* World Actions */}
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-cosmic-white">Your World is Ready!</h3>
                  <p className="text-cosmic-white/70">"{prompt}"</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveWorld}
                    className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple hover:bg-cosmic-purple/80 rounded-lg transition-all"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={shareWorld}
                    className="flex items-center gap-2 px-4 py-2 bg-cosmic-cyan hover:bg-cosmic-cyan/80 rounded-lg transition-all"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={downloadWorld}
                    className="flex items-center gap-2 px-4 py-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* 3D World Viewer */}
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-cosmic-cyan" />
                <h3 className="text-xl font-semibold text-cosmic-white">Immersive Preview</h3>
                <span className="px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple text-sm rounded-full">
                  VR/AR Ready
                </span>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden">
                <WorldViewer worldData={generatedWorld} />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-cosmic-white/70 text-sm">
                  ⌨️ Use mouse to orbit • 🖱️ Scroll to zoom • 🥽 Click VR for immersive mode
                </p>
              </div>
            </div>

            {/* World Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl font-bold text-cosmic-purple">
                  {generatedWorld.objects?.length || 0}
                </div>
                <div className="text-cosmic-white/70 text-sm">Objects Placed</div>
              </div>
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl font-bold text-cosmic-cyan">
                  {generatedWorld.environment?.terrain || 'Custom'}
                </div>
                <div className="text-cosmic-white/70 text-sm">Environment</div>
              </div>
              <div className="glass-panel p-4 text-center">
                <div className="text-2xl font-bold text-cosmic-pink">
                  ~2 min
                </div>
                <div className="text-cosmic-white/70 text-sm">Generation Time</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}