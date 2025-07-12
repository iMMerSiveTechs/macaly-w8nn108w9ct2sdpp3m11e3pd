// tRPC Search Router for Nemurium
// Handles search queries, popular content, and search analytics

import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from './trpc'
import { searchService } from '../services/search'
import { analyticsService } from '../services/analytics'

const searchInputSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.object({
    type: z.enum(['content', 'user', 'world', 'asset']).optional(),
    category: z.string().optional(),
    minViews: z.number().optional(),
    maxResults: z.number().min(1).max(50).default(20),
    sortBy: z.enum(['relevance', 'recent', 'popular', 'trending']).default('relevance')
  }).optional().default({}),
  sessionId: z.string().optional()
})

const popularInputSchema = z.object({
  limit: z.number().min(1).max(20).default(5),
  timeframe: z.enum(['day', 'week', 'month']).default('week'),
  authToken: z.string().nullable().optional()
})

const saveSearchSchema = z.object({
  query: z.string().min(1).max(100),
  filters: z.object({
    type: z.enum(['content', 'user', 'world', 'asset']).optional(),
    category: z.string().optional(),
    minViews: z.number().optional(),
    sortBy: z.enum(['relevance', 'recent', 'popular', 'trending']).optional()
  }).optional().default({})
})

export const searchRouter = createTRPCRouter({
  
  // Public search endpoint
  search: publicProcedure
    .input(searchInputSchema)
    .query(async ({ input, ctx }) => {
      const { query, filters, sessionId } = input
      const userId = ctx.session?.user?.id

      console.log('Search query:', { query, filters, userId, sessionId })

      try {
        const results = await searchService.search(query, filters, userId, sessionId)
        
        // Track search analytics
        if (sessionId) {
          await analyticsService.trackSearch(query, results.total, userId, sessionId)
        }

        return {
          success: true,
          ...results
        }
      } catch (error) {
        console.error('Search error:', error)
        return {
          success: false,
          results: [],
          total: 0,
          suggestions: [],
          error: 'Search failed'
        }
      }
    }),

  // Get popular content
  getPopular: publicProcedure
    .input(popularInputSchema)
    .query(async ({ input }) => {
      const { limit, timeframe, authToken } = input

      console.log('Getting popular content:', { limit, timeframe, authToken })

      try {
        const results = await searchService.getPopular(limit, timeframe, authToken)
        
        return {
          success: true,
          results
        }
      } catch (error) {
        console.error('Get popular error:', error)
        return {
          success: false,
          results: [],
          error: 'Failed to get popular content'
        }
      }
    }),

  // Get trending content  
  getTrending: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(20).default(5)
    }))
    .query(async ({ input }) => {
      const { limit } = input

      try {
        const results = await searchService.getTrending(limit)
        
        return {
          success: true,
          results
        }
      } catch (error) {
        console.error('Get trending error:', error)
        return {
          success: false,
          results: [],
          error: 'Failed to get trending content'
        }
      }
    }),

  // Save search (protected)
  saveSearch: protectedProcedure
    .input(saveSearchSchema)
    .mutation(async ({ input, ctx }) => {
      const { query, filters } = input
      const userId = ctx.session?.user?.id

      if (!userId) {
        throw new Error('User not found')
      }

      try {
        await searchService.saveSearch(userId, query, filters)
        
        return {
          success: true,
          message: 'Search saved successfully'
        }
      } catch (error) {
        console.error('Save search error:', error)
        return {
          success: false,
          error: 'Failed to save search'
        }
      }
    }),

  // Get search history (protected)
  getHistory: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session?.user?.id

      if (!userId) {
        throw new Error('User not found')
      }

      try {
        const history = await searchService.getSearchHistory(userId)
        
        return {
          success: true,
          history
        }
      } catch (error) {
        console.error('Get search history error:', error)
        return {
          success: false,
          history: [],
          error: 'Failed to get search history'
        }
      }
    }),

  // Get search suggestions
  getSuggestions: publicProcedure
    .input(z.object({
      query: z.string().min(1).max(50)
    }))
    .query(async ({ input }) => {
      const { query } = input

      try {
        // Simple suggestions based on common terms
        const suggestions = [
          'vr world building',
          'ar development',
          'immersive audio',
          'nft integration',
          '3d modeling',
          'spatial computing',
          'mixed reality',
          'virtual environments'
        ].filter(suggestion => 
          suggestion.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)

        return {
          success: true,
          suggestions
        }
      } catch (error) {
        console.error('Get suggestions error:', error)
        return {
          success: false,
          suggestions: [],
          error: 'Failed to get suggestions'
        }
      }
    }),

  // Track search analytics
  trackSearch: publicProcedure
    .input(z.object({
      query: z.string(),
      results: z.number(),
      sessionId: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const { query, results, sessionId } = input
      const userId = ctx.session?.user?.id

      try {
        await analyticsService.trackSearch(query, results, userId, sessionId)
        
        return {
          success: true
        }
      } catch (error) {
        console.error('Track search error:', error)
        return {
          success: false,
          error: 'Failed to track search'
        }
      }
    })
})