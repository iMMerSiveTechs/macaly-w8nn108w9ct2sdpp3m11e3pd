/**
 * Environment Configuration for Nemurium
 * Centralized configuration management with type safety and validation
 */

import { z } from 'zod';

// Environment schema validation
const envSchema = z.object({
  // Core application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  
  // Database configuration
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  
  // Firebase configuration
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  
  // Authentication
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  JWT_SECRET: z.string().optional(),
  
  // Third-party APIs
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  GOOGLE_AI_API_KEY: z.string().optional(),
  
  // Payment processing
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // Analytics and monitoring
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  MIXPANEL_TOKEN: z.string().optional(),
  
  // Security
  CSRF_SECRET: z.string().default('nemurium-csrf-secret'),
  RATE_LIMIT_WINDOW: z.string().default('900000'), // 15 minutes
  RATE_LIMIT_MAX: z.string().default('100'),
  
  // Performance
  ENABLE_COMPRESSION: z.string().default('true'),
  ENABLE_CACHING: z.string().default('true'),
  CACHE_TTL: z.string().default('3600'), // 1 hour
  
  // Feature flags
  ENABLE_AI_FEATURES: z.string().default('true'),
  ENABLE_3D_SCANNING: z.string().default('true'),
  ENABLE_VR_MODE: z.string().default('true'),
  ENABLE_MULTIPLAYER: z.string().default('false'),
  
  // Legal compliance
  GDPR_COMPLIANCE: z.string().default('true'),
  CCPA_COMPLIANCE: z.string().default('true'),
  COPPA_COMPLIANCE: z.string().default('true'),
  
  // Build information
  BUILD_VERSION: z.string().default('1.0.0'),
  BUILD_TIME: z.string().optional(),
  GIT_COMMIT: z.string().optional(),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment configuration:');
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`);
      });
    }
    process.exit(1);
  }
};

// Validated environment variables
const env = parseEnv();

// Configuration object with defaults and computed values
export const config = {
  // Application
  app: {
    name: 'Nemurium',
    version: env.BUILD_VERSION,
    environment: env.NODE_ENV,
    port: parseInt(env.PORT),
    url: env.APP_URL,
    buildTime: env.BUILD_TIME || new Date().toISOString(),
    gitCommit: env.GIT_COMMIT,
  },

  // Database
  database: {
    url: env.DATABASE_URL,
    redis: {
      url: env.REDIS_URL,
      enabled: !!env.REDIS_URL,
    },
  },

  // Firebase
  firebase: {
    projectId: env.FIREBASE_PROJECT_ID,
    privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    enabled: !!(env.FIREBASE_PROJECT_ID && env.FIREBASE_PRIVATE_KEY && env.FIREBASE_CLIENT_EMAIL),
  },

  // Authentication
  auth: {
    url: env.NEXTAUTH_URL || env.APP_URL,
    secret: env.NEXTAUTH_SECRET || generateSecret(),
    jwtSecret: env.JWT_SECRET || generateSecret(),
  },

  // AI Services
  ai: {
    openai: {
      apiKey: env.OPENAI_API_KEY,
      enabled: !!env.OPENAI_API_KEY,
    },
    anthropic: {
      apiKey: env.ANTHROPIC_API_KEY,
      enabled: !!env.ANTHROPIC_API_KEY,
    },
    google: {
      apiKey: env.GOOGLE_AI_API_KEY,
      enabled: !!env.GOOGLE_AI_API_KEY,
    },
  },

  // Payment
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY,
    publishableKey: env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: env.STRIPE_WEBHOOK_SECRET,
    enabled: !!(env.STRIPE_SECRET_KEY && env.STRIPE_PUBLISHABLE_KEY),
  },

  // Analytics
  analytics: {
    googleAnalyticsId: env.GOOGLE_ANALYTICS_ID,
    sentryDsn: env.SENTRY_DSN,
    mixpanelToken: env.MIXPANEL_TOKEN,
    enabled: env.NODE_ENV === 'production',
  },

  // Security
  security: {
    csrfSecret: env.CSRF_SECRET,
    rateLimit: {
      windowMs: parseInt(env.RATE_LIMIT_WINDOW),
      maxRequests: parseInt(env.RATE_LIMIT_MAX),
    },
    enableSecurityHeaders: env.NODE_ENV === 'production',
    enableHttps: env.NODE_ENV === 'production',
  },

  // Performance
  performance: {
    compression: env.ENABLE_COMPRESSION === 'true',
    caching: env.ENABLE_CACHING === 'true',
    cacheTtl: parseInt(env.CACHE_TTL),
    enableOptimizations: env.NODE_ENV === 'production',
  },

  // Features
  features: {
    ai: env.ENABLE_AI_FEATURES === 'true',
    scanning3d: env.ENABLE_3D_SCANNING === 'true',
    vrMode: env.ENABLE_VR_MODE === 'true',
    multiplayer: env.ENABLE_MULTIPLAYER === 'true',
    betaFeatures: env.NODE_ENV === 'development',
  },

  // Legal
  legal: {
    gdpr: env.GDPR_COMPLIANCE === 'true',
    ccpa: env.CCPA_COMPLIANCE === 'true',
    coppa: env.COPPA_COMPLIANCE === 'true',
    requireCookieConsent: true,
    requireAgeVerification: true,
  },

  // Limits and quotas
  limits: {
    maxFileUploadSize: 50 * 1024 * 1024, // 50MB
    maxWorldObjectsPerUser: 1000,
    maxAIGenerationsPerDay: 100,
    maxRealmSize: 100 * 1024 * 1024, // 100MB
    maxUsersPerRealm: 20,
  },

  // External services
  services: {
    cdnUrl: process.env.CDN_URL || '',
    imageOptimizationService: process.env.IMAGE_OPTIMIZATION_URL || '',
    aiModelEndpoint: process.env.AI_MODEL_ENDPOINT || '',
  },

  // Development
  development: {
    enableDebugLogs: env.NODE_ENV === 'development',
    enableHotReload: env.NODE_ENV === 'development',
    enableDevTools: env.NODE_ENV === 'development',
    mockExternalServices: env.NODE_ENV === 'test',
  },
} as const;

// Type exports
export type Config = typeof config;
export type Environment = typeof env;

// Utility functions
function generateSecret(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Configuration validation
export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required for production
  if (config.app.environment === 'production') {
    if (!config.auth.secret || config.auth.secret.length < 32) {
      errors.push('NEXTAUTH_SECRET must be at least 32 characters in production');
    }

    if (!config.firebase.enabled) {
      errors.push('Firebase configuration is required in production');
    }

    if (!config.analytics.googleAnalyticsId) {
      errors.push('Google Analytics ID is recommended in production');
    }
  }

  // AI features
  if (config.features.ai && !Object.values(config.ai).some(service => service.enabled)) {
    errors.push('At least one AI service must be configured when AI features are enabled');
  }

  // Payment features
  if (!config.stripe.enabled) {
    console.warn('⚠️ Stripe is not configured - payment features will be disabled');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Configuration info for debugging
export function getConfigInfo(): any {
  return {
    environment: config.app.environment,
    version: config.app.version,
    features: {
      ai: config.features.ai,
      firebase: config.firebase.enabled,
      stripe: config.stripe.enabled,
      analytics: config.analytics.enabled,
    },
    limits: config.limits,
    buildTime: config.app.buildTime,
  };
}

// Feature flag checker
export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature];
}

// Environment checker
export function isDevelopment(): boolean {
  return config.app.environment === 'development';
}

export function isProduction(): boolean {
  return config.app.environment === 'production';
}

export function isTest(): boolean {
  return config.app.environment === 'test';
}

// Service availability checker
export function isServiceAvailable(service: string): boolean {
  switch (service) {
    case 'firebase':
      return config.firebase.enabled;
    case 'stripe':
      return config.stripe.enabled;
    case 'openai':
      return config.ai.openai.enabled;
    case 'anthropic':
      return config.ai.anthropic.enabled;
    case 'analytics':
      return config.analytics.enabled;
    default:
      return false;
  }
}

// Validate configuration on import
const validation = validateConfig();
if (!validation.valid) {
  console.error('❌ Configuration validation failed:');
  validation.errors.forEach(error => console.error(`  ${error}`));
  
  if (isProduction()) {
    process.exit(1);
  }
}

// Log configuration info in development
if (isDevelopment()) {
  console.log('🔧 Configuration loaded:', getConfigInfo());
}

export default config;