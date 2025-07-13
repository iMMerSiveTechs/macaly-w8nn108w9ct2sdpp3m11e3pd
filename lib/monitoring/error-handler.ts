/**
 * Enterprise Error Handling and Monitoring System for Nemurium
 * Comprehensive error tracking, logging, and recovery mechanisms
 */

interface ErrorContext {
  userId?: string;
  sessionId?: string;
  route?: string;
  userAgent?: string;
  timestamp: Date;
  buildVersion?: string;
  feature?: string;
  additionalData?: Record<string, any>;
}

interface ErrorLog {
  id: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  stack?: string;
  context: ErrorContext;
  fingerprint: string;
  count: number;
  firstSeen: Date;
  lastSeen: Date;
  resolved: boolean;
  category: 'client' | 'server' | 'network' | 'security' | 'performance' | 'user';
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  context: ErrorContext;
}

interface UserFeedback {
  errorId: string;
  userId: string;
  feedback: string;
  rating: number;
  timestamp: Date;
}

class EnterpriseErrorHandler {
  private errorLogs = new Map<string, ErrorLog>();
  private performanceMetrics: PerformanceMetric[] = [];
  private userFeedback: UserFeedback[] = [];
  private errorThresholds = {
    criticalErrorsPerMinute: 10,
    warningErrorsPerMinute: 50,
    performanceThreshold: 3000,
    memoryThreshold: 100 * 1024 * 1024 // 100MB
  };

