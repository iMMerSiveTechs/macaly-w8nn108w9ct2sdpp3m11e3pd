/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Image optimization with advanced settings
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'images.pexels.com',
      'assets.macaly-user-data.dev',
      'nemurium.com',
      'cdn.nemurium.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.macaly-user-data.dev',
      }
    ]
  },
  
  // Basic Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          }
        },
      };
    }

    // Custom loaders for performance
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/models/',
            outputPath: 'static/models/',
          },
        },
      ],
    });
    
    return config;
  },
  
  // Safe experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Enhanced headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      }
    ];
  },

  // Redirects for SEO and UX
  async redirects() {
    return [
      {
        source: '/worldbuilder',
        destination: '/world-builder',
        permanent: true,
      },
      {
        source: '/assetlibrary',
        destination: '/asset-library',
        permanent: true,
      }
    ];
  },

  // Build settings
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  
  // Development settings
  devIndicators: {
    buildActivity: process.env.NODE_ENV === 'development',
    buildActivityPosition: 'bottom-right',
  },
  
  // Environment variables
  env: {
    BUILD_VERSION: process.env.BUILD_VERSION || '1.0.0',
    BUILD_TIME: new Date().toISOString(),
  },

  // Compiler options
  compiler: {
    // Remove console statements in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
    
    // React strict mode
    reactStrictMode: true,
  },

  // Advanced optimizations
  optimizeFonts: true,
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },

  // Security enhancements
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
};

module.exports = nextConfig;