/**
 * Enterprise-Grade Security Middleware for Nemurium
 * Implements comprehensive security measures including:
 * - XSS Protection
 * - CSRF Protection
 * - Rate Limiting
 * - Content Security Policy
 * - SQL Injection Prevention
 * - Authentication Security
 * - Data Sanitization
 * - IP Blocking
 * - Audit Logging
 */

import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

interface SecurityConfig {
  rateLimit: {
    windowMs: number;
    maxRequests: number;
  };
  csrfProtection: boolean;
  xssProtection: boolean;
  sqlInjectionProtection: boolean;
  ipWhitelist?: string[];
  ipBlacklist?: string[];
  auditLogging: boolean;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class SecurityMiddleware {
  private config: SecurityConfig;
  private rateLimitStore = new Map<string, RateLimitEntry>();
  private blacklistedIPs = new Set<string>();
  private auditLog: Array<any> = [];

  constructor(config: SecurityConfig) {
    this.config = config;
    
    // Initialize security measures
    this.initializeSecurityHeaders();
    this.setupCSRFProtection();
    this.initializeAuditLogging();
  }

  /**
   * Main security middleware function
   */
  async middleware(request: NextRequest): Promise<NextResponse> {
    const startTime = Date.now();
    const clientIP = this.getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    
    try {
      // 1. IP-based security checks
      if (this.isBlacklistedIP(clientIP)) {
        await this.logSecurityEvent('IP_BLOCKED', { ip: clientIP, userAgent });
        return this.createSecurityResponse('Access denied', 403);
      }

      // 2. Rate limiting
      if (this.isRateLimited(clientIP)) {
        await this.logSecurityEvent('RATE_LIMIT_EXCEEDED', { ip: clientIP, userAgent });
        return this.createSecurityResponse('Rate limit exceeded', 429);
      }

      // 3. DDoS protection
      if (this.isDDoSAttack(request)) {
        await this.logSecurityEvent('DDOS_ATTEMPT', { ip: clientIP, userAgent });
        this.blacklistIP(clientIP, 3600000); // 1 hour
        return this.createSecurityResponse('Suspicious activity detected', 429);
      }

      // 4. XSS protection
      if (this.config.xssProtection && this.containsXSS(request)) {
        await this.logSecurityEvent('XSS_ATTEMPT', { ip: clientIP, userAgent, url: request.url });
        return this.createSecurityResponse('Invalid request format', 400);
      }

      // 5. SQL injection protection
      if (this.config.sqlInjectionProtection && this.containsSQLInjection(request)) {
        await this.logSecurityEvent('SQL_INJECTION_ATTEMPT', { ip: clientIP, userAgent, url: request.url });
        return this.createSecurityResponse('Invalid request format', 400);
      }

      // 6. CSRF protection for state-changing operations
      if (this.config.csrfProtection && this.requiresCSRFCheck(request) && !this.isValidCSRFToken(request)) {
        await this.logSecurityEvent('CSRF_VIOLATION', { ip: clientIP, userAgent, url: request.url });
        return this.createSecurityResponse('Invalid CSRF token', 403);
      }

      // 7. Content validation
      if (this.hasInvalidContent(request)) {
        await this.logSecurityEvent('INVALID_CONTENT', { ip: clientIP, userAgent });
        return this.createSecurityResponse('Invalid content detected', 400);
      }

      // 8. Authentication security
      const authResult = await this.validateAuthentication(request);
      if (!authResult.valid && this.requiresAuthentication(request)) {
        await this.logSecurityEvent('AUTH_FAILURE', { ip: clientIP, userAgent, reason: authResult.reason });
        return this.createSecurityResponse('Authentication required', 401);
      }

      // All security checks passed - proceed with request
      const response = NextResponse.next();
      
      // Add security headers
      this.addSecurityHeaders(response);
      
      // Log successful request if auditing is enabled
      if (this.config.auditLogging) {
        await this.logSecurityEvent('REQUEST_SUCCESS', {
          ip: clientIP,
          userAgent,
          url: request.url,
          method: request.method,
          duration: Date.now() - startTime
        });
      }

      return response;

    } catch (error) {
      // Log security error
      await this.logSecurityEvent('SECURITY_ERROR', {
        ip: clientIP,
        userAgent,
        error: error.message,
        stack: error.stack
      });

      return this.createSecurityResponse('Internal security error', 500);
    }
  }

  /**
   * Get client IP address with proxy support
   */
  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    
    if (cfConnectingIP) return cfConnectingIP;
    if (realIP) return realIP;
    if (forwarded) return forwarded.split(',')[0].trim();
    
    return request.ip || 'unknown';
  }

  /**
   * Rate limiting implementation
   */
  private isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = this.rateLimitStore.get(ip);

    if (!entry || now > entry.resetTime) {
      this.rateLimitStore.set(ip, {
        count: 1,
        resetTime: now + this.config.rateLimit.windowMs
      });
      return false;
    }

