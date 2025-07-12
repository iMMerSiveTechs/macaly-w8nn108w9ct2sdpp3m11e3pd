"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Copy, 
  Volume2, 
  Download,
  Settings,
  Lightbulb,
  Languages,
  RotateCw
} from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [temperature, setTemperature] = useState(0.7)
  const [showSettings, setShowSettings] = useState(false)
  const [isRefining, setIsRefining] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const inspirationPrompts = [
    "Create a surreal concert realm with fireflies and fog",
    "Generate a prompt to turn a sci-fi book into a VR world", 
    "Make an AI beat drop with storm ambience",
    "Describe a realm for a faceless love song performance",
    "Design a cyberpunk marketplace with floating vendors",
    "Create an underwater palace with bioluminescent creatures"
  ]

  const inspireMe = () => {
    const randomPrompt = inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)]
    setInput(randomPrompt)
  }

  const askAI = async () => {
    if (!input.trim() || loading) return

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Replace with your preferred AI API (DeepSeek, OpenRouter, etc.)
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          temperature: temperature,
          context: "You are Nemurium AI, an expert assistant for immersive content creation. Help users with prompts, creative ideas, and technical guidance for VR/AR/3D content."
        })
      })

      if (!response.ok) {
        throw new Error('AI service unavailable')
      }

      const data = await response.json()
      
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || "I'm here to help with your creative projects! Try asking about world building, AI prompts, or technical guidance.",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('AI Chat error:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I'm currently offline, but I'm here to help with creative prompts, world building ideas, and technical guidance when available!",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const exportChat = () => {
    const chatContent = messages.map(m => 
      `${m.role.toUpperCase()}: ${m.content}`
    ).join('\n\n')
    
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'nemurium-ai-chat.txt'
    a.click()
  }

  const clearChat = () => {
    setMessages([])
  }

  const refineLastResponse = async () => {
    const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()
    if (!lastAssistantMessage || isRefining) return

    setIsRefining(true)

    try {
      console.log('🔄 Refining AI response')

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Make this response even better and more detailed: ${lastAssistantMessage.content}`,
          temperature: temperature + 0.2, // Slightly more creative for refinement
          context: "You are refining and improving a previous response. Make it more detailed, actionable, and valuable while keeping the core meaning."
        })
      })

      if (!response.ok) {
        throw new Error('Refinement service unavailable')
      }

      const data = await response.json()
      
      const refinedMessage: ChatMessage = {
        role: 'assistant',
        content: `✨ **Refined:** ${data.response}`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, refinedMessage])

    } catch (error) {
      console.error('Refinement error:', error)
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I couldn't refine that response right now, but I'm here to help with new questions!",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsRefining(false)
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-cosmic-purple text-white rounded-full shadow-lg shadow-cosmic-purple/25 flex items-center justify-center z-50 border border-cosmic-purple/50"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 w-96 h-full bg-cosmic-space/95 backdrop-blur-xl border-l border-cosmic-white/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-cosmic-white/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cosmic-purple rounded-lg flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-cosmic-white font-semibold text-sm">Nemurium AI</h3>
                  <p className="text-cosmic-white/60 text-xs">Creative Copilot</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-cosmic-white/60 hover:text-cosmic-white hover:bg-cosmic-white/10 rounded-lg transition-colors"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-cosmic-white/60 hover:text-cosmic-white hover:bg-cosmic-white/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-cosmic-white/5 border-b border-cosmic-white/10"
              >
                <div className="space-y-3">
                  <div>
                    <label className="text-cosmic-white/80 text-sm font-medium">
                      Creativity: {temperature}
                    </label>
                    <input
                      type="range"
                      min="0.2"
                      max="1.2"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={clearChat}
                      className="flex-1 px-3 py-1 bg-cosmic-white/10 text-cosmic-white/80 rounded text-sm hover:bg-cosmic-white/20 transition-colors"
                    >
                      Clear Chat
                    </button>
                    <button
                      onClick={exportChat}
                      className="flex-1 px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple rounded text-sm hover:bg-cosmic-purple/30 transition-colors"
                    >
                      Export
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-cosmic-white/60 mt-8">
                  <Sparkles className="h-8 w-8 mx-auto mb-3 text-cosmic-purple" />
                  <p className="text-sm mb-4">
                    Welcome to Nemurium AI! I can help with:
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="bg-cosmic-white/5 rounded p-2">• Creative prompts & ideas</div>
                    <div className="bg-cosmic-white/5 rounded p-2">• World building guidance</div>
                    <div className="bg-cosmic-white/5 rounded p-2">• Technical questions</div>
                    <div className="bg-cosmic-white/5 rounded p-2">• Code snippets</div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-cosmic-purple text-white'
                        : 'bg-cosmic-white/10 text-cosmic-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {message.role === 'assistant' && (
                      <div className="flex gap-2 mt-2 pt-2 border-t border-cosmic-white/10">
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="p-1 text-cosmic-white/60 hover:text-cosmic-white transition-colors"
                          title="Copy"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => speakResponse(message.content)}
                          className="p-1 text-cosmic-white/60 hover:text-cosmic-white transition-colors"
                          title="Listen"
                        >
                          <Volume2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-cosmic-white/10 text-cosmic-white p-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RotateCw className="h-4 w-4" />
                      </motion.div>
                      Thinking...
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cosmic-white/20">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={inspireMe}
                  className="flex items-center gap-1 px-3 py-1 bg-cosmic-white/10 text-cosmic-white/80 rounded text-xs hover:bg-cosmic-white/20 transition-colors"
                >
                  <Lightbulb className="h-3 w-3" />
                  Inspire Me
                </button>
                <button
                  onClick={refineLastResponse}
                  disabled={messages.length === 0 || isRefining}
                  className="flex items-center gap-1 px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple rounded text-xs hover:bg-cosmic-purple/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCw className={`h-3 w-3 ${isRefining ? 'animate-spin' : ''}`} />
                  {isRefining ? 'Refining...' : 'AI Improve'}
                </button>
              </div>
              
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      askAI()
                    }
                  }}
                  placeholder="Ask me anything about creating immersive content..."
                  className="flex-1 bg-cosmic-white/10 border border-cosmic-white/20 rounded-lg px-3 py-2 text-cosmic-white placeholder-cosmic-white/40 text-sm resize-none focus:outline-none focus:border-cosmic-purple/50"
                  rows={2}
                />
                <button
                  onClick={askAI}
                  disabled={!input.trim() || loading}
                  className="px-3 py-2 bg-cosmic-purple text-white rounded-lg hover:bg-cosmic-purple/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}