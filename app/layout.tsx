import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalNavigation from "@/components/GlobalNavigation";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ImmersiveCursor from "@/components/ImmersiveCursor";
import EnterpriseOptimizer from "@/components/EnterpriseOptimizer";
import AIMonitoringSystem from "@/components/AIMonitoringSystem";
import LegalComplianceSystem from "@/components/LegalComplianceSystem";
import { Suspense } from "react";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
});

export const metadata: Metadata = {
  title: "Nemurium - The Future of Immersive Creation",
  description: "Build and monetize interactive 3D realms in mixed reality – no code, no limits.",
  keywords: ["3D", "VR", "AR", "mixed reality", "world builder", "immersive", "metaverse", "creator tools"],
  authors: [{ name: "iMMerSive Technologies, LLC" }],
  creator: "Nemurium",
  publisher: "iMMerSive Technologies, LLC",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#8b5cf6",
  colorScheme: "dark",
  manifest: "/manifest.json",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nemurium.com",
    title: "Nemurium - The Future of Immersive Creation",
    description: "Build and monetize interactive 3D realms in mixed reality – no code, no limits.",
    siteName: "Nemurium",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nemurium - Immersive World Builder",
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Nemurium - The Future of Immersive Creation",
    description: "Build and monetize interactive 3D realms in mixed reality – no code, no limits.",
    creator: "@nemurium",
    images: ["/images/twitter-image.jpg"],
  },
  
  // Additional meta tags
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Nemurium",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#8b5cf6",
    "msapplication-config": "/browserconfig.xml",
  },
};

// Loading component
function GlobalLoading() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-t-transparent border-purple-500 rounded-full"></div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="theme-color" content="#8b5cf6" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="prefetch" href="/world-builder" />
        <link rel="prefetch" href="/asset-library" />
        
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        
        {/* Security headers (via meta tags for backup) */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className="bg-gray-900 text-white antialiased overflow-x-hidden">
        <Suspense fallback={<GlobalLoading />}>
          <GlobalNavigation />
          <main className="relative min-h-screen">
            {children}
          </main>
          
          {/* Enterprise Performance & Monitoring Systems */}
          <PerformanceMonitor />
          <EnterpriseOptimizer />
          <AIMonitoringSystem />
          <LegalComplianceSystem />
          
          {/* Immersive cursor */}
          <ImmersiveCursor />
        </Suspense>
        
        {/* CSRF Token (for forms) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__CSRF_TOKEN__ = '${Date.now().toString(36)}';
              window.__APP_CONFIG__ = ${JSON.stringify({
                version: '1.0.0',
                environment: process.env.NODE_ENV || 'development',
                features: {
                  ai: true,
                  vrMode: true,
                  multiplayer: false,
                  enterpriseMonitoring: true,
                  securityCompliance: true,
                  legalCompliance: true,
                }
              })};
            `,
          }}
        />
        
        {/* Advanced Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced Web Vitals monitoring
              if ('PerformanceObserver' in window) {
                // Largest Contentful Paint
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                      if (entry.startTime > 2500) {
                        console.warn('⚠️ LCP is slow:', entry.startTime + 'ms');
                      }
                    }
                    if (entry.entryType === 'first-input') {
                      const fid = entry.processingStart - entry.startTime;
                      console.log('FID:', fid);
                      if (fid > 100) {
                        console.warn('⚠️ FID is high:', fid + 'ms');
                      }
                    }
                  }
                }).observe({entryTypes: ['largest-contentful-paint', 'first-input']});

                // Cumulative Layout Shift
                let clsValue = 0;
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                      clsValue += entry.value;
                    }
                  }
                  if (clsValue > 0.1) {
                    console.warn('⚠️ CLS is high:', clsValue);
                  }
                }).observe({entryTypes: ['layout-shift']});

                // Long tasks
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    if (entry.duration > 50) {
                      console.warn('⚠️ Long task detected:', entry.duration + 'ms');
                    }
                  }
                }).observe({entryTypes: ['longtask']});
              }
              
              // Enhanced Memory monitoring
              if ('memory' in performance) {
                setInterval(() => {
                  const memory = performance.memory;
                  const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
                  
                  if (usagePercent > 80) {
                    console.warn('⚠️ High memory usage:', usagePercent.toFixed(1) + '%');
                  }
                  
                  // Auto garbage collection trigger
                  if (usagePercent > 90 && typeof window.gc === 'function') {
                    window.gc();
                    console.log('🧹 Auto garbage collection triggered');
                  }
                }, 30000);
              }

              // Security monitoring
              let rapidClicks = 0;
              let clickCount = 0;
              
              window.addEventListener('click', () => {
                clickCount++;
                setTimeout(() => {
                  if (clickCount > 20) {
                    rapidClicks++;
                    if (rapidClicks > 3) {
                      console.warn('🚨 Suspicious activity: Rapid clicking detected');
                    }
                  }
                  clickCount = 0;
                }, 1000);
              });

              // Network performance monitoring
              setInterval(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation && navigation.responseEnd - navigation.requestStart > 5000) {
                  console.warn('🌐 Slow network detected:', (navigation.responseEnd - navigation.requestStart) + 'ms');
                }
              }, 60000);

              console.log('🚀 Enterprise monitoring systems initialized');
            `,
          }}
        />
      </body>
    </html>
  );
}