  constructor() {
    this.setupGlobalErrorHandlers();
    this.setupPerformanceMonitoring();
    this.startCleanupScheduler();
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalErrorHandlers(): void {
    if (typeof window !== 'undefined') {
      // Uncaught JavaScript errors
      window.addEventListener('error', (event) => {
        this.logError({
          message: event.message,
          stack: event.error?.stack,
          context: {
            route: window.location.pathname,
            userAgent: navigator.userAgent,
            timestamp: new Date(),
            additionalData: {
              filename: event.filename,
              lineno: event.lineno,
              colno: event.colno
            }
          }
        });
      });

      // Unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.logError({
          message: `Unhandled Promise Rejection: ${event.reason}`,
          stack: event.reason?.stack,
          context: {
            route: window.location.pathname,
            userAgent: navigator.userAgent,
            timestamp: new Date(),
            additionalData: {
              reason: event.reason,
              promise: event.promise
            }
          }
        });
      });

      // Resource loading errors
      window.addEventListener('error', (event) => {
        if (event.target !== window) {
          this.logError({
            message: `Resource loading error: ${(event.target as any)?.src || (event.target as any)?.href}`,
            context: {
              route: window.location.pathname,
              userAgent: navigator.userAgent,
              timestamp: new Date(),
              additionalData: {
                resourceType: (event.target as any)?.tagName,
                resourceUrl: (event.target as any)?.src || (event.target as any)?.href
              }
            }
          });
        }
      }, true);

      // Console error interception
      const originalConsoleError = console.error;
      console.error = (...args) => {
        this.logError({
          message: args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' '),
          context: {
            route: window.location.pathname,
            userAgent: navigator.userAgent,
            timestamp: new Date(),
            additionalData: { consoleArgs: args }
          }
        });
        originalConsoleError.apply(console, args);
      };
    }
  }

  /**
   * Setup performance monitoring
   */
  private setupPerformanceMonitoring(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Long task monitoring
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) { // Tasks longer than 50ms
              this.logPerformanceMetric({
                name: 'long-task',
                value: entry.duration,
                timestamp: new Date(),
                context: {
                  route: window.location.pathname,
                  userAgent: navigator.userAgent,
                  timestamp: new Date(),
                  additionalData: {
                    startTime: entry.startTime,
                    name: entry.name
                  }
                }
              });
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('Long task observer not supported');
      }

      // Layout shift monitoring
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ((entry as any).value > 0.1) { // Significant layout shift
              this.logPerformanceMetric({
                name: 'layout-shift',
                value: (entry as any).value,
                timestamp: new Date(),
                context: {
                  route: window.location.pathname,
                  userAgent: navigator.userAgent,
                  timestamp: new Date(),
                  additionalData: {
                    hadRecentInput: (entry as any).hadRecentInput,
                    startTime: entry.startTime
                  }
                }
              });
            }
          }
        });
        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Layout shift observer not supported');
      }

      // Memory monitoring
      if ('memory' in performance) {
        setInterval(() => {
          const memory = (performance as any).memory;
          if (memory.usedJSHeapSize > this.errorThresholds.memoryThreshold) {
            this.logPerformanceMetric({
              name: 'high-memory-usage',
              value: memory.usedJSHeapSize,
              timestamp: new Date(),
              context: {
                route: window.location.pathname,
                userAgent: navigator.userAgent,
                timestamp: new Date(),
                additionalData: {
                  totalJSHeapSize: memory.totalJSHeapSize,
                  jsHeapSizeLimit: memory.jsHeapSizeLimit
                }
              }
            });
          }
        }, 30000); // Check every 30 seconds
      }
    }
  }

  /**
   * Log an error with context
   */
  logError(error: {
    message: string;
    stack?: string;
    level?: ErrorLog['level'];
    category?: ErrorLog['category'];
    context: Partial<ErrorContext>;
  }): string {
    const fingerprint = this.generateErrorFingerprint(error.message, error.stack);
    const errorId = fingerprint;

    const existingError = this.errorLogs.get(errorId);
    const now = new Date();

    if (existingError) {
      // Update existing error
      existingError.count++;
      existingError.lastSeen = now;
    } else {
      // Create new error log
      const errorLog: ErrorLog = {
        id: errorId,
        level: error.level || 'error',
        message: error.message,
        stack: error.stack,
        context: {
          timestamp: now,
          buildVersion: this.getBuildVersion(),
          sessionId: this.getSessionId(),
          ...error.context
        },
        fingerprint,
        count: 1,
        firstSeen: now,
        lastSeen: now,
        resolved: false,
        category: error.category || this.categorizeError(error.message)
      };

      this.errorLogs.set(errorId, errorLog);
    }

    // Check for critical error thresholds
    this.checkErrorThresholds();

    // Send to external monitoring service in production
    this.sendToMonitoringService(this.errorLogs.get(errorId)!);

    return errorId;
  }

  /**
   * Log performance metric
   */
  logPerformanceMetric(metric: PerformanceMetric): void {
    this.performanceMetrics.push(metric);

    // Keep only recent metrics
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    this.performanceMetrics = this.performanceMetrics.filter(m => m.timestamp > oneHourAgo);

    // Check performance thresholds
    if (metric.value > this.errorThresholds.performanceThreshold) {
      this.logError({
        message: `Performance threshold exceeded: ${metric.name} took ${metric.value}ms`,
        level: 'warning',
        category: 'performance',
        context: metric.context
      });
    }
  }

  /**
   * Add user feedback for an error
   */
  addUserFeedback(errorId: string, userId: string, feedback: string, rating: number): void {
    this.userFeedback.push({
      errorId,
      userId,
      feedback,
      rating,
      timestamp: new Date()
    });

    // Update error resolution status based on feedback
    const error = this.errorLogs.get(errorId);
    if (error && rating >= 4) {
      error.resolved = true;
    }
  }

  /**
   * Resolve an error
   */
  resolveError(errorId: string): boolean {
    const error = this.errorLogs.get(errorId);
    if (error) {
      error.resolved = true;
      return true;
    }
    return false;
  }

  /**
   * Get error statistics
   */
  getErrorStatistics(): any {
    const errors = Array.from(this.errorLogs.values());
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return {
      total: errors.length,
      resolved: errors.filter(e => e.resolved).length,
      unresolved: errors.filter(e => !e.resolved).length,
      lastHour: errors.filter(e => e.lastSeen > oneHourAgo).length,
      last24Hours: errors.filter(e => e.lastSeen > oneDayAgo).length,
      byLevel: {
        error: errors.filter(e => e.level === 'error').length,
        warning: errors.filter(e => e.level === 'warning').length,
        info: errors.filter(e => e.level === 'info').length,
        debug: errors.filter(e => e.level === 'debug').length
      },
      byCategory: {
        client: errors.filter(e => e.category === 'client').length,
        server: errors.filter(e => e.category === 'server').length,
        network: errors.filter(e => e.category === 'network').length,
        security: errors.filter(e => e.category === 'security').length,
        performance: errors.filter(e => e.category === 'performance').length,
        user: errors.filter(e => e.category === 'user').length
      },
      topErrors: errors
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
        .map(e => ({ id: e.id, message: e.message, count: e.count }))
    };
  }

  /**
   * Get performance statistics
   */
  getPerformanceStatistics(): any {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const recentMetrics = this.performanceMetrics.filter(m => m.timestamp > oneHourAgo);

    const metricsByName = recentMetrics.reduce((acc, metric) => {
      if (!acc[metric.name]) acc[metric.name] = [];
      acc[metric.name].push(metric.value);
      return acc;
    }, {} as Record<string, number[]>);

    const stats = Object.entries(metricsByName).reduce((acc, [name, values]) => {
      acc[name] = {
        count: values.length,
        average: values.reduce((sum, val) => sum + val, 0) / values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        p95: this.percentile(values, 95),
        p99: this.percentile(values, 99)
      };
      return acc;
    }, {} as Record<string, any>);

    return {
      totalMetrics: recentMetrics.length,
      lastHour: stats,
      thresholds: this.errorThresholds
    };
  }

  /**
   * Generate error fingerprint for deduplication
   */
  private generateErrorFingerprint(message: string, stack?: string): string {
    const content = message + (stack || '');
    // Simple hash function for fingerprinting
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Categorize error based on message content
   */
  private categorizeError(message: string): ErrorLog['category'] {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('network') || lowerMessage.includes('fetch') || lowerMessage.includes('cors')) {
      return 'network';
    }
    if (lowerMessage.includes('security') || lowerMessage.includes('csrf') || lowerMessage.includes('auth')) {
      return 'security';
    }
    if (lowerMessage.includes('performance') || lowerMessage.includes('slow') || lowerMessage.includes('timeout')) {
      return 'performance';
    }
    if (lowerMessage.includes('server') || lowerMessage.includes('500') || lowerMessage.includes('api')) {
      return 'server';
    }
    if (lowerMessage.includes('user') || lowerMessage.includes('input') || lowerMessage.includes('validation')) {
      return 'user';
    }
    
    return 'client';
  }

  /**
   * Check error thresholds and trigger alerts
   */
  private checkErrorThresholds(): void {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const recentErrors = Array.from(this.errorLogs.values())
      .filter(e => e.lastSeen > oneMinuteAgo);

    const criticalErrors = recentErrors.filter(e => e.level === 'error').length;
    const warningErrors = recentErrors.filter(e => e.level === 'warning').length;

    if (criticalErrors > this.errorThresholds.criticalErrorsPerMinute) {
      this.triggerAlert('critical', `${criticalErrors} critical errors in the last minute`);
    } else if (warningErrors > this.errorThresholds.warningErrorsPerMinute) {
      this.triggerAlert('warning', `${warningErrors} warnings in the last minute`);
    }
  }

  /**
   * Trigger alert for critical issues
   */
  private triggerAlert(level: 'critical' | 'warning', message: string): void {
    console[level === 'critical' ? 'error' : 'warn'](`[ALERT] ${message}`);
    
    // In production, this would integrate with alerting services
    // like PagerDuty, Slack, email notifications, etc.
  }

  /**
   * Send error to external monitoring service
   */
  private sendToMonitoringService(error: ErrorLog): void {
    // In production, this would send to services like Sentry, Datadog, etc.
    if (process.env.NODE_ENV === 'production') {
      // Example integration point
      console.log('Sending to monitoring service:', {
        id: error.id,
        message: error.message,
        level: error.level,
        category: error.category,
        count: error.count
      });
    }
  }

  /**
   * Get build version
   */
  private getBuildVersion(): string {
    return process.env.NEXT_PUBLIC_BUILD_VERSION || '1.0.0';
  }

  /**
   * Get session ID
   */
  private getSessionId(): string {
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('nemurium-session-id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('nemurium-session-id', sessionId);
      }
      return sessionId;
    }
    return 'server';
  }

  /**
   * Calculate percentile
   */
  private percentile(arr: number[], p: number): number {
    const sorted = arr.sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[index] || 0;
  }

  /**
   * Start cleanup scheduler
   */
  private startCleanupScheduler(): void {
    // Clean up old data every hour
    setInterval(() => {
      this.cleanup();
    }, 60 * 60 * 1000);
  }

  /**
   * Cleanup old data
   */
  private cleanup(): void {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    // Remove old resolved errors
    for (const [id, error] of this.errorLogs.entries()) {
      if (error.resolved && error.lastSeen < oneWeekAgo) {
        this.errorLogs.delete(id);
      }
    }

    // Remove old performance metrics
    this.performanceMetrics = this.performanceMetrics.filter(
      m => m.timestamp > oneWeekAgo
    );

    // Remove old user feedback
    this.userFeedback = this.userFeedback.filter(
      f => f.timestamp > oneWeekAgo
    );
  }

  /**
   * Export error data for analysis
   */
  exportErrorData(): any {
    return {
      errors: Array.from(this.errorLogs.values()),
      performanceMetrics: this.performanceMetrics,
      userFeedback: this.userFeedback,
      statistics: this.getErrorStatistics(),
      performanceStats: this.getPerformanceStatistics(),
      exportDate: new Date().toISOString()
    };
  }

  /**
   * Health check
   */
  healthCheck(): { status: 'healthy' | 'degraded' | 'unhealthy'; details: any } {
    const stats = this.getErrorStatistics();
    const perfStats = this.getPerformanceStatistics();
    
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    const issues: string[] = [];

    // Check error rates
    if (stats.lastHour > 50) {
      status = 'degraded';
      issues.push(`High error rate: ${stats.lastHour} errors in last hour`);
    }
    
    if (stats.lastHour > 100) {
      status = 'unhealthy';
      issues.push(`Critical error rate: ${stats.lastHour} errors in last hour`);
    }

    // Check unresolved errors
    if (stats.unresolved > 20) {
      status = status === 'healthy' ? 'degraded' : 'unhealthy';
      issues.push(`Too many unresolved errors: ${stats.unresolved}`);
    }

    return {
      status,
      details: {
        errorStats: stats,
        performanceStats: perfStats,
        issues,
        lastCheck: new Date().toISOString()
      }
    };
  }
}

