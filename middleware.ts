/**
 * Simplified Middleware for Nemurium
 * Basic security and performance optimizations
 */

import { NextRequest, NextResponse } from 'next/server';

interface MiddlewareConfig {
  enableSecurity: boolean;
  enablePerformanceMonitoring: boolean;
  enableAnalytics: boolean;
  maintenanceMode: boolean;
}

const middlewareConfig: MiddlewareConfig = {
  enableSecurity: true,
  enablePerformanceMonitoring: true,
  enableAnalytics: true,
  maintenanceMode: false,
};

/**
 * Main middleware function
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const path = request.nextUrl.pathname;
  const method = request.method;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = getClientIP(request);

  try {
    // 1. Maintenance mode check
    if (middlewareConfig.maintenanceMode) {
      return createMaintenanceResponse();
    }

    // 2. Basic bot detection
    const botResult = detectBot(userAgent);
    if (botResult.isBot && !botResult.allowed) {
      return createBlockedResponse('Automated requests not allowed');
    }

    // 3. Basic rate limiting (simple implementation)
    if (await isRateLimited(ip)) {
      return createBlockedResponse('Rate limit exceeded');
    }

    // 4. Get response and add headers
    const response = NextResponse.next();
    
    // 5. Add security headers
    addSecurityHeaders(response);
    
    // 6. Add performance headers
    addPerformanceHeaders(response, startTime);

    return response;

  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

/**
 * Get client IP address with proxy support
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  return request.ip || 'unknown';
}

/**
 * Simple bot detection
 */
function detectBot(userAgent: string): { isBot: boolean; allowed: boolean } {
  const lowerUA = userAgent.toLowerCase();
  
  // Good bots (search engines)
  const goodBots = ['googlebot', 'bingbot', 'slurp', 'duckduckbot'];
  for (const bot of goodBots) {
    if (lowerUA.includes(bot)) {
      return { isBot: true, allowed: true };
    }
  }
  
  // Bad bots (scrapers)
  const badBots = ['python-requests', 'curl', 'wget', 'scrapy'];
  for (const bot of badBots) {
    if (lowerUA.includes(bot)) {
      return { isBot: true, allowed: false };
    }
  }
  
  return { isBot: false, allowed: true };
}

/**
 * Simple rate limiting (in-memory)
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

async function isRateLimited(ip: string): Promise<boolean> {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;
  
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  entry.count++;
  return entry.count > maxRequests;
}

/**
 * Add security headers
 */
function addSecurityHeaders(response: NextResponse): void {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Remove revealing headers
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');
}

/**
 * Add performance headers
 */
function addPerformanceHeaders(response: NextResponse, startTime: number): void {
  const duration = Date.now() - startTime;
  response.headers.set('Server-Timing', `total;dur=${duration}`);
  response.headers.set('X-Response-Time', `${duration}ms`);
}

/**
 * Create maintenance response
 */
function createMaintenanceResponse(): NextResponse {
  return new NextResponse(
    JSON.stringify({
      error: 'Service temporarily unavailable',
      message: 'Nemurium is currently undergoing maintenance. Please try again later.',
    }),
    {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '3600'
      }
    }
  );
}

/**
 * Create blocked response
 */
function createBlockedResponse(reason: string): NextResponse {
  return new NextResponse(
    JSON.stringify({
      error: 'Access denied',
      message: reason
    }),
    {
      status: 403,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Middleware configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default middleware;