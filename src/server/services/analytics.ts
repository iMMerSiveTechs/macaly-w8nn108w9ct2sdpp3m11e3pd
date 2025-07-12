// Analytics Service for Nemurium
// Handles user behavior tracking, platform metrics, and real-time analytics

import { cacheService } from '../cache/redis'

export interface AnalyticsEvent {
  id: string
  event: string
  properties: Record<string, any>
  userId?: string
  sessionId: string
  ip?: string
  userAgent?: string
  timestamp: Date
}

export interface RealTimeMetrics {
  activeUsers: number
  totalViews: number
  contentCreated: number
  searchQueries: number
  subscriptionSignups: number
  lastUpdated: Date
}

export class AnalyticsService {
  private static instance: AnalyticsService
  private eventQueue: AnalyticsEvent[] = []
  private flushInterval: NodeJS.Timeout | null = null
  private readonly BATCH_SIZE = 100
  private readonly FLUSH_INTERVAL = 10000 // 10 seconds

  private constructor() {
    this.startEventProcessor()
  }

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  private startEventProcessor(): void {
    this.flushInterval = setInterval(async () => {
      await this.flushEvents()
    }, this.FLUSH_INTERVAL)
  }

  async track(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: new Date()
    }

    this.eventQueue.push(analyticsEvent)

    // Flush immediately if queue is full
    if (this.eventQueue.length >= this.BATCH_SIZE) {
      await this.flushEvents()
    }
  }

  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return

    const events = this.eventQueue.splice(0, this.BATCH_SIZE)
    console.log(`Storing ${events.length} analytics events`)

    try {
      // Store events in database (mock implementation)
      await this.storeEvents(events)
      
      // Update real-time metrics in cache
      await this.updateRealTimeMetrics(events)
    } catch (error) {
      console.error('Failed to flush analytics events:', error)
      // Re-queue events on failure
      this.eventQueue.unshift(...events)
    }
  }

  private async storeEvents(events: AnalyticsEvent[]): Promise<void> {
    // Mock database storage - replace with actual database calls
    for (const event of events) {
      console.log('Analytics Event:', {
        event: event.event,
        userId: event.userId,
        properties: event.properties,
        timestamp: event.timestamp
      })
    }
  }

  private async updateRealTimeMetrics(events: AnalyticsEvent[]): Promise<void> {
    try {
      const metrics = await this.getRealTimeMetrics()
      
      for (const event of events) {
        switch (event.event) {
          case 'page_view':
            metrics.totalViews++
            break
          case 'content_created':
            metrics.contentCreated++
            break
          case 'search_query':
            metrics.searchQueries++
            break
          case 'subscription_signup':
            metrics.subscriptionSignups++
            break
        }
      }

      metrics.lastUpdated = new Date()
      await cacheService.setJson('real_time_metrics', metrics, 300) // 5 minute TTL
    } catch (error) {
      console.error('Failed to update real-time metrics:', error)
    }
  }

  async getRealTimeMetrics(): Promise<RealTimeMetrics> {
    const cached = await cacheService.getJson<RealTimeMetrics>('real_time_metrics')
    
    if (cached) {
      return cached
    }

    // Default metrics
    const defaultMetrics: RealTimeMetrics = {
      activeUsers: 0,
      totalViews: 0,
      contentCreated: 0,
      searchQueries: 0,
      subscriptionSignups: 0,
      lastUpdated: new Date()
    }

    await cacheService.setJson('real_time_metrics', defaultMetrics, 300)
    return defaultMetrics
  }

  async trackPageView(userId: string | undefined, page: string, sessionId: string, ip?: string, userAgent?: string): Promise<void> {
    await this.track({
      event: 'page_view',
      properties: { page },
      userId,
      sessionId,
      ip,
      userAgent
    })
  }

  async trackSearch(query: string, results: number, userId: string | undefined, sessionId: string): Promise<void> {
    await this.track({
      event: 'search_query',
      properties: { query, results },
      userId,
      sessionId
    })
  }

  async trackContentCreation(contentType: string, userId: string, sessionId: string): Promise<void> {
    await this.track({
      event: 'content_created',
      properties: { contentType },
      userId,
      sessionId
    })
  }

  async trackSubscriptionSignup(tier: string, userId: string, sessionId: string): Promise<void> {
    await this.track({
      event: 'subscription_signup',
      properties: { tier },
      userId,
      sessionId
    })
  }

  async trackUserAction(action: string, properties: Record<string, any>, userId: string | undefined, sessionId: string): Promise<void> {
    await this.track({
      event: 'user_action',
      properties: { action, ...properties },
      userId,
      sessionId
    })
  }

  async getTopContent(timeframe: 'day' | 'week' | 'month' = 'week', limit = 10): Promise<any[]> {
    // Mock implementation - replace with actual database queries
    const cacheKey = `top_content_${timeframe}`
    const cached = await cacheService.getJson<any[]>(cacheKey)
    
    if (cached) {
      return cached.slice(0, limit)
    }

    // Mock data
    const mockContent = [
      { id: '1', title: 'VR World Building Tutorial', views: 1245, type: 'video' },
      { id: '2', title: 'AR Object Placement Guide', views: 982, type: 'tutorial' },
      { id: '3', title: 'Immersive Audio Design', views: 756, type: 'audio' },
      { id: '4', title: 'NFT Integration Demo', views: 634, type: 'demo' },
      { id: '5', title: 'Collaborative World Creation', views: 523, type: 'guide' }
    ]

    await cacheService.setJson(cacheKey, mockContent, 3600) // 1 hour TTL
    return mockContent.slice(0, limit)
  }

  async getUserAnalytics(userId: string): Promise<any> {
    const cacheKey = `user_analytics_${userId}`
    const cached = await cacheService.getJson(cacheKey)
    
    if (cached) {
      return cached
    }

    // Mock user analytics
    const analytics = {
      totalViews: Math.floor(Math.random() * 1000),
      contentCreated: Math.floor(Math.random() * 50),
      engagementRate: Math.random() * 100,
      topContent: await this.getTopContent('week', 5),
      recentActivity: []
    }

    await cacheService.setJson(cacheKey, analytics, 1800) // 30 minute TTL
    return analytics
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  async stop(): Promise<void> {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
      this.flushInterval = null
    }
    
    // Flush remaining events
    await this.flushEvents()
  }
}

// Export singleton instance
export const analyticsService = AnalyticsService.getInstance()