// Create singleton instance
export const errorHandler = new EnterpriseErrorHandler();

// Utility functions for error handling
export class ErrorUtils {
  /**
   * Wrap async function with error handling
   */
  static wrapAsync<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    context?: Partial<ErrorContext>
  ): (...args: T) => Promise<R> {
    return async (...args: T): Promise<R> => {
      try {
        return await fn(...args);
      } catch (error) {
        errorHandler.logError({
          message: error.message || 'Async function error',
          stack: error.stack,
          context: context || {}
        });
        throw error;
      }
    };
  }

  /**
   * Wrap regular function with error handling
   */
  static wrapSync<T extends any[], R>(
    fn: (...args: T) => R,
    context?: Partial<ErrorContext>
  ): (...args: T) => R {
    return (...args: T): R => {
      try {
        return fn(...args);
      } catch (error) {
        errorHandler.logError({
          message: error.message || 'Sync function error',
          stack: error.stack,
          context: context || {}
        });
        throw error;
      }
    };
  }

  /**
   * Safe execution with fallback
   */
  static safe<T>(
    fn: () => T,
    fallback: T,
    context?: Partial<ErrorContext>
  ): T {
    try {
      return fn();
    } catch (error) {
      errorHandler.logError({
        message: error.message || 'Safe execution error',
        stack: error.stack,
        level: 'warning',
        context: context || {}
      });
      return fallback;
    }
  }
}

export default EnterpriseErrorHandler;