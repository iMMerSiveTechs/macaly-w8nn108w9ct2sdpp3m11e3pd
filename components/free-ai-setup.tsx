"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Key, Zap, Gift, CheckCircle } from 'lucide-react'

export function FreeAISetup() {
  const [showInstructions, setShowInstructions] = useState(false)

  const steps = [
    {
      icon: ExternalLink,
      title: "Visit HuggingFace",
      description: "Go to huggingface.co and create a free account",
      link: "https://huggingface.co/join"
    },
    {
      icon: Key,
      title: "Generate API Key",
      description: "Navigate to Settings → Access Tokens → Create new token",
      link: "https://huggingface.co/settings/tokens"
    },
    {
      icon: Zap,
      title: "Add to Environment",
      description: "Add HUGGINGFACE_API_KEY=your_token_here to your .env file"
    },
    {
      icon: Gift,
      title: "Enjoy FREE AI!",
      description: "Generate unlimited images with Stable Diffusion models"
    }
  ]

  return (
    <div className="glass-panel p-6 rounded-xl border border-cosmic-white/20 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
            <Gift className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <h3 className="text-cosmic-white font-semibold">FREE AI Generation Available!</h3>
            <p className="text-cosmic-white/60 text-sm">Set up your free HuggingFace API key for real AI image generation</p>
          </div>
        </div>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors"
        >
          {showInstructions ? 'Hide Setup' : 'Free Setup Guide'}
        </button>
      </div>

      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="bg-cosmic-space/30 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-green-400 font-medium">Why HuggingFace?</span>
            </div>
            <ul className="text-cosmic-white/80 text-sm space-y-1 ml-7">
              <li>• Completely FREE with generous rate limits</li>
              <li>• Access to Stable Diffusion XL and other top models</li>
              <li>• No credit card required</li>
              <li>• Same quality as paid services</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex items-start p-4 bg-cosmic-space/20 rounded-lg border border-cosmic-white/10">
                  <div className="w-8 h-8 bg-cosmic-purple/20 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <Icon className="h-4 w-4 text-cosmic-purple" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-cosmic-white font-medium text-sm">{step.title}</h4>
                    <p className="text-cosmic-white/60 text-xs mt-1">{step.description}</p>
                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-cosmic-purple text-xs mt-2 hover:underline"
                      >
                        Open Link <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Zap className="h-4 w-4 text-amber-400 mr-2" />
              <span className="text-amber-400 font-medium text-sm">Without API Key</span>
            </div>
            <p className="text-cosmic-white/70 text-xs">
              The Dream Machine will use Unsplash placeholders instead of real AI generation. 
              Still fully functional for testing and demos!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}