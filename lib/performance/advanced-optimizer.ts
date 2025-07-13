/**
 * Advanced Performance Optimization System for Nemurium
 * Enterprise-grade performance monitoring, optimization, and analytics
 */

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  networkLatency: number;
  bundleSize: number;
  timeToInteractive: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

interface OptimizationConfig {
  enableImageOptimization: boolean;
  enableCodeSplitting: boolean;
  enableServiceWorker: boolean;
  enableResourcePreloading: boolean;
  enableMemoryManagement: boolean;
  enableRenderOptimization: boolean;
  maxMemoryThreshold: number;
  minFPSThreshold: number;
}

interface ResourceProfile {
  url: string;
  type: 'script' | 'style' | 'image' | 'font' | 'video' | 'audio';
  size: number;
  loadTime: number;
  priority: 'high' | 'medium' | 'low';
  cached: boolean;
}

class AdvancedPerformanceOptimizer {
  private metrics: PerformanceMetrics;
  private config: OptimizationConfig;
  private observer: PerformanceObserver | null = null;
  private frameCount = 0;
  private lastFrameTime = performance.now();
  private resourceProfiles: Map<string, ResourceProfile> = new Map();
  private memoryLeakDetector: WeakMap<any, string> = new WeakMap();
  private renderQueue: Array<() => void> = [];
  private isOptimizing = false;

