'use client'

// SearchBar Component for Nemurium
// Advanced search with real-time suggestions and filters

import { useState, useEffect, useRef } from 'react'
import { Search, Filter, X, TrendingUp } from 'lucide-react'
import { trpc } from '@/src/trpc/client'

interface SearchBarProps {
  onSearch?: (query: string, results: any[]) => void
  placeholder?: string
  showFilters?: boolean
  autoFocus?: boolean
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search worlds, creators, assets...", 
  showFilters = true,
  autoFocus = false 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [filters, setFilters] = useState({
    type: undefined as 'content' | 'user' | 'world' | 'asset' | undefined,
    category: '',
    sortBy: 'relevance' as 'relevance' | 'recent' | 'popular' | 'trending'
  })

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get popular content for suggestions
  const { data: popularData } = trpc.search.getPopular.useQuery({
    limit: 5,
    timeframe: 'week',
    authToken: null
  })

  // Get search suggestions
  const { data: suggestionsData } = trpc.search.getSuggestions.useQuery({
    query
  }, {
    enabled: query.length > 2
  })

  // Perform search
  const searchMutation = trpc.search.search.useQuery({
    query: query.trim(),
    filters: {
      ...filters,
      maxResults: 20
    },
    sessionId: `session_${Date.now()}`
  }, {
    enabled: false // Don't auto-run
  })

  // Handle search results
  useEffect(() => {
    if (searchMutation.data?.success && onSearch && query.trim()) {
      onSearch(query, searchMutation.data.results)
      setIsOpen(false)
    }
  }, [searchMutation.data, onSearch, query])

  // Handle search
  const handleSearch = async () => {
    if (query.trim().length === 0) return
    
    searchMutation.refetch()
  }

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setIsOpen(false)
    // Auto-search when clicking suggestion
    setTimeout(() => handleSearch(), 100)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowFilterPanel(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-focus if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const popularResults = popularData?.results || []
  const suggestions = suggestionsData?.suggestions || []

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Main Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cosmic-purple focus:border-transparent backdrop-blur-sm transition-all duration-200"
        />

        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          {query && (
            <button
              onClick={() => {
                setQuery('')
                setIsOpen(false)
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {showFilters && (
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`p-1 rounded-md transition-colors ${
                showFilterPanel ? 'text-cosmic-purple' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Filter className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-cosmic-space/95 border border-white/20 rounded-xl backdrop-blur-sm z-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={filters.type || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="">All Types</option>
                <option value="content">Content</option>
                <option value="user">Users</option>
                <option value="world">Worlds</option>
                <option value="asset">Assets</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="relevance">Relevance</option>
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <input
                type="text"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., tutorial, music"
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* Search Dropdown */}
      {isOpen && (query.length > 0 || popularResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cosmic-space/95 border border-white/20 rounded-xl backdrop-blur-sm overflow-hidden z-40">
          
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Suggestions</h3>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    <Search className="inline h-4 w-4 mr-2 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Content */}
          {query.length === 0 && popularResults.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Popular This Week
              </h3>
              <div className="space-y-1">
                {popularResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSuggestionClick(item.title)}
                    className="w-full text-left px-3 py-3 hover:bg-white/10 rounded-md transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      {item.thumbnail && (
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate group-hover:text-cosmic-purple transition-colors">
                          {item.title}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {item.metadata.views} views • {item.author?.name}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Button */}
          {query.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleSearch}
                disabled={searchMutation.isLoading}
                className="w-full bg-cosmic-gradient text-white font-medium py-3 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
              >
                {searchMutation.isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search "{query}"
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}