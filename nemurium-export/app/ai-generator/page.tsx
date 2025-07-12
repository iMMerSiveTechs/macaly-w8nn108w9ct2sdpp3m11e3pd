"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import AdvancedAIGenerator from '@/components/advanced-ai-generator'
import { Brain, ArrowLeft, Sparkles, Crown } from 'lucide-react'

export default function AIGeneratorPage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('project')
  const [projectData, setProjectData] = useState(null)
  const [loading, setLoading] = useState(!!projectId)

  useEffect(() => {
    if (projectId) {
      loadProjectData(projectId)
    }
  }, [projectId])

  const loadProjectData = async (id: string) => {
    try {
      // In production, load from Firestore
      console.log('📂 Loading project data for:', id)
      
      // Mock project data for now
      setProjectData({
        id,
        name: 'New AI Creation',
        type: 'world',
        status: 'draft'
      })
      
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cosmic-space flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cosmic-white text-lg">Loading AI Generator...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cosmic-space text-cosmic-white">
      {/* Header */}
      <div className="sticky top-0 bg-cosmic-space/80 backdrop-blur-sm border-b border-cosmic-white/20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-cosmic-purple" />
                <div>
                  <h1 className="text-xl font-bold text-gradient">
                    Advanced AI Generator
                  </h1>
                  {projectData && (
                    <p className="text-sm text-cosmic-white/70">
                      Project: {projectData.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-cosmic-purple/20 rounded-full text-sm">
                <Crown className="h-4 w-4 text-cosmic-purple" />
                <span className="text-cosmic-purple">Pro AI Models</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-cosmic-cyan/20 rounded-full text-sm">
                <Sparkles className="h-4 w-4 text-cosmic-cyan" />
                <span className="text-cosmic-cyan">Self-Improving</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {projectData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-panel p-6"
          >
            <h2 className="text-xl font-semibold text-cosmic-white mb-4">
              Project Context
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-cosmic-white/70">Project Name</div>
                <div className="text-cosmic-white font-medium">{projectData.name}</div>
              </div>
              <div>
                <div className="text-sm text-cosmic-white/70">Type</div>
                <div className="text-cosmic-white font-medium capitalize">{projectData.type}</div>
              </div>
              <div>
                <div className="text-sm text-cosmic-white/70">Status</div>
                <div className="text-cosmic-white font-medium capitalize">{projectData.status}</div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-cosmic-white/70">
              💡 <strong>Tip:</strong> Generate content for your project using the AI tools below. 
              You can create 2D images, 3D models, audio, and video, then upgrade them to immersive experiences.
            </div>
          </motion.div>
        )}

        {/* AI Generator Component */}
        <AdvancedAIGenerator />

        {/* Usage Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-panel p-6"
        >
          <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cosmic-cyan" />
            Pro Tips for Better Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cosmic-white mb-2">2D Image Generation</h4>
              <ul className="space-y-1 text-sm text-cosmic-white/80">
                <li>• Be specific about style (photorealistic, artistic, cinematic)</li>
                <li>• Include lighting and mood descriptors</li>
                <li>• Mention specific details you want to see</li>
                <li>• Use quality keywords like "high resolution", "detailed"</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-cosmic-white mb-2">3D Model Generation</h4>
              <ul className="space-y-1 text-sm text-cosmic-white/80">
                <li>• Describe the object's shape and form clearly</li>
                <li>• Include material properties (metal, wood, plastic)</li>
                <li>• Mention scale and proportions</li>
                <li>• Specify any functional features</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-cosmic-white mb-2">Audio Generation</h4>
              <ul className="space-y-1 text-sm text-cosmic-white/80">
                <li>• Include genre, tempo, and mood</li>
                <li>• Mention specific instruments or sounds</li>
                <li>• Describe the energy level and atmosphere</li>
                <li>• Use musical terms (ambient, upbeat, melodic)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-cosmic-white mb-2">Video Generation</h4>
              <ul className="space-y-1 text-sm text-cosmic-white/80">
                <li>• Describe the scene and action clearly</li>
                <li>• Include camera movement preferences</li>
                <li>• Mention lighting and visual style</li>
                <li>• Specify duration and pacing</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-cosmic-purple mt-0.5" />
              <div>
                <div className="font-semibold text-cosmic-purple mb-1">
                  Self-Improving AI System
                </div>
                <p className="text-sm text-cosmic-white/80">
                  Our AI learns from your feedback! Use the thumbs up/down buttons on generated content 
                  to help the system understand your preferences and improve future results.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Model Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="glass-panel p-4 text-center">
            <div className="text-2xl font-bold text-cosmic-purple mb-1">95%</div>
            <div className="text-sm text-cosmic-white/70">Success Rate</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="text-2xl font-bold text-cosmic-cyan mb-1">8</div>
            <div className="text-sm text-cosmic-white/70">AI Models</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="text-2xl font-bold text-cosmic-pink mb-1">2.3s</div>
            <div className="text-sm text-cosmic-white/70">Avg Speed</div>
          </div>
          <div className="glass-panel p-4 text-center">
            <div className="text-2xl font-bold text-cosmic-green mb-1">∞</div>
            <div className="text-sm text-cosmic-white/70">Possibilities</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}