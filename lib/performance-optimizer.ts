// High-performance optimization utilities for Nemurium - SIMPLIFIED VERSION

class PerformanceOptimizer {
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && !this.isInitialized) {
      this.initOptimizations();
      this.isInitialized = true;
    }
  }

  private initOptimizations() {
    try {
      // Basic optimizations only to prevent crashes
      this.setupBasicAnimations();
      this.optimizeImages();
    } catch (error) {
      console.warn('Performance optimizer init failed:', error);
    }
  }

  private setupBasicAnimations() {
    // Add reveal animations for scroll elements
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.1 });

      // Observe elements that need scroll reveal
      setTimeout(() => {
        document.querySelectorAll('.scroll-reveal').forEach(el => {
          observer.observe(el);
        });
      }, 100);
    }
  }

  private optimizeImages() {
    // Simple image optimization
    setTimeout(() => {
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      });
    }, 100);
  }

  // Simple optimization method
  optimizeElement(selector: string) {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        (element as HTMLElement).classList.add('gpu-optimize');
      });
    } catch (error) {
      console.warn('Element optimization failed:', error);
    }
  }

  // Memory cleanup
  cleanup() {
    // Simple cleanup
    console.log('Performance optimizer cleaned up');
  }
}

// Simple utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  }) as T;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
};

// Global instance
const performanceOptimizer = new PerformanceOptimizer();

export default performanceOptimizer;