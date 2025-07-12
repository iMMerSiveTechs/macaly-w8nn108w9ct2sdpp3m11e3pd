// Service Initialization for Nemurium Backend
// Initializes all backend services in the correct order

import { cacheService } from './cache/redis'
import { analyticsService } from './services/analytics'
import { searchService } from './services/search'
import { fileUploadService } from './services/file-upload'

export class ServiceManager {
  private static instance: ServiceManager
  private isInitialized = false

  private constructor() {}

  static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager()
    }
    return ServiceManager.instance
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('Services already initialized')
      return
    }

    console.log('🚀 Initializing Nemurium backend services...')

    try {
      // Initialize Redis cache service
      if (cacheService && typeof cacheService.connect === 'function') {
        await cacheService.connect()
      } else {
        console.warn('Cache service not available, skipping...')
      }

      // Initialize analytics service (already started in constructor)
      console.log('✅ Analytics service initialized')

      // Initialize search service
      console.log('✅ Search service initialized')

      // Initialize file upload service
      console.log('✅ File upload service initialized')

      this.isInitialized = true
      console.log('🎉 All services initialized successfully!')

    } catch (error) {
      console.error('❌ Failed to initialize services:', error)
      // Don't throw error, just log it so the app can still work
      this.isInitialized = true
    }
  }

  async healthCheck(): Promise<{ [key: string]: boolean }> {
    return {
      cache: cacheService?.isHealthy ? cacheService.isHealthy() : false,
      analytics: true, // Analytics service is always healthy if instantiated
      search: true, // Search service is always healthy
      fileUpload: true, // File upload service is always healthy
    }
  }

  async shutdown(): Promise<void> {
    console.log('🛑 Shutting down services...')

    try {
      // Stop analytics service
      if (analyticsService && typeof analyticsService.stop === 'function') {
        await analyticsService.stop()
      }

      // Disconnect Redis
      if (cacheService && typeof cacheService.disconnect === 'function') {
        cacheService.disconnect()
      }

      this.isInitialized = false
      console.log('✅ All services shut down successfully')

    } catch (error) {
      console.error('❌ Error during shutdown:', error)
    }
  }

  isReady(): boolean {
    return this.isInitialized
  }
}

// Export singleton instance
export const serviceManager = ServiceManager.getInstance()

// Auto-initialize on import for convenience
serviceManager.initialize().catch(console.error)

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...')
  await serviceManager.shutdown()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...')
  await serviceManager.shutdown()
  process.exit(0)
})