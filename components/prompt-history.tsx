"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { History, Clock, Star, Trash2, Download, Search, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SavedPrompt {
  id: string
  text: string
  timestamp: Date
  styles: string[]
  outputType: string
  favorite: boolean
  tags?: string[]
}

interface PromptHistoryProps {
  onSelectPrompt: (prompt: string, styles: string[], outputType: string) => void
  currentPrompt?: string
  currentStyles?: string[]
  currentOutputType?: string
  saveToHistory?: (prompt: string, outputType: string, styles: string[], response?: string) => void
}

export function PromptHistory({ 
  onSelectPrompt, 
  currentPrompt = '', 
  currentStyles = [], 
  currentOutputType = 'image' 
}: PromptHistoryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const availableTags = [
    'world', 'visual', 'sound', 'character', 'environment', 
    'architecture', 'fantasy', 'sci-fi', 'nature', 'abstract',
    'cinematic', 'atmospheric', 'concept', 'detailed'
  ]

  const autoTagPrompt = (prompt: string): string[] => {
    const autoTags: string[] = []
    const lowerPrompt = prompt.toLowerCase()
    
    // Auto-tag based on keywords
    if (lowerPrompt.includes('world') || lowerPrompt.includes('realm')) autoTags.push('world')
    if (lowerPrompt.includes('character') || lowerPrompt.includes('person')) autoTags.push('character')
    if (lowerPrompt.includes('sound') || lowerPrompt.includes('audio')) autoTags.push('sound')
    if (lowerPrompt.includes('visual') || lowerPrompt.includes('image')) autoTags.push('visual')
    if (lowerPrompt.includes('fantasy') || lowerPrompt.includes('magic')) autoTags.push('fantasy')
    if (lowerPrompt.includes('sci-fi') || lowerPrompt.includes('futuristic')) autoTags.push('sci-fi')
    if (lowerPrompt.includes('nature') || lowerPrompt.includes('forest')) autoTags.push('nature')
    if (lowerPrompt.includes('city') || lowerPrompt.includes('urban')) autoTags.push('architecture')
    if (lowerPrompt.includes('detailed') || lowerPrompt.includes('intricate')) autoTags.push('detailed')
    
    return autoTags
  }

  const filteredHistory = savedPrompts.filter(item => {
    const matchesSearch = !searchQuery || 
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTag = !selectedTag || item.tags?.includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  const toggleFavorite = (itemId: string) => {
    setSavedPrompts(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, favorite: !item.favorite }
        : item
    ))
  }

  const removeFromHistory = (itemId: string) => {
    setSavedPrompts(prev => prev.filter(item => item.id !== itemId))
  }

  const addTag = (itemId: string, tag: string) => {
    setSavedPrompts(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, tags: [...(item.tags || []), tag] }
        : item
    ))
  }

  const removeTag = (itemId: string, tagToRemove: string) => {
    setSavedPrompts(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, tags: item.tags?.filter(tag => tag !== tagToRemove) }
        : item
    ))
  }

  useEffect(() => {
    // Load saved prompts from localStorage
    const saved = localStorage.getItem('nemurium-prompt-history')
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((p: any) => ({
          ...p,
          timestamp: new Date(p.timestamp)
        }))
        setSavedPrompts(parsed)
      } catch (error) {
        console.error('Failed to load prompt history:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save to localStorage whenever savedPrompts changes
    localStorage.setItem('nemurium-prompt-history', JSON.stringify(savedPrompts))
  }, [savedPrompts])

  const saveCurrentPrompt = () => {
    if (!currentPrompt.trim()) return

    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      text: currentPrompt.trim(),
      timestamp: new Date(),
      styles: currentStyles,
      outputType: currentOutputType,
      favorite: false,
      tags: autoTagPrompt(currentPrompt)
    }

    setSavedPrompts(prev => [newPrompt, ...prev.slice(0, 49)]) // Keep only last 50
  }

  const deletePrompt = (id: string) => {
    setSavedPrompts(prev => prev.filter(p => p.id !== id))
  }

  const clearHistory = () => {
    setSavedPrompts([])
    localStorage.removeItem('nemurium-prompt-history')
  }

  const copyPrompt = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  const favorites = savedPrompts.filter(p => p.favorite)
  const recent = savedPrompts.filter(p => !p.favorite).slice(0, 10)

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="border-cosmic-white/20 text-cosmic-white hover:bg-cosmic-white/10"
        >
          <History className="h-4 w-4 mr-2" />
          History ({savedPrompts.length})
        </Button>
        
        <Button
          onClick={saveCurrentPrompt}
          variant="outline"
          size="sm"
          className="border-cosmic-purple/50 text-cosmic-purple hover:bg-cosmic-purple/10"
          disabled={!currentPrompt.trim()}
        >
          Save Current
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-cosmic-space/30 border border-cosmic-white/20 rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cosmic-white font-semibold">Prompt History</h3>
                {savedPrompts.length > 0 && (
                  <Button
                    onClick={clearHistory}
                    variant="ghost"
                    size="sm"
                    className="text-cosmic-white/60 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              {savedPrompts.length === 0 ? (
                <div className="text-center py-8 text-cosmic-white/60">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No saved prompts yet</p>
                  <p className="text-xs mt-1">Save prompts to reuse them later</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Search and Filter */}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Search prompts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-3 py-2 bg-cosmic-space/50 border border-cosmic-white/20 rounded-lg text-cosmic-white placeholder-cosmic-white/40 text-sm focus:outline-none focus:border-cosmic-purple/50"
                      />
                      <button
                        onClick={() => {
                          setSearchQuery('')
                          setSelectedTag(null)
                        }}
                        className="px-3 py-2 bg-cosmic-white/10 hover:bg-cosmic-white/20 rounded-lg text-cosmic-white/60 text-sm transition-colors"
                      >
                        Clear
                      </button>
                    </div>

                    {/* Tag Filter */}
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            selectedTag === tag 
                              ? 'bg-cosmic-purple text-white' 
                              : 'bg-cosmic-white/10 text-cosmic-white/60 hover:bg-cosmic-white/20'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* History Items */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredHistory.length === 0 ? (
                      <div className="text-center py-8 text-cosmic-white/60">
                        <p className="text-sm">
                          {searchQuery || selectedTag ? 'No matching prompts found' : 'No saved prompts yet'}
                        </p>
                      </div>
                    ) : (
                      filteredHistory.map((item) => (
                        <PromptCard
                          key={item.id}
                          prompt={item}
                          onSelect={onSelectPrompt}
                          onToggleFavorite={toggleFavorite}
                          onDelete={deletePrompt}
                          onCopy={copyPrompt}
                          onAddTag={addTag}
                          onRemoveTag={removeTag}
                          availableTags={availableTags}
                          formatDate={formatDate}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface PromptCardProps {
  prompt: SavedPrompt
  onSelect: (prompt: string, styles: string[], outputType: string) => void
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  onCopy: (text: string) => void
  onAddTag: (id: string, tag: string) => void
  onRemoveTag: (id: string, tag: string) => void
  availableTags: string[]
  formatDate: (date: Date) => string
}

function PromptCard({ 
  prompt, 
  onSelect, 
  onToggleFavorite, 
  onDelete, 
  onCopy, 
  onAddTag,
  onRemoveTag,
  availableTags,
  formatDate 
}: PromptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-cosmic-white/5 border border-cosmic-white/10 rounded-lg p-3 hover:bg-cosmic-white/10 transition-colors cursor-pointer"
      onClick={() => onSelect(prompt.text, prompt.styles, prompt.outputType)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <p className="text-cosmic-white text-sm font-medium truncate pr-2">
              {prompt.text}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(prompt.id)
                }}
                className={`p-1 rounded ${
                  prompt.favorite 
                    ? 'text-cosmic-amber' 
                    : 'text-cosmic-white/40 hover:text-cosmic-white/60'
                }`}
              >
                <Star className={`h-3 w-3 ${prompt.favorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(prompt.id)
                }}
                className="p-1 text-cosmic-white/40 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {prompt.tags?.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-cosmic-purple/20 text-cosmic-purple rounded text-xs"
              >
                {tag}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveTag(prompt.id, tag)
                  }}
                  className="text-cosmic-purple/60 hover:text-cosmic-purple ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-cosmic-white/60">
            <span className="px-2 py-1 bg-cosmic-white/10 rounded">
              {prompt.outputType}
            </span>
            <span>{prompt.styles.join(', ')}</span>
            <span>•</span>
            <span>{formatDate(prompt.timestamp)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCopy(prompt.text)
            }}
            className="p-1 rounded hover:bg-cosmic-white/10 text-cosmic-white/60"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}