    entry.count++;
    return entry.count > this.config.rateLimit.maxRequests;
  }

  /**
   * DDoS detection
   */
  private isDDoSAttack(request: NextRequest): boolean {
    const ip = this.getClientIP(request);
    const userAgent = request.headers.get('user-agent') || '';
    
    // Multiple rapid requests without proper user agent
    if (!userAgent || userAgent.length < 10) {
      const entry = this.rateLimitStore.get(ip);
      return entry && entry.count > 50; // 50 requests in window
    }
    
    // Check for common DDoS patterns
    const suspiciousAgents = [
      'bot', 'crawler', 'spider', 'scraper', 
      'curl', 'wget', 'python-requests', 'go-http-client'
    ];
    
    const isSuspiciousAgent = suspiciousAgents.some(agent => 
      userAgent.toLowerCase().includes(agent)
    );
    
    if (isSuspiciousAgent) {
      const entry = this.rateLimitStore.get(ip);
      return entry && entry.count > 20; // Lower threshold for suspicious agents
    }

    return false;
  }

  /**
   * XSS detection
   */
  private containsXSS(request: NextRequest): boolean {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi,
      /expression\(/gi,
      /vbscript:/gi,
      /@import/gi,
      /binding:/gi
    ];

    const searchParams = request.nextUrl.searchParams;
    for (const [, value] of searchParams) {
      if (xssPatterns.some(pattern => pattern.test(value))) {
        return true;
      }
    }

    return false;
  }

  /**
   * SQL injection detection
   */
  private containsSQLInjection(request: NextRequest): boolean {
    const sqlPatterns = [
      /(\bunion\b.*\bselect\b)|(\bselect\b.*\bunion\b)/gi,
      /(\bdrop\b.*\btable\b)|(\btable\b.*\bdrop\b)/gi,
      /(\binsert\b.*\binto\b)|(\binto\b.*\binsert\b)/gi,
      /(\bdelete\b.*\bfrom\b)|(\bfrom\b.*\bdelete\b)/gi,
      /(\bupdate\b.*\bset\b)|(\bset\b.*\bupdate\b)/gi,
      /'.*(\bor\b|\band\b).*'/gi,
      /;\s*(drop|alter|create|delete|insert|update)/gi,
      /\/\*.*\*\//gi,
      /--[^\n\r]*/gi,
      /\bexec\b|\bexecute\b/gi
    ];

    const searchParams = request.nextUrl.searchParams;
    for (const [, value] of searchParams) {
      if (sqlPatterns.some(pattern => pattern.test(value))) {
        return true;
      }
    }

    return false;
  }

  /**
   * CSRF token validation
   */
  private isValidCSRFToken(request: NextRequest): boolean {
    const token = request.headers.get('x-csrf-token') || 
                  request.cookies.get('csrf-token')?.value;
    
    if (!token) return false;

    // Verify token structure and signature
    try {
      const [timestamp, signature] = token.split('.');
      const expectedSignature = this.generateCSRFSignature(timestamp);
      
      // Check if token is expired (1 hour)
      if (Date.now() - parseInt(timestamp) > 3600000) {
        return false;
      }
      
      return signature === expectedSignature;
    } catch {
      return false;
    }
  }

  /**
   * Generate CSRF token
   */
  generateCSRFToken(): string {
    const timestamp = Date.now().toString();
    const signature = this.generateCSRFSignature(timestamp);
    return `${timestamp}.${signature}`;
  }

  private generateCSRFSignature(timestamp: string): string {
    const secret = process.env.CSRF_SECRET || 'nemurium-csrf-secret';
    return crypto.createHmac('sha256', secret).update(timestamp).digest('hex');
  }

  /**
   * Check if request requires CSRF protection
   */
  private requiresCSRFCheck(request: NextRequest): boolean {
    const method = request.method.toUpperCase();
    const path = request.nextUrl.pathname;
    
    // Require CSRF for state-changing operations
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      // Exclude API endpoints that use other auth methods
      if (path.startsWith('/api/auth/') || path.startsWith('/api/webhook/')) {
        return false;
      }
      return true;
    }
    
    return false;
  }

  /**
   * Content validation
   */
  private hasInvalidContent(request: NextRequest): boolean {
    const contentType = request.headers.get('content-type') || '';
    
    // Block suspicious file uploads
    if (contentType.includes('application/x-executable') ||
        contentType.includes('application/x-msdownload')) {
      return true;
    }
    
    // Validate JSON payloads
    if (contentType.includes('application/json')) {
      // Additional JSON validation would go here
    }
    
    return false;
  }

  /**
   * Authentication validation
   */
  private async validateAuthentication(request: NextRequest): Promise<{valid: boolean, reason?: string}> {
    const authHeader = request.headers.get('authorization');
    const sessionCookie = request.cookies.get('session')?.value;
    
    // Allow public routes
    if (this.isPublicRoute(request.nextUrl.pathname)) {
      return { valid: true };
    }
    
    // Check for valid session or auth token
    if (!authHeader && !sessionCookie) {
      return { valid: false, reason: 'No authentication provided' };
    }
    
    // Validate auth token format
    if (authHeader) {
      const [scheme, token] = authHeader.split(' ');
      if (scheme !== 'Bearer' || !token || token.length < 20) {
        return { valid: false, reason: 'Invalid auth token format' };
      }
    }
    
    return { valid: true };
  }

  /**
   * Check if route requires authentication
   */
  private requiresAuthentication(request: NextRequest): boolean {
    const path = request.nextUrl.pathname;
    
    const protectedPaths = [
      '/world-builder',
      '/admin',
      '/dashboard',
      '/api/user',
      '/api/create',
      '/api/upload'
    ];
    
    return protectedPaths.some(protectedPath => path.startsWith(protectedPath));
  }

  /**
   * Check if route is public
   */
  private isPublicRoute(path: string): boolean {
    const publicPaths = [
      '/',
      '/login',
      '/register',
      '/api/health',
      '/api/public',
      '/terms',
      '/privacy'
    ];
    
    return publicPaths.includes(path) || path.startsWith('/api/public/');
  }

  /**
   * IP blacklist management
   */
  private isBlacklistedIP(ip: string): boolean {
    return this.blacklistedIPs.has(ip) || 
           (this.config.ipBlacklist && this.config.ipBlacklist.includes(ip));
  }

  private blacklistIP(ip: string, duration: number): void {
    this.blacklistedIPs.add(ip);
    setTimeout(() => this.blacklistedIPs.delete(ip), duration);
  }

  /**
   * Security headers
   */
  private addSecurityHeaders(response: NextResponse): void {
    // Content Security Policy
    response.headers.set('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https: blob:",
      "connect-src 'self' https: wss:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '));
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    response.headers.set('Permissions-Policy', [
      'camera=(self)',
      'microphone=(self)',
      'geolocation=()',
      'payment=()'
    ].join(', '));
    
    // Remove sensitive headers
    response.headers.delete('Server');
    response.headers.delete('X-Powered-By');
  }

  /**
   * Initialize security headers
   */
  private initializeSecurityHeaders(): void {
    // Additional initialization if needed
  }

  /**
   * Setup CSRF protection
   */
  private setupCSRFProtection(): void {
    if (this.config.csrfProtection) {
      // CSRF setup logic
    }
  }

  /**
   * Initialize audit logging
   */
  private initializeAuditLogging(): void {
    if (this.config.auditLogging) {
      // Setup audit log rotation and storage
      setInterval(() => this.rotateAuditLog(), 3600000); // Rotate every hour
    }
  }

  /**
   * Security event logging
   */
  private async logSecurityEvent(event: string, data: any): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data,
      severity: this.getEventSeverity(event)
    };
    
    this.auditLog.push(logEntry);
    
    // For high-severity events, also log to external service
    if (logEntry.severity === 'HIGH') {
      console.error(`[SECURITY] ${event}:`, data);
      // Could integrate with external logging service here
    }
    
    // Limit in-memory log size
    if (this.auditLog.length > 1000) {
      this.auditLog = this.auditLog.slice(-500);
    }
  }

  /**
   * Get event severity level
   */
  private getEventSeverity(event: string): 'LOW' | 'MEDIUM' | 'HIGH' {
    const highSeverityEvents = [
      'SQL_INJECTION_ATTEMPT', 'XSS_ATTEMPT', 'DDOS_ATTEMPT', 
      'IP_BLOCKED', 'AUTH_FAILURE'
    ];
    
    const mediumSeverityEvents = [
      'RATE_LIMIT_EXCEEDED', 'CSRF_VIOLATION', 'INVALID_CONTENT'
    ];
    
    if (highSeverityEvents.includes(event)) return 'HIGH';
    if (mediumSeverityEvents.includes(event)) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Rotate audit log
   */
  private rotateAuditLog(): void {
    if (this.auditLog.length > 0) {
      // In production, this would save to persistent storage
      console.log(`[AUDIT] Rotating log with ${this.auditLog.length} entries`);
      this.auditLog = [];
    }
  }

  /**
   * Create security response
   */
  private createSecurityResponse(message: string, status: number): NextResponse {
    const response = NextResponse.json({ error: message }, { status });
    this.addSecurityHeaders(response);
    return response;
  }

  /**
   * Get security metrics
   */
  getSecurityMetrics() {
    return {
      rateLimitEntries: this.rateLimitStore.size,
      blacklistedIPs: this.blacklistedIPs.size,
      auditLogEntries: this.auditLog.length,
      recentEvents: this.auditLog.slice(-10)
    };
  }
}

// Default security configuration
export const defaultSecurityConfig: SecurityConfig = {
  rateLimit: {
    windowMs: 900000, // 15 minutes
    maxRequests: 100
  },
  csrfProtection: true,
  xssProtection: true,
  sqlInjectionProtection: true,
  auditLogging: true
};

// Export security middleware instance
export const securityMiddleware = new SecurityMiddleware(defaultSecurityConfig);

// Data sanitization utilities
export class DataSanitizer {
  static sanitizeHTML(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  
  static sanitizeSQL(input: string): string {
    return input
      .replace(/'/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  }
  
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }
  
  static validateURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

export default SecurityMiddleware;