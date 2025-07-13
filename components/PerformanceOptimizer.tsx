'use client';
import { useEffect } from 'react';

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Simple initialization with error handling
    const timer = setTimeout(() => {
      try {
        // Add basic GPU optimization classes
        document.querySelectorAll('.card-hover, .glass, [class*="animate-"]').forEach(el => {
          (el as HTMLElement).classList.add('gpu-optimize');
        });

        // Simple performance monitoring
        console.log('Performance optimizer initialized');
      } catch (error) {
        console.warn('Performance optimization failed:', error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}