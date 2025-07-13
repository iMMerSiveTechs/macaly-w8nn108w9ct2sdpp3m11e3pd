// Performance monitoring and optimization utilities
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);

  // Preload critical images
  const criticalImages = [
    '/icons/world-builder.svg',
    '/icons/copilot.svg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Lazy load non-critical components
export const lazyLoadComponent = (componentLoader: () => Promise<any>) => {
  return import('react').then(React => {
    return React.lazy(componentLoader);
  });
};

// Debounce expensive operations
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Performance metrics
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === 'undefined') return fn();
  
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Critical CSS for above-the-fold content
export const injectCriticalCSS = () => {
  if (typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.textContent = `
    .hero-section { min-height: 100vh; }
    .btn-primary { background: #8b5cf6; color: white; padding: 12px 24px; border-radius: 8px; }
    .loading-skeleton { background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%); animation: loading 1.5s infinite; }
    @keyframes loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  `;
  document.head.appendChild(style);
};