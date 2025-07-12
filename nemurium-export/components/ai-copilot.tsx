"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Brain, 
  Minimize2, 
  Maximize2,
  RotateCcw,
  Copy,
  Download
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I\'m your AI Copilot. I can help you create immersive content, write prompts, generate ideas, and assist with your Nemurium projects. What would you like to build today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Here are some suggestions based on your request...",
        "Great idea! Let me help you develop that concept further. Consider these elements...",
        "That sounds like an exciting project! Here's how we can approach it...",
        "Perfect! I can help you refine that prompt. Here's an enhanced version...",
        "Excellent question! Based on current immersive design principles..."
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)] + " " + input.split(' ').reverse().join(' '),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Hi! I\'m your AI Copilot. I can help you create immersive content, write prompts, generate ideas, and assist with your Nemurium projects. What would you like to build today?',
        timestamp: new Date()
      }
    ])
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!currentMessage.trim() || isLoading) return

    const userMessage = currentMessage.trim()
    setCurrentMessage('')
    setIsLoading(true)

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })

      if (!response.ok) throw new Error('Failed to get AI response')

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || "I'm here to help with your immersive world creation!",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm experiencing some technical difficulties. Please try again or contact support if the issue persists.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 p-4 bg-cosmic-gradient rounded-full text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cosmic-glow"
          >
            <Brain className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400, y: 100 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: 0,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, x: 400, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 bg-cosmic-space/95 backdrop-blur-xl border border-cosmic-purple/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cosmic-purple/20 bg-cosmic-space/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cosmic-gradient rounded-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-cosmic-white">AI Copilot</h3>
                  <p className="text-xs text-cosmic-white/60">Intelligent Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-cosmic-purple/20 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={clearConversation}
                  className="p-2 hover:bg-cosmic-purple/20 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-cosmic-purple/20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-cosmic-gradient text-white'
                          : 'bg-cosmic-white/5 border border-cosmic-white/10 text-cosmic-white'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-60">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.type === 'assistant' && (
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="p-1 hover:bg-cosmic-white/10 rounded transition-colors"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-cosmic-white/5 border border-cosmic-white/10 rounded-lg p-3">
                        <div className="flex items-center gap-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                          <span className="text-xs text-cosmic-white/60 ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-cosmic-purple/20 bg-cosmic-space/50">
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about creating immersive content..."
                      className="flex-1 resize-none bg-cosmic-space/50 border border-cosmic-white/10 rounded-lg px-3 py-2 text-cosmic-white placeholder-cosmic-white/40 focus:outline-none focus:border-cosmic-purple/50 focus:ring-2 focus:ring-cosmic-purple/20 transition-all"
                      rows={1}
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className="p-2 bg-cosmic-gradient disabled:bg-cosmic-white/10 rounded-lg transition-all hover:scale-105 disabled:scale-100"
                    >
                      <Send className="h-4 w-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setInput('Help me create a sci-fi world')}
                      className="text-xs px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple/30 rounded-full hover:bg-cosmic-purple/30 transition-colors"
                    >
                      <Sparkles className="h-3 w-3 inline mr-1" />
                      Sci-Fi World
                    </button>
                    <button
                      onClick={() => setInput('Generate a cinematic prompt')}
                      className="text-xs px-3 py-1 bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 rounded-full hover:bg-cosmic-cyan/30 transition-colors"
                    >
                      Cinematic
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}