/**
 * Enterprise Service Worker for Nemurium
 * Advanced caching, offline support, and performance optimization
 */

const CACHE_NAME = 'nemurium-v1.0.0';
const STATIC_CACHE = 'nemurium-static-v1.0.0';
const DYNAMIC_CACHE = 'nemurium-dynamic-v1.0.0';
const API_CACHE = 'nemurium-api-v1.0.0';
const IMAGE_CACHE = 'nemurium-images-v1.0.0';

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/world-builder',
  '/asset-library',
  '/tools',
  '/offline',
  '/manifest.json',
  '/_next/static/css/app.css',
  '/_next/static/js/app.js',
  '/fonts/inter-var.woff2'
];

// API endpoints to cache
const CACHEABLE_APIS = [
  '/api/health',
  '/api/user/profile',
  '/api/assets/library'
];

// Performance monitoring
let performanceMetrics = {
  cacheHits: 0,
  cacheMisses: 0,
  networkRequests: 0,
  offlineRequests: 0
};

/**
 * Install event - cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        const deletePromises = cacheNames
          .filter((name) => name.startsWith('nemurium-') && name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          });
        return Promise.all(deletePromises);
      }),
      
      // Claim all clients
      self.clients.claim()
    ])
  );
});

/**
 * Fetch event - handle all network requests
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Route to appropriate strategy based on request type
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(handleStaticAssets(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequests(request));
  } else if (isImageRequest(request)) {
    event.respondWith(handleImageRequests(request));
  } else if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequests(request));
  } else {
    event.respondWith(handleDynamicRequests(request));
  }
});

/**
 * Handle static assets (CSS, JS, fonts) - Cache First
 */
async function handleStaticAssets(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      performanceMetrics.cacheHits++;
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    performanceMetrics.networkRequests++;
    return networkResponse;
    
  } catch (error) {
    console.error('[SW] Static asset error:', error);
    performanceMetrics.cacheMisses++;
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Handle API requests - Network First with cache fallback
 */
async function handleApiRequests(request) {
  const url = new URL(request.url);
  
  // Don't cache sensitive endpoints
  if (isSensitiveEndpoint(url.pathname)) {
    return fetch(request);
  }
  
  try {
    // Try network first
    const networkResponse = await fetch(request, {
      // Add timeout for better UX
      signal: AbortSignal.timeout(5000)
    });
    
    if (networkResponse.status === 200 && CACHEABLE_APIS.some(api => url.pathname.startsWith(api))) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    performanceMetrics.networkRequests++;
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url);
    
    const cache = await caches.open(API_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      performanceMetrics.cacheHits++;
      return cachedResponse;
    }
    
    performanceMetrics.cacheMisses++;
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Handle image requests - Stale While Revalidate
 */
async function handleImageRequests(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    performanceMetrics.cacheHits++;
    
    // Update cache in background
    fetch(request).then((networkResponse) => {
      if (networkResponse.status === 200) {
        cache.put(request, networkResponse.clone());
      }
    }).catch(console.error);
    
    return cachedResponse;
  }
  
  // No cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    performanceMetrics.networkRequests++;
    return networkResponse;
    
  } catch (error) {
    console.error('[SW] Image fetch error:', error);
    performanceMetrics.cacheMisses++;
    
    // Return placeholder image
    return new Response(getPlaceholderImage(), {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
}

/**
 * Handle navigation requests - Network First with offline fallback
 */
async function handleNavigationRequests(request) {
  try {
    const networkResponse = await fetch(request, {
      signal: AbortSignal.timeout(3000)
    });
    
    // Cache successful navigation responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    performanceMetrics.networkRequests++;
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Navigation network failed, trying cache');
    
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      performanceMetrics.cacheHits++;
      return cachedResponse;
    }
    
    // Return offline page
    performanceMetrics.offlineRequests++;
    return caches.match('/offline') || new Response('Offline', {
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

/**
 * Handle dynamic requests - Network First
 */
async function handleDynamicRequests(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses for dynamic content
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    performanceMetrics.networkRequests++;
    return networkResponse;
    
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      performanceMetrics.cacheHits++;
      return cachedResponse;
    }
    
    performanceMetrics.cacheMisses++;
    return new Response('Offline', { status: 503 });
  }
}

/**
 * Utility functions
 */
function isImageRequest(request) {
  const url = new URL(request.url);
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname);
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

function isSensitiveEndpoint(pathname) {
  const sensitiveEndpoints = [
    '/api/auth/',
    '/api/payment/',
    '/api/admin/',
    '/api/user/password',
    '/api/user/delete'
  ];
  return sensitiveEndpoints.some(endpoint => pathname.startsWith(endpoint));
}

function getPlaceholderImage() {
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="#f3f4f6"/>
    <text x="100" y="100" text-anchor="middle" dy=".3em" font-family="Arial" font-size="14" fill="#6b7280">
      Image unavailable offline
    </text>
  </svg>`;
}

/**
 * Message handling for cache management
 */
self.addEventListener('message', (event) => {
  const { data } = event;
  
  switch (data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_URLS':
      cacheUrls(data.urls);
      break;
      
    case 'CLEAR_CACHE':
      clearCache(data.cacheName);
      break;
      
    case 'GET_METRICS':
      event.ports[0].postMessage(performanceMetrics);
      break;
      
    case 'PREFETCH_ROUTE':
      prefetchRoute(data.route);
      break;
  }
});

/**
 * Cache specific URLs
 */
async function cacheUrls(urls) {
  const cache = await caches.open(DYNAMIC_CACHE);
  await Promise.all(
    urls.map(url => 
      fetch(url)
        .then(response => {
          if (response.status === 200) {
            return cache.put(url, response);
          }
        })
        .catch(console.error)
    )
  );
}

/**
 * Clear specific cache
 */
async function clearCache(cacheName) {
  if (cacheName) {
    await caches.delete(cacheName);
  } else {
    // Clear all caches
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames
        .filter(name => name.startsWith('nemurium-'))
        .map(name => caches.delete(name))
    );
  }
}

/**
 * Prefetch route for faster navigation
 */
async function prefetchRoute(route) {
  try {
    const response = await fetch(route);
    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(route, response);
    }
  } catch (error) {
    console.error('Prefetch failed:', error);
  }
}

/**
 * Periodic cleanup of old cache entries
 */
setInterval(async () => {
  const cacheNames = [DYNAMIC_CACHE, API_CACHE, IMAGE_CACHE];
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    // Remove entries older than 7 days
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    for (const request of requests) {
      const response = await cache.match(request);
      const date = response.headers.get('date');
      
      if (date && new Date(date).getTime() < sevenDaysAgo) {
        await cache.delete(request);
      }
    }
  }
}, 24 * 60 * 60 * 1000); // Run daily

/**
 * Background sync for failed requests
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic for failed requests
  console.log('[SW] Background sync triggered');
}

/**
 * Push notifications
 */
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Open Nemurium'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

/**
 * Notification click handling
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data.url || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) => {
          if (windowClient.url === url) {
            windowClient.focus();
            return true;
          }
          return false;
        });
        
        if (!hadWindowToFocus) {
          clients.openWindow(url);
        }
      })
    );
  }
});

console.log('[SW] Service worker loaded successfully');