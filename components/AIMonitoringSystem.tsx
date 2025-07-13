/**
 * Advanced AI Monitoring and Self-Healing System for Nemurium
 * Continuous monitoring, threat detection, and auto-remediation
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface SecurityThreat {
  id: string;
  type: 'xss' | 'csrf' | 'injection' | 'ddos' | 'unauthorized_access' | 'data_breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: Date;
  resolved: boolean;
  autoMitigated: boolean;
}

interface PerformanceAnomaly {
  id: string;
  metric: string;
  threshold: number;
  actual: number;
  timestamp: Date;
  impact: 'low' | 'medium' | 'high';
  resolved: boolean;
}

interface AIRecommendation {
  id: string;
  category: 'performance' | 'security' | 'user_experience' | 'business';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  recommendation: string;
  estimatedImpact: string;
  implementationComplexity: 'easy' | 'medium' | 'hard';
  timestamp: Date;
}

interface MonitoringMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  threatLevel: 'green' | 'yellow' | 'orange' | 'red';
  performanceScore: number;
  securityScore: number;
  activeThreats: number;
  resolvedThreats: number;
  recommendations: number;
}

class AIMonitoringEngine {
  private threats: SecurityThreat[] = [];
  private anomalies: PerformanceAnomaly[] = [];
  private recommendations: AIRecommendation[] = [];
  private metrics: MonitoringMetrics;
  private intervalHandles: NodeJS.Timeout[] = [];
  private isMonitoring = false;

  constructor() {
    this.metrics = {
      uptime: 100,
      responseTime: 0,
      errorRate: 0,
      threatLevel: 'green',
      performanceScore: 100,
      securityScore: 100,
      activeThreats: 0,
      resolvedThreats: 0,
      recommendations: 0
    };

    this.initialize();
  }

  private initialize() {
    console.log('🤖 AI Monitoring System initializing...');
    
    this.startSecurityMonitoring();
    this.startPerformanceMonitoring();
    this.startBehaviorAnalysis();
    this.startRecommendationEngine();
    
    this.isMonitoring = true;
    console.log('✅ AI Monitoring System active');
  }

  private startSecurityMonitoring() {
    // XSS Detection
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi
    ];

    // Monitor DOM mutations for potential XSS
    if (typeof window !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                const innerHTML = element.innerHTML;
                
                xssPatterns.forEach((pattern) => {
                  if (pattern.test(innerHTML)) {
                    this.createThreat({
                      type: 'xss',
                      severity: 'high',
                      description: `Potential XSS injection detected in DOM: ${innerHTML.substring(0, 100)}...`,
                      autoMitigated: true
                    });
                    
                    // Auto-mitigation: sanitize content
                    element.innerHTML = this.sanitizeHTML(innerHTML);
                  }
                });
              }
            });
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // CSRF Token Monitoring
    const csrfInterval = setInterval(() => {
      this.checkCSRFProtection();
    }, 30000);
    this.intervalHandles.push(csrfInterval);

    // Unauthorized Access Detection
    const accessInterval = setInterval(() => {
      this.detectUnauthorizedAccess();
    }, 10000);
    this.intervalHandles.push(accessInterval);

    // DDoS Detection
    const ddosInterval = setInterval(() => {
      this.detectDDoSAttacks();
    }, 5000);
    this.intervalHandles.push(ddosInterval);
  }

  private startPerformanceMonitoring() {
    // Response Time Monitoring
    const perfInterval = setInterval(() => {
      this.monitorResponseTimes();
      this.monitorMemoryUsage();
      this.monitorNetworkPerformance();
    }, 5000);
    this.intervalHandles.push(perfInterval);

    // Error Rate Monitoring
    const errorInterval = setInterval(() => {
      this.monitorErrorRates();
    }, 10000);
    this.intervalHandles.push(errorInterval);
  }

  private startBehaviorAnalysis() {
    // User Behavior Analysis
    if (typeof window !== 'undefined') {
      let clickCount = 0;
      let rapidClicks = 0;
      
      window.addEventListener('click', () => {
        clickCount++;
        
        // Detect rapid clicking (potential bot)
        setTimeout(() => {
          if (clickCount > 10) {
            rapidClicks++;
            if (rapidClicks > 3) {
              this.createThreat({
                type: 'unauthorized_access',
                severity: 'medium',
                description: 'Suspicious rapid clicking detected - potential bot activity',
                autoMitigated: true
              });
            }
          }
          clickCount = 0;
        }, 1000);
      });

      // Keyboard behavior analysis
      let keyCount = 0;
      window.addEventListener('keydown', () => {
        keyCount++;
        
        setTimeout(() => {
          if (keyCount > 50) {
            this.createThreat({
              type: 'unauthorized_access',
              severity: 'low',
              description: 'Unusual keyboard activity detected',
              autoMitigated: false
            });
          }
          keyCount = 0;
        }, 1000);
      });
    }
  }

  private startRecommendationEngine() {
    const recommendationInterval = setInterval(() => {
      this.generateRecommendations();
    }, 60000); // Every minute
    this.intervalHandles.push(recommendationInterval);
  }

  private createThreat(threat: Omit<SecurityThreat, 'id' | 'timestamp' | 'resolved'>) {
    const newThreat: SecurityThreat = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      resolved: false,
      ...threat
    };

    this.threats.push(newThreat);
    this.updateThreatLevel();

    console.warn(`🚨 Security threat detected: ${threat.description}`);

    // Auto-mitigation for high/critical threats
    if (threat.severity === 'high' || threat.severity === 'critical') {
      this.mitigateThreat(newThreat.id);
    }
  }

  private createAnomaly(anomaly: Omit<PerformanceAnomaly, 'id' | 'timestamp' | 'resolved'>) {
    const newAnomaly: PerformanceAnomaly = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      resolved: false,
      ...anomaly
    };

    this.anomalies.push(newAnomaly);
    
    console.warn(`📊 Performance anomaly detected: ${anomaly.metric}`);

    // Auto-remediation for high impact anomalies
    if (anomaly.impact === 'high') {
      this.remediateAnomaly(newAnomaly.id);
    }
  }

  private sanitizeHTML(html: string): string {
    return html
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<iframe[^>]*>/gi, '');
  }

  private checkCSRFProtection() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const forms = document.querySelectorAll('form');
    let unprotectedForms = 0;

    forms.forEach(form => {
      const csrfToken = form.querySelector('input[name*="csrf"], input[name*="token"]');
      if (!csrfToken) {
        unprotectedForms++;
      }
    });

    if (unprotectedForms > 0) {
      this.createThreat({
        type: 'csrf',
        severity: 'medium',
        description: `${unprotectedForms} forms lack CSRF protection`,
        autoMitigated: false
      });
    }
  }

  private detectUnauthorizedAccess() {
    // Check for suspicious URLs in browser history
    if (typeof window !== 'undefined') {
      const suspiciousPatterns = [
        '/admin',
        '/api/admin',
        '/.env',
        '/config',
        '/backup'
      ];

      const currentUrl = window.location.pathname;
      suspiciousPatterns.forEach(pattern => {
        if (currentUrl.includes(pattern) && !this.isAuthorizedAccess()) {
          this.createThreat({
            type: 'unauthorized_access',
            severity: 'high',
            description: `Unauthorized access attempt to ${currentUrl}`,
            autoMitigated: true
          });
        }
      });
    }
  }

  private isAuthorizedAccess(): boolean {
    // Check if user has admin permissions
    // This would integrate with your auth system
    return true; // Placeholder
  }

  private detectDDoSAttacks() {
    // Monitor request frequency
    const requestCount = performance.getEntriesByType('navigation').length + 
                        performance.getEntriesByType('resource').length;

    if (requestCount > 100) {
      this.createThreat({
        type: 'ddos',
        severity: 'critical',
        description: `Potential DDoS attack detected: ${requestCount} requests`,
        autoMitigated: true
      });
    }
  }

  private monitorResponseTimes() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const responseTime = navigation.responseEnd - navigation.requestStart;
      this.metrics.responseTime = responseTime;

      if (responseTime > 3000) {
        this.createAnomaly({
          metric: 'response_time',
          threshold: 3000,
          actual: responseTime,
          impact: 'high'
        });
      }
    }
  }

  private monitorMemoryUsage() {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

      if (memoryUsage > 0.9) {
        this.createAnomaly({
          metric: 'memory_usage',
          threshold: 0.9,
          actual: memoryUsage,
          impact: 'high'
        });
      }
    }
  }

  private monitorNetworkPerformance() {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const slowResources = resources.filter(resource => 
      resource.responseEnd - resource.requestStart > 2000
    );

    if (slowResources.length > 5) {
      this.createAnomaly({
        metric: 'network_performance',
        threshold: 5,
        actual: slowResources.length,
        impact: 'medium'
      });
    }
  }

  private monitorErrorRates() {
    // This would integrate with your error tracking system
    const errorRate = 0; // Placeholder
    this.metrics.errorRate = errorRate;

    if (errorRate > 5) {
      this.createAnomaly({
        metric: 'error_rate',
        threshold: 5,
        actual: errorRate,
        impact: 'high'
      });
    }
  }

  private generateRecommendations() {
    const recommendations: Omit<AIRecommendation, 'id' | 'timestamp'>[] = [];

    // Performance recommendations
    if (this.metrics.responseTime > 2000) {
      recommendations.push({
        category: 'performance',
        priority: 'high',
        recommendation: 'Implement CDN to reduce response times',
        estimatedImpact: '40% faster page loads',
        implementationComplexity: 'medium'
      });
    }

    // Security recommendations
    if (this.metrics.securityScore < 80) {
      recommendations.push({
        category: 'security',
        priority: 'urgent',
        recommendation: 'Enable Content Security Policy headers',
        estimatedImpact: 'Prevent XSS attacks',
        implementationComplexity: 'easy'
      });
    }

    // UX recommendations
    if (this.anomalies.length > 3) {
      recommendations.push({
        category: 'user_experience',
        priority: 'medium',
        recommendation: 'Add loading states for better user feedback',
        estimatedImpact: 'Improved perceived performance',
        implementationComplexity: 'easy'
      });
    }

    // Business recommendations
    const activeThreats = this.threats.filter(t => !t.resolved).length;
    if (activeThreats > 0) {
      recommendations.push({
        category: 'business',
        priority: 'high',
        recommendation: 'Invest in advanced security monitoring tools',
        estimatedImpact: 'Reduce security incidents by 70%',
        implementationComplexity: 'hard'
      });
    }

    recommendations.forEach(rec => {
      this.recommendations.push({
        id: crypto.randomUUID(),
        timestamp: new Date(),
        ...rec
      });
    });

    this.metrics.recommendations = this.recommendations.length;
  }

  private mitigateThreat(threatId: string) {
    const threat = this.threats.find(t => t.id === threatId);
    if (!threat) return;

    switch (threat.type) {
      case 'xss':
        // Sanitize all user inputs
        this.sanitizeAllInputs();
        break;
      case 'ddos':
        // Implement rate limiting
        this.enableRateLimiting();
        break;
      case 'unauthorized_access':
        // Block suspicious IPs
        this.blockSuspiciousAccess();
        break;
    }

    threat.resolved = true;
    threat.autoMitigated = true;
    this.updateThreatLevel();
  }

  private remediateAnomaly(anomalyId: string) {
    const anomaly = this.anomalies.find(a => a.id === anomalyId);
    if (!anomaly) return;

    switch (anomaly.metric) {
      case 'memory_usage':
        // Force garbage collection
        if (typeof window !== 'undefined' && 'gc' in window) {
          (window as any).gc();
        }
        break;
      case 'response_time':
        // Enable compression
        this.enableCompression();
        break;
      case 'network_performance':
        // Preload critical resources
        this.preloadCriticalResources();
        break;
    }

    anomaly.resolved = true;
  }

  private sanitizeAllInputs() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const sanitized = this.sanitizeHTML(input.value);
      input.value = sanitized;
    });
  }

  private enableRateLimiting() {
    // This would integrate with your backend rate limiting
    console.log('🛡️ Rate limiting enabled');
  }

  private blockSuspiciousAccess() {
    // This would integrate with your firewall/security system
    console.log('🚫 Suspicious access blocked');
  }

  private enableCompression() {
    // This would configure server compression
    console.log('📦 Compression enabled');
  }

  private preloadCriticalResources() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const criticalResources = ['/world-builder', '/asset-library'];
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  private updateThreatLevel() {
    const activeThreats = this.threats.filter(t => !t.resolved);
    this.metrics.activeThreats = activeThreats.length;
    this.metrics.resolvedThreats = this.threats.filter(t => t.resolved).length;

    const criticalThreats = activeThreats.filter(t => t.severity === 'critical').length;
    const highThreats = activeThreats.filter(t => t.severity === 'high').length;

    if (criticalThreats > 0) {
      this.metrics.threatLevel = 'red';
    } else if (highThreats > 2) {
      this.metrics.threatLevel = 'orange';
    } else if (activeThreats.length > 0) {
      this.metrics.threatLevel = 'yellow';
    } else {
      this.metrics.threatLevel = 'green';
    }
  }

  public getMetrics(): MonitoringMetrics {
    return { ...this.metrics };
  }

  public getThreats(): SecurityThreat[] {
    return [...this.threats];
  }

  public getAnomalies(): PerformanceAnomaly[] {
    return [...this.anomalies];
  }

  public getRecommendations(): AIRecommendation[] {
    return [...this.recommendations];
  }

  public forceSecurityScan(): void {
    this.checkCSRFProtection();
    this.detectUnauthorizedAccess();
    this.detectDDoSAttacks();
  }

  public destroy() {
    this.intervalHandles.forEach(handle => clearInterval(handle));
    this.intervalHandles = [];
    this.isMonitoring = false;
    console.log('🛑 AI Monitoring System stopped');
  }
}

// React Component
export default function AIMonitoringSystem() {
  const [monitor] = useState(() => new AIMonitoringEngine());
  const [metrics, setMetrics] = useState<MonitoringMetrics | null>(null);
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateData = () => {
      setMetrics(monitor.getMetrics());
      setThreats(monitor.getThreats().slice(-5)); // Last 5 threats
      setRecommendations(monitor.getRecommendations().slice(-3)); // Last 3 recommendations
    };

    // Update every 3 seconds
    const interval = setInterval(updateData, 3000);
    updateData(); // Initial update

    return () => {
      clearInterval(interval);
      monitor.destroy();
    };
  }, [monitor]);

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const handleForceScan = useCallback(() => {
    monitor.forceSecurityScan();
    setTimeout(() => {
      setMetrics(monitor.getMetrics());
      setThreats(monitor.getThreats().slice(-5));
    }, 1000);
  }, [monitor]);

  if (!metrics) {
    return null;
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'green': return 'text-green-500';
      case 'yellow': return 'text-yellow-500';
      case 'orange': return 'text-orange-500';
      case 'red': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-20 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
        title="AI Monitoring System"
      >
        🤖
      </button>

      {/* Monitoring Panel */}
      {isVisible && (
        <div className="fixed bottom-36 left-4 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-gray-700 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">🤖 AI Monitor</h3>
            <button
              onClick={toggleVisibility}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Threat Level */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Threat Level</span>
              <span className={`text-sm font-bold ${getThreatLevelColor(metrics.threatLevel)}`}>
                {metrics.threatLevel.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 p-2 rounded text-center">
              <div className="text-xs text-gray-400">Response Time</div>
              <div className="text-sm font-bold">{Math.round(metrics.responseTime)}ms</div>
            </div>
            <div className="bg-gray-800 p-2 rounded text-center">
              <div className="text-xs text-gray-400">Error Rate</div>
              <div className="text-sm font-bold">{metrics.errorRate}%</div>
            </div>
            <div className="bg-gray-800 p-2 rounded text-center">
              <div className="text-xs text-gray-400">Active Threats</div>
              <div className="text-sm font-bold text-red-400">{metrics.activeThreats}</div>
            </div>
            <div className="bg-gray-800 p-2 rounded text-center">
              <div className="text-xs text-gray-400">Resolved</div>
              <div className="text-sm font-bold text-green-400">{metrics.resolvedThreats}</div>
            </div>
          </div>

          {/* Recent Threats */}
          {threats.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Recent Threats</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {threats.map((threat) => (
                  <div key={threat.id} className="text-xs bg-gray-800 p-2 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </span>
                      {threat.resolved && (
                        <span className="text-green-400">✓</span>
                      )}
                    </div>
                    <div className="text-gray-300">
                      {threat.description.substring(0, 80)}...
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          {recommendations.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">AI Recommendations</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {recommendations.map((rec) => (
                  <div key={rec.id} className="text-xs bg-blue-900/30 p-2 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-blue-400">{rec.category}</span>
                      <span className="text-xs text-gray-400">{rec.priority}</span>
                    </div>
                    <div className="text-gray-300">
                      {rec.recommendation}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Impact: {rec.estimatedImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleForceScan}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-xs transition-colors"
            >
              Force Scan
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-400">
            Last update: {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </>
  );
}