  constructor(config: OptimizationConfig) {
    this.config = config;
    this.metrics = this.initializeMetrics();
    
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  /**
   * Initialize performance optimization system
   */
  private initialize(): void {
    this.setupPerformanceObserver();
    this.setupFPSMonitoring();
    this.setupMemoryMonitoring();
    this.setupNetworkMonitoring();
    this.setupRenderOptimization();
    this.setupResourceOptimization();
    this.setupServiceWorker();
    
    // Start optimization loop
    this.startOptimizationLoop();
  }

  /**
   * Initialize default metrics
   */
  private initializeMetrics(): PerformanceMetrics {
    return {
      fps: 60,
      memoryUsage: 0,
      renderTime: 0,
      networkLatency: 0,
      bundleSize: 0,
      timeToInteractive: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0
    };
  }

  /**
   * Setup Performance Observer for Web Vitals
   */
  private setupPerformanceObserver(): void {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.metrics.largestContentfulPaint = entry.startTime;
          } else if (entry.entryType === 'first-input') {
            this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
          } else if (entry.entryType === 'layout-shift') {
            if (!(entry as any).hadRecentInput) {
              this.metrics.cumulativeLayoutShift += (entry as any).value;
            }
          }
        }
      });

      try {
        this.observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        console.warn('Performance Observer not fully supported:', e);
      }

      // First Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        }
      });

      try {
        paintObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('Paint Observer not supported:', e);
      }
    }
  }

  /**
   * Setup FPS monitoring
   */
  private setupFPSMonitoring(): void {
    const updateFPS = () => {
      this.frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - this.lastFrameTime >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFrameTime));
        this.frameCount = 0;
        this.lastFrameTime = currentTime;
        
        // Trigger optimization if FPS drops
        if (this.metrics.fps < this.config.minFPSThreshold) {
          this.optimizeFPS();
        }
      }
      
      requestAnimationFrame(updateFPS);
    };
    
    requestAnimationFrame(updateFPS);
  }

  /**
   * Setup memory monitoring
   */
  private setupMemoryMonitoring(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.metrics.memoryUsage = memory.usedJSHeapSize / (1024 * 1024); // MB
        
        // Trigger memory cleanup if threshold exceeded
        if (this.metrics.memoryUsage > this.config.maxMemoryThreshold) {
          this.optimizeMemory();
        }
      }, 5000);
    }
  }

  /**
   * Setup network monitoring
   */
  private setupNetworkMonitoring(): void {
    if ('navigator' in window && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      
      const updateNetworkMetrics = () => {
        this.metrics.networkLatency = connection.rtt || 0;
        
        // Optimize for slow connections
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          this.optimizeForSlowNetwork();
        }
      };

      connection.addEventListener('change', updateNetworkMetrics);
      updateNetworkMetrics();
    }
  }

  /**
   * Setup render optimization
   */
  private setupRenderOptimization(): void {
    if (this.config.enableRenderOptimization) {
      // Intersection Observer for lazy loading
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.optimizeElement(entry.target as HTMLElement);
          }
        });
      }, { rootMargin: '50px' });

      // Observe all images and videos
      const observeElements = () => {
        document.querySelectorAll('img, video, iframe').forEach((el) => {
          if (!el.dataset.observed) {
            intersectionObserver.observe(el);
            el.dataset.observed = 'true';
          }
        });
      };

      // Initial observation
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeElements);
      } else {
        observeElements();
      }

      // Observe new elements
      const mutationObserver = new MutationObserver(() => {
        observeElements();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  /**
   * Setup resource optimization
   */
  private setupResourceOptimization(): void {
    if (this.config.enableResourcePreloading) {
      // Critical resource preloading
      this.preloadCriticalResources();
      
      // Resource monitoring
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            this.profileResource(entry as PerformanceResourceTiming);
          }
        }
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.warn('Resource Observer not supported:', e);
      }
    }
  }

  /**
   * Setup service worker for caching
   */
  private setupServiceWorker(): void {
    if (this.config.enableServiceWorker && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.warn('SW registration failed:', error);
        });
    }
  }

  /**
   * Start optimization loop
   */
  private startOptimizationLoop(): void {
    setInterval(() => {
      if (!this.isOptimizing) {
        this.runOptimizationCycle();
      }
    }, 10000); // Run every 10 seconds
  }

  /**
   * Run complete optimization cycle
   */
  private async runOptimizationCycle(): Promise<void> {
    this.isOptimizing = true;
    
    try {
      // Memory optimization
      if (this.metrics.memoryUsage > this.config.maxMemoryThreshold * 0.8) {
        await this.optimizeMemory();
      }
      
      // Image optimization
      if (this.config.enableImageOptimization) {
        await this.optimizeImages();
      }
      
      // Code splitting optimization
      if (this.config.enableCodeSplitting) {
        await this.optimizeCodeSplitting();
      }
      
      // DOM optimization
      await this.optimizeDOM();
      
      // Network optimization
      await this.optimizeNetwork();
      
    } catch (error) {
      console.warn('Optimization cycle error:', error);
    } finally {
      this.isOptimizing = false;
    }
  }

  /**
   * Optimize FPS
   */
  private optimizeFPS(): void {
    // Reduce animation complexity
    document.querySelectorAll('[class*="animate-"]').forEach((el) => {
      (el as HTMLElement).style.animationDuration = '0.5s';
    });
    
    // Disable non-critical animations
    document.querySelectorAll('.particles-bg, .animate-matrix').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
    
    // Optimize render layers
    document.querySelectorAll('img, video').forEach((el) => {
      (el as HTMLElement).style.willChange = 'auto';
    });
  }

  /**
   * Optimize memory usage
   */
  private async optimizeMemory(): Promise<void> {
    // Clear unused event listeners
    this.cleanupEventListeners();
    
    // Clear image caches
    this.clearImageCaches();
    
    // Garbage collection hint
    if ('gc' in window) {
      (window as any).gc();
    }
    
    // Clear render queue
    this.renderQueue = [];
    
    // Remove unused DOM elements
    this.cleanupDOM();
  }

  /**
   * Optimize images
   */
  private async optimizeImages(): Promise<void> {
    const images = document.querySelectorAll('img');
    
    images.forEach((img) => {
      // Lazy loading
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Optimize image format
      if (img.src && !img.src.includes('webp') && !img.src.includes('avif')) {
        this.optimizeImageFormat(img);
      }
      
      // Responsive images
      if (!img.sizes && img.dataset.optimize) {
        this.makeImageResponsive(img);
      }
    });
  }

  /**
   * Optimize code splitting
   */
  private async optimizeCodeSplitting(): Promise<void> {
    // Dynamically import non-critical modules
    const heavyModules = document.querySelectorAll('[data-heavy-module]');
    
    heavyModules.forEach(async (element) => {
      const moduleName = element.getAttribute('data-heavy-module');
      if (moduleName && !element.dataset.loaded) {
        try {
          await import(/* webpackChunkName: "[request]" */ `../modules/${moduleName}`);
          element.dataset.loaded = 'true';
        } catch (error) {
          console.warn(`Failed to load module ${moduleName}:`, error);
        }
      }
    });
  }

  /**
   * Optimize DOM
   */
  private async optimizeDOM(): Promise<void> {
    // Remove hidden elements
    const hiddenElements = document.querySelectorAll('[style*="display: none"], .hidden');
    hiddenElements.forEach((el) => {
      if (!el.dataset.keepHidden) {
        el.remove();
      }
    });
    
    // Optimize text nodes
    this.optimizeTextNodes();
    
    // Optimize CSS
    this.optimizeCSS();
  }

  /**
   * Optimize network requests
   */
  private async optimizeNetwork(): Promise<void> {
    // Prefetch critical resources
    this.prefetchCriticalResources();
    
    // Optimize font loading
    this.optimizeFontLoading();
    
    // Bundle small resources
    this.bundleSmallResources();
  }

  /**
   * Optimize for slow network
   */
  private optimizeForSlowNetwork(): void {
    // Disable autoplay videos
    document.querySelectorAll('video[autoplay]').forEach((video) => {
      (video as HTMLVideoElement).autoplay = false;
    });
    
    // Load low-quality images first
    document.querySelectorAll('img[data-src-hq]').forEach((img) => {
      const lowQualitySrc = img.getAttribute('data-src-lq');
      if (lowQualitySrc) {
        img.setAttribute('src', lowQualitySrc);
      }
    });
    
    // Disable non-essential features
    document.querySelectorAll('.particles-bg, .animate-matrix').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
  }

  /**
   * Optimize individual element
   */
  private optimizeElement(element: HTMLElement): void {
    // Add GPU acceleration
    element.style.transform = 'translateZ(0)';
    element.style.willChange = 'transform';
    
    // Optimize images
    if (element.tagName === 'IMG') {
      this.optimizeImageElement(element as HTMLImageElement);
    }
    
    // Optimize videos
    if (element.tagName === 'VIDEO') {
      this.optimizeVideoElement(element as HTMLVideoElement);
    }
  }

  /**
   * Profile resource performance
   */
  private profileResource(entry: PerformanceResourceTiming): void {
    const profile: ResourceProfile = {
      url: entry.name,
      type: this.getResourceType(entry.name),
      size: entry.transferSize || 0,
      loadTime: entry.responseEnd - entry.requestStart,
      priority: this.getResourcePriority(entry.name),
      cached: entry.transferSize === 0
    };
    
    this.resourceProfiles.set(entry.name, profile);
    
    // Optimize slow resources
    if (profile.loadTime > 1000 && profile.priority === 'high') {
      this.optimizeSlowResource(profile);
    }
  }

  /**
   * Preload critical resources
   */
  private preloadCriticalResources(): void {
    const criticalResources = [
      '/fonts/inter-var.woff2',
      '/css/critical.css',
      '/js/core.js'
    ];
    
    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = this.getResourceType(resource);
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  /**
   * Prefetch critical resources
   */
  private prefetchCriticalResources(): void {
    const prefetchResources = [
      '/api/user/profile',
      '/api/world/templates',
      '/models/basic-shapes.glb'
    ];
    
    prefetchResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  /**
   * Get resource type from URL
   */
  private getResourceType(url: string): ResourceProfile['type'] {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'style';
    if (url.includes('.woff') || url.includes('.ttf')) return 'font';
    if (url.includes('.jpg') || url.includes('.png') || url.includes('.webp')) return 'image';
    if (url.includes('.mp4') || url.includes('.webm')) return 'video';
    if (url.includes('.mp3') || url.includes('.ogg')) return 'audio';
    return 'script';
  }

  /**
   * Get resource priority
   */
  private getResourcePriority(url: string): ResourceProfile['priority'] {
    if (url.includes('critical') || url.includes('core')) return 'high';
    if (url.includes('analytics') || url.includes('tracking')) return 'low';
    return 'medium';
  }

  /**
   * Optimize slow resource
   */
  private optimizeSlowResource(profile: ResourceProfile): void {
    console.warn(`Slow resource detected: ${profile.url} (${profile.loadTime}ms)`);
    
    // Could implement resource optimization strategies here
    // Such as compression, CDN routing, etc.
  }

  /**
   * Cleanup utilities
   */
  private cleanupEventListeners(): void {
    // Implementation would track and cleanup event listeners
  }

  private clearImageCaches(): void {
    // Clear browser image caches if possible
  }

  private cleanupDOM(): void {
    // Remove unused DOM elements
    const unusedElements = document.querySelectorAll('[data-cleanup]');
    unusedElements.forEach(el => el.remove());
  }

  private optimizeImageFormat(img: HTMLImageElement): void {
    // Implementation for format optimization
  }

  private makeImageResponsive(img: HTMLImageElement): void {
    img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }

  private optimizeImageElement(img: HTMLImageElement): void {
    if (!img.loading) img.loading = 'lazy';
    if (!img.decoding) img.decoding = 'async';
  }

  private optimizeVideoElement(video: HTMLVideoElement): void {
    video.preload = 'metadata';
    if (!video.poster) {
      video.poster = '/images/video-placeholder.jpg';
    }
  }

  private optimizeTextNodes(): void {
    // Optimize text rendering
  }

  private optimizeCSS(): void {
    // Remove unused CSS
  }

  private optimizeFontLoading(): void {
    // Optimize font loading strategy
  }

  private bundleSmallResources(): void {
    // Bundle small resources together
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get optimization recommendations
   */
  getRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.metrics.fps < 30) {
      recommendations.push('Consider reducing animation complexity');
    }
    
    if (this.metrics.memoryUsage > 100) {
      recommendations.push('Memory usage is high - consider optimizing images and clearing caches');
    }
    
    if (this.metrics.largestContentfulPaint > 2500) {
      recommendations.push('Largest Contentful Paint is slow - optimize critical resources');
    }
    
    if (this.metrics.cumulativeLayoutShift > 0.1) {
      recommendations.push('Layout shifts detected - add dimensions to images and videos');
    }
    
    return recommendations;
  }

  /**
   * Force optimization
   */
  async forceOptimization(): Promise<void> {
    await this.runOptimizationCycle();
  }
}

// Default configuration
export const defaultOptimizationConfig: OptimizationConfig = {
  enableImageOptimization: true,
  enableCodeSplitting: true,
  enableServiceWorker: true,
  enableResourcePreloading: true,
  enableMemoryManagement: true,
  enableRenderOptimization: true,
  maxMemoryThreshold: 150, // MB
  minFPSThreshold: 30
};

// Export optimizer instance
export const performanceOptimizer = new AdvancedPerformanceOptimizer(defaultOptimizationConfig);

export default AdvancedPerformanceOptimizer;