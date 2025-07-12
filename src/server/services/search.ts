// Search Service for Nemurium
// Handles content search, user discovery, and search analytics

import { cacheService } from '../cache/redis'
import { analyticsService } from './analytics'

export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'content' | 'user' | 'world' | 'asset'
  thumbnail?: string
  author?: {
    id: string
    name: string
    avatar?: string
  }
  metadata: Record<string, any>
  score: number
}

export interface SearchFilters {
  type?: 'content' | 'user' | 'world' | 'asset'
  category?: string
  dateRange?: {
    from: Date
    to: Date
  }
  minViews?: number
  maxResults?: number
  sortBy?: 'relevance' | 'recent' | 'popular' | 'trending'
}

export class SearchService {
  private static instance: SearchService

  private constructor() {}

  static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService()
    }
    return SearchService.instance
  }

  async search(
    query: string, 
    filters: SearchFilters = {}, 
    userId?: string,
    sessionId?: string
  ): Promise<{ results: SearchResult[], total: number, suggestions: string[] }> {
    
    const cacheKey = `search_${this.hashQuery(query, filters)}`
    
    // Try to get cached results
    const cached = await cacheService.getJson<{ results: SearchResult[], total: number, suggestions: string[] }>(cacheKey)
    if (cached) {
      // Track search analytics
      if (sessionId) {
        await analyticsService.trackSearch(query, cached.total, userId, sessionId)
      }
      return cached
    }

    // Perform actual search (mock implementation)
    const results = await this.performSearch(query, filters)
    const suggestions = await this.generateSuggestions(query)
    
    const searchResult = {
      results,
      total: results.length,
      suggestions
    }

    // Cache results for 5 minutes
    await cacheService.setJson(cacheKey, searchResult, 300)

    // Track search analytics
    if (sessionId) {
      await analyticsService.trackSearch(query, results.length, userId, sessionId)
    }

    return searchResult
  }

  private async performSearch(query: string, filters: SearchFilters): Promise<SearchResult[]> {
    // Mock search implementation - replace with actual search engine (ElasticSearch, etc.)
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'VR World Building Tutorial',
        description: 'Learn how to create immersive VR worlds with our comprehensive tutorial',
        type: 'content',
        thumbnail: '/images/vr-tutorial.jpg',
        author: {
          id: 'author1',
          name: 'Sarah Chen',
          avatar: '/avatars/sarah.jpg'
        },
        metadata: {
          views: 1245,
          likes: 89,
          duration: '15:30',
          category: 'tutorial',
          tags: ['vr', 'world-building', 'beginner']
        },
        score: 0.95
      },
      {
        id: '2',
        title: 'AR Object Placement Guide',
        description: 'Master the art of placing 3D objects in augmented reality environments',
        type: 'content',
        thumbnail: '/images/ar-guide.jpg',
        author: {
          id: 'author2',
          name: 'Mike Rodriguez',
          avatar: '/avatars/mike.jpg'
        },
        metadata: {
          views: 982,
          likes: 67,
          duration: '12:45',
          category: 'guide',
          tags: ['ar', 'placement', 'intermediate']
        },
        score: 0.87
      },
      {
        id: '3',
        title: 'Immersive Audio Design',
        description: 'Create spatial audio experiences that enhance your virtual worlds',
        type: 'content',
        thumbnail: '/images/audio-design.jpg',
        author: {
          id: 'author3',
          name: 'Emma Thompson',
          avatar: '/avatars/emma.jpg'
        },
        metadata: {
          views: 756,
          likes: 54,
          duration: '18:20',
          category: 'audio',
          tags: ['audio', 'spatial', 'advanced']
        },
        score: 0.82
      }
    ]

    // Filter results based on query and filters
    let filteredResults = mockResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()) ||
      result.metadata.tags?.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    )

    // Apply type filter
    if (filters.type) {
      filteredResults = filteredResults.filter(result => result.type === filters.type)
    }

    // Apply category filter
    if (filters.category) {
      filteredResults = filteredResults.filter(result => result.metadata.category === filters.category)
    }

    // Apply minimum views filter
    if (filters.minViews) {
      filteredResults = filteredResults.filter(result => result.metadata.views >= filters.minViews!)
    }

    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'popular':
          filteredResults.sort((a, b) => b.metadata.views - a.metadata.views)
          break
        case 'recent':
          // Mock sorting by recency
          filteredResults.sort((a, b) => parseInt(b.id) - parseInt(a.id))
          break
        case 'trending':
          filteredResults.sort((a, b) => b.metadata.likes - a.metadata.likes)
          break
        default: // relevance
          filteredResults.sort((a, b) => b.score - a.score)
      }
    }

    // Limit results
    const maxResults = filters.maxResults || 20
    return filteredResults.slice(0, maxResults)
  }

  private async generateSuggestions(query: string): Promise<string[]> {
    // Mock suggestion generation
    const commonSuggestions = [
      'vr world building',
      'ar development',
      'immersive audio',
      'nft integration',
      '3d modeling',
      'spatial computing',
      'mixed reality',
      'virtual environments'
    ]

    return commonSuggestions
      .filter(suggestion => suggestion.includes(query.toLowerCase()))
      .slice(0, 5)
  }

  async getPopular(
    limit = 5, 
    timeframe: 'day' | 'week' | 'month' = 'week',
    authToken?: string | null
  ): Promise<SearchResult[]> {
    const cacheKey = `popular_${timeframe}_${limit}`
    
    try {
      // Try cache first
      const cached = await cacheService.getJson<SearchResult[]>(cacheKey)
      if (cached) {
        return cached
      }
    } catch (error) {
      console.log('Cache unavailable, using direct results')
    }

    // Generate popular content (mock implementation)
    const popularContent: SearchResult[] = [
      {
        id: 'popular1',
        title: 'Getting Started with VR World Creation',
        description: 'A beginner-friendly guide to creating your first VR world',
        type: 'content',
        thumbnail: '/images/vr-beginner.jpg',
        author: {
          id: 'creator1',
          name: 'Alex Johnson',
          avatar: '/avatars/alex.jpg'
        },
        metadata: {
          views: 2341,
          likes: 189,
          category: 'tutorial',
          tags: ['vr', 'beginner', 'world-creation']
        },
        score: 1.0
      },
      {
        id: 'popular2',
        title: 'Advanced AR Interactions',
        description: 'Learn how to create complex interactions in AR environments',
        type: 'content',
        thumbnail: '/images/ar-advanced.jpg',
        author: {
          id: 'creator2',
          name: 'Lisa Wang',
          avatar: '/avatars/lisa.jpg'
        },
        metadata: {
          views: 1876,
          likes: 145,
          category: 'advanced',
          tags: ['ar', 'interactions', 'advanced']
        },
        score: 0.95
      },
      {
        id: 'popular3',
        title: 'Collaborative World Building',
        description: 'Build immersive worlds together with your team',
        type: 'content',
        thumbnail: '/images/collaborative.jpg',
        author: {
          id: 'creator3',
          name: 'David Kim',
          avatar: '/avatars/david.jpg'
        },
        metadata: {
          views: 1654,
          likes: 123,
          category: 'collaboration',
          tags: ['collaboration', 'team', 'world-building']
        },
        score: 0.90
      }
    ]

    // Try to cache for 30 minutes (fail silently if cache unavailable)
    try {
      await cacheService.setJson(cacheKey, popularContent, 1800)
    } catch (error) {
      console.log('Cache unavailable for storing results')
    }

    return popularContent.slice(0, limit)
  }

  async getTrending(limit = 5): Promise<SearchResult[]> {
    const cacheKey = `trending_${limit}`
    
    const cached = await cacheService.getJson<SearchResult[]>(cacheKey)
    if (cached) {
      return cached
    }

    // Mock trending content
    const trending = await this.getPopular(limit, 'day')
    
    // Cache for 15 minutes (trending updates more frequently)
    await cacheService.setJson(cacheKey, trending, 900)
    
    return trending
  }

  async saveSearch(userId: string, query: string, filters: SearchFilters): Promise<void> {
    const savedSearch = {
      id: `search_${Date.now()}`,
      userId,
      query,
      filters,
      createdAt: new Date()
    }

    // Save to user's search history
    const historyKey = `search_history_${userId}`
    const history = await cacheService.getJson<any[]>(historyKey) || []
    history.unshift(savedSearch)
    
    // Keep only last 50 searches
    const trimmedHistory = history.slice(0, 50)
    await cacheService.setJson(historyKey, trimmedHistory, 86400 * 7) // 7 days
  }

  async getSearchHistory(userId: string): Promise<any[]> {
    const historyKey = `search_history_${userId}`
    return await cacheService.getJson<any[]>(historyKey) || []
  }

  private hashQuery(query: string, filters: SearchFilters): string {
    const queryStr = `${query}_${JSON.stringify(filters)}`
    return Buffer.from(queryStr).toString('base64').slice(0, 32)
  }
}

// Export singleton instance
export const searchService = SearchService.getInstance()