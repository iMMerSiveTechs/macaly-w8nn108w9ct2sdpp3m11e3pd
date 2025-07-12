// Redis Cache Service for Nemurium
// Handles caching of user sessions, search results, and analytics data

// Simple in-memory cache fallback for environments where Redis isn't available
class InMemoryCache {
  private cache = new Map<string, { value: string, expiry: number }>()

  get(key: string): string | null {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  set(key: string, value: string, ttlSeconds = 3600): boolean {
    const expiry = Date.now() + (ttlSeconds * 1000)
    this.cache.set(key, { value, expiry })
    return true
  }

  del(key: string): boolean {
    return this.cache.delete(key)
  }

  exists(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return false
    }
    
    return true
  }

  keys(pattern: string): string[] {
    // Simple pattern matching for in-memory cache
    const keys = Array.from(this.cache.keys())
    if (pattern === '*') return keys
    
    // Basic wildcard support
    const regex = new RegExp(pattern.replace(/\*/g, '.*'))
    return keys.filter(key => regex.test(key))
  }

  flushAll(): boolean {
    this.cache.clear()
    return true
  }
}

export class CacheService {
  private static instance: CacheService
  private cache: InMemoryCache | any = null
  private isConnected = false

  private constructor() {}

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService()
    }
    return CacheService.instance
  }

  async connect(): Promise<void> {
    try {
      // Try to use Redis if available, fallback to in-memory cache
      if (typeof window === 'undefined' && process.env.REDIS_HOST) {
        // Only import Redis on server side
        const Redis = (await import('ioredis')).default
        
        this.cache = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT || '6379'),
          password: process.env.REDIS_PASSWORD,
          enableReadyCheck: false,
          maxRetriesPerRequest: null,
        })

        this.cache.on('connect', () => {
          console.log('Redis Client Connected')
          this.isConnected = true
        })

        this.cache.on('error', (err: any) => {
          console.error('Redis Connection Error:', err)
          this.isConnected = false
          // Fallback to in-memory cache
          this.cache = new InMemoryCache()
          this.isConnected = true
        })

        await this.cache.ping()
        console.log('✅ Redis cache service initialized')
      } else {
        // Use in-memory cache as fallback
        this.cache = new InMemoryCache()
        this.isConnected = true
        console.log('✅ In-memory cache service initialized')
      }
    } catch (error) {
      console.error('Failed to connect to Redis, using in-memory cache:', error)
      this.cache = new InMemoryCache()
      this.isConnected = true
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.cache || !this.isConnected) {
      console.warn('Cache not connected, skipping cache get')
      return null
    }

    try {
      if (this.cache instanceof InMemoryCache) {
        return this.cache.get(key)
      } else {
        return await this.cache.get(key)
      }
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key: string, value: string, ttlSeconds = 3600): Promise<boolean> {
    if (!this.cache || !this.isConnected) {
      console.warn('Cache not connected, skipping cache set')
      return false
    }

    try {
      if (this.cache instanceof InMemoryCache) {
        return this.cache.set(key, value, ttlSeconds)
      } else {
        await this.cache.setex(key, ttlSeconds, value)
        return true
      }
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.cache || !this.isConnected) {
      return false
    }

    try {
      if (this.cache instanceof InMemoryCache) {
        return this.cache.del(key)
      } else {
        await this.cache.del(key)
        return true
      }
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.cache || !this.isConnected) {
      return false
    }

    try {
      if (this.cache instanceof InMemoryCache) {
        return this.cache.exists(key)
      } else {
        const result = await this.cache.exists(key)
        return result === 1
      }
    } catch (error) {
      console.error('Cache exists error:', error)
      return false
    }
  }

  async keys(pattern: string): Promise<string[]> {
    if (!this.cache || !this.isConnected) {
      return []
    }

    try {
      if (this.cache instanceof InMemoryCache) {
        return this.cache.keys(pattern)
      } else {
        return await this.cache.keys(pattern)
      }
    } catch (error) {
      console.error('Cache keys error:', error)
      return []
    }
  }

  async flushAll(): Promise<boolean> {
    if (!this.cache || !this.isConnected) {
      return false
    }

    try {
      if (this.cache instanceof InMemoryCache) {
        return this.cache.flushAll()
      } else {
        await this.cache.flushall()
        return true
      }
    } catch (error) {
      console.error('Cache flush error:', error)
      return false
    }
  }

  disconnect(): void {
    if (this.cache && !(this.cache instanceof InMemoryCache)) {
      this.cache.disconnect()
    }
    this.isConnected = false
    console.log('Cache disconnected')
  }

  // Helper methods for JSON operations
  async getJson<T>(key: string): Promise<T | null> {
    const value = await this.get(key)
    if (!value) return null
    
    try {
      return JSON.parse(value) as T
    } catch (error) {
      console.error('JSON parse error:', error)
      return null
    }
  }

  async setJson<T>(key: string, value: T, ttlSeconds = 3600): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value)
      return await this.set(key, jsonValue, ttlSeconds)
    } catch (error) {
      console.error('JSON stringify error:', error)
      return false
    }
  }

  isHealthy(): boolean {
    return this.isConnected
  }
}

// Export singleton instance
export const cacheService = CacheService.getInstance()