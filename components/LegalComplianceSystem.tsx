/**
 * Enterprise Legal Compliance System for Nemurium
 * GDPR, CCPA, COPPA, DMCA, ADA compliance with automated monitoring
 */

'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface ComplianceStatus {
  gdpr: {
    consentCollected: boolean;
    dataProcessingLogged: boolean;
    rightToBeRespected: boolean;
    score: number;
  };
  ccpa: {
    doNotSellRespected: boolean;
    dataTransparency: boolean;
    userRights: boolean;
    score: number;
  };
  coppa: {
    ageVerification: boolean;
    parentalConsent: boolean;
    dataMinimization: boolean;
    score: number;
  };
  ada: {
    keyboardNavigation: boolean;
    screenReaderSupport: boolean;
    colorContrast: boolean;
    score: number;
  };
  dmca: {
    takedownProcess: boolean;
    noticeAndTakedown: boolean;
    counterNoticeProcess: boolean;
    score: number;
  };
}

interface ComplianceIssue {
  id: string;
  type: 'gdpr' | 'ccpa' | 'coppa' | 'ada' | 'dmca';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  remedy: string;
  deadline?: Date;
  resolved: boolean;
  timestamp: Date;
}

interface DataProcessingRecord {
  id: string;
  userId?: string;
  dataType: string;
  purpose: string;
  legalBasis: string;
  timestamp: Date;
  retention: number; // days
}

class LegalComplianceEngine {
  private complianceStatus: ComplianceStatus;
  private issues: ComplianceIssue[] = [];
  private dataProcessingRecords: DataProcessingRecord[] = [];
  private intervalHandles: NodeJS.Timeout[] = [];
  private isMonitoring = false;

  constructor() {
    this.complianceStatus = {
      gdpr: {
        consentCollected: false,
        dataProcessingLogged: false,
        rightToBeRespected: false,
        score: 0
      },
      ccpa: {
        doNotSellRespected: false,
        dataTransparency: false,
        userRights: false,
        score: 0
      },
      coppa: {
        ageVerification: false,
        parentalConsent: false,
        dataMinimization: false,
        score: 0
      },
      ada: {
        keyboardNavigation: false,
        screenReaderSupport: false,
        colorContrast: false,
        score: 0
      },
      dmca: {
        takedownProcess: false,
        noticeAndTakedown: false,
        counterNoticeProcess: false,
        score: 0
      }
    };

    this.initialize();
  }

  private initialize() {
    console.log('⚖️ Legal Compliance System initializing...');
    
    this.startGDPRMonitoring();
    this.startCCPAMonitoring();
    this.startCOPPAMonitoring();
    this.startADAMonitoring();
    this.startDMCAMonitoring();
    
    this.isMonitoring = true;
    console.log('✅ Legal Compliance System active');
  }

  private startGDPRMonitoring() {
    // Check for GDPR compliance
    const gdprInterval = setInterval(() => {
      this.auditGDPRCompliance();
    }, 30000);
    this.intervalHandles.push(gdprInterval);

    // Monitor data processing activities
    this.setupDataProcessingMonitoring();
    
    // Check for consent banners
    this.checkConsentMechanisms();
  }

  private startCCPAMonitoring() {
    const ccpaInterval = setInterval(() => {
      this.auditCCPACompliance();
    }, 45000);
    this.intervalHandles.push(ccpaInterval);
  }

  private startCOPPAMonitoring() {
    const coppaInterval = setInterval(() => {
      this.auditCOPPACompliance();
    }, 60000);
    this.intervalHandles.push(coppaInterval);
  }

  private startADAMonitoring() {
    const adaInterval = setInterval(() => {
      this.auditADACompliance();
    }, 20000);
    this.intervalHandles.push(adaInterval);
  }

  private startDMCAMonitoring() {
    const dmcaInterval = setInterval(() => {
      this.auditDMCACompliance();
    }, 300000); // Every 5 minutes
    this.intervalHandles.push(dmcaInterval);
  }

  private async auditGDPRCompliance() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let score = 0;
    const issues: string[] = [];

    // Check for cookie consent
    const cookieConsent = localStorage.getItem('cookie-consent') || 
                         sessionStorage.getItem('cookie-consent') ||
                         document.cookie.includes('cookie-consent');
    
    if (cookieConsent) {
      this.complianceStatus.gdpr.consentCollected = true;
      score += 30;
    } else {
      issues.push('Cookie consent not detected');
      this.createIssue({
        type: 'gdpr',
        severity: 'high',
        description: 'GDPR cookie consent banner not implemented',
        remedy: 'Implement cookie consent banner with granular options'
      });
    }

    // Check for privacy policy
    const privacyLink = document.querySelector('a[href*="privacy"]');
    if (privacyLink) {
      score += 25;
    } else {
      issues.push('Privacy policy link not found');
      this.createIssue({
        type: 'gdpr',
        severity: 'critical',
        description: 'Privacy policy link not found on page',
        remedy: 'Add prominent privacy policy link in footer'
      });
    }

    // Check data processing logging
    if (this.dataProcessingRecords.length > 0) {
      this.complianceStatus.gdpr.dataProcessingLogged = true;
      score += 25;
    } else {
      issues.push('No data processing activities logged');
    }

    // Check for user rights implementation
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    
    const dataRequestLink = document.querySelector('a[href*="data-request"], a[href*="download"], [data-gdpr-rights]');
    if (dataRequestLink) {
      this.complianceStatus.gdpr.rightToBeRespected = true;
      score += 20;
    } else {
      this.createIssue({
        type: 'gdpr',
        severity: 'medium',
        description: 'User data rights mechanisms not implemented',
        remedy: 'Add data download and deletion request functionality'
      });
    }

    this.complianceStatus.gdpr.score = score;
  }

  private auditCCPACompliance() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let score = 0;

    // Check for "Do Not Sell" option
    const doNotSellLink = document.querySelector('a[href*="do-not-sell"], [data-ccpa-optout]');
    if (doNotSellLink) {
      this.complianceStatus.ccpa.doNotSellRespected = true;
      score += 40;
    } else {
      this.createIssue({
        type: 'ccpa',
        severity: 'high',
        description: 'CCPA "Do Not Sell My Info" link missing',
        remedy: 'Add "Do Not Sell My Personal Information" link'
      });
    }

    // Check for data transparency
    const dataUsageInfo = document.querySelector('[data-ccpa-info], .data-usage-info');
    if (dataUsageInfo) {
      this.complianceStatus.ccpa.dataTransparency = true;
      score += 30;
    } else {
      this.createIssue({
        type: 'ccpa',
        severity: 'medium',
        description: 'Data usage transparency information missing',
        remedy: 'Add clear information about data collection and usage'
      });
    }

    // Check for user rights information
    const rightsInfo = document.querySelector('[data-ccpa-rights]');
    if (rightsInfo) {
      this.complianceStatus.ccpa.userRights = true;
      score += 30;
    }

    this.complianceStatus.ccpa.score = score;
  }

  private auditCOPPACompliance() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    let score = 0;

    // Check for age verification
    const ageVerification = document.querySelector('[data-age-verify], .age-verification') ||
                          localStorage.getItem('age-verified');
    
    if (ageVerification) {
      this.complianceStatus.coppa.ageVerification = true;
      score += 40;
    } else {
      this.createIssue({
        type: 'coppa',
        severity: 'critical',
        description: 'Age verification mechanism not implemented',
        remedy: 'Add age verification gate for users under 13'
      });
    }

    // Check for parental consent mechanisms
    const parentalConsent = document.querySelector('[data-parental-consent]');
    if (parentalConsent) {
      this.complianceStatus.coppa.parentalConsent = true;
      score += 30;
    } else {
      this.createIssue({
        type: 'coppa',
        severity: 'high',
        description: 'Parental consent mechanism not found',
        remedy: 'Implement parental consent system for minors'
      });
    }

    // Check for data minimization practices
    const forms = document.querySelectorAll('form');
    let hasMinimization = true;
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input[required]');
      if (inputs.length > 5) { // Arbitrary threshold for data minimization
        hasMinimization = false;
      }
    });

    if (hasMinimization) {
      this.complianceStatus.coppa.dataMinimization = true;
      score += 30;
    }

    this.complianceStatus.coppa.score = score;
  }

  private auditADACompliance() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let score = 0;

    // Check keyboard navigation
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    let keyboardAccessible = true;
    focusableElements.forEach(el => {
      const tabIndex = el.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) < 0 && el.getAttribute('tabindex') !== '-1') {
        keyboardAccessible = false;
      }
    });

    if (keyboardAccessible && focusableElements.length > 0) {
      this.complianceStatus.ada.keyboardNavigation = true;
      score += 35;
    } else {
      this.createIssue({
        type: 'ada',
        severity: 'high',
        description: 'Keyboard navigation issues detected',
        remedy: 'Ensure all interactive elements are keyboard accessible'
      });
    }

    // Check for screen reader support
    const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
    const images = document.querySelectorAll('img');
    const imagesWithAlt = document.querySelectorAll('img[alt]');
    
    if (ariaElements.length > 0 && imagesWithAlt.length === images.length) {
      this.complianceStatus.ada.screenReaderSupport = true;
      score += 35;
    } else {
      this.createIssue({
        type: 'ada',
        severity: 'medium',
        description: 'Screen reader support incomplete',
        remedy: 'Add ARIA labels and alt text to all images'
      });
    }

    // Check color contrast (simplified)
    const colorContrastIssues = this.checkColorContrast();
    if (colorContrastIssues === 0) {
      this.complianceStatus.ada.colorContrast = true;
      score += 30;
    } else {
      this.createIssue({
        type: 'ada',
        severity: 'medium',
        description: `${colorContrastIssues} potential color contrast issues`,
        remedy: 'Ensure 4.5:1 contrast ratio for normal text, 3:1 for large text'
      });
    }

    this.complianceStatus.ada.score = score;
  }

  private auditDMCACompliance() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let score = 0;

    // Check for DMCA policy
    const dmcaLink = document.querySelector('a[href*="dmca"], a[href*="copyright"]');
    if (dmcaLink) {
      this.complianceStatus.dmca.takedownProcess = true;
      score += 40;
    } else {
      this.createIssue({
        type: 'dmca',
        severity: 'high',
        description: 'DMCA policy and takedown process not documented',
        remedy: 'Add DMCA policy page with takedown procedure'
      });
    }

    // Check for copyright reporting mechanism
    const reportLink = document.querySelector('[data-copyright-report], a[href*="report"]');
    if (reportLink) {
      this.complianceStatus.dmca.noticeAndTakedown = true;
      score += 30;
    }

    // Check for counter-notice process
    const counterNoticeInfo = document.querySelector('[data-counter-notice]');
    if (counterNoticeInfo) {
      this.complianceStatus.dmca.counterNoticeProcess = true;
      score += 30;
    }

    this.complianceStatus.dmca.score = score;
  }

  private checkColorContrast(): number {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return 0;
    }

    // Simplified color contrast check
    let issues = 0;
    const elements = document.querySelectorAll('*');
    
    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simple heuristic - would use proper contrast calculation in production
      if (color && backgroundColor && 
          color !== 'rgba(0, 0, 0, 0)' && 
          backgroundColor !== 'rgba(0, 0, 0, 0)') {
        // Simplified check - real implementation would calculate luminance
        if (color === backgroundColor || 
            (color.includes('255') && backgroundColor.includes('255'))) {
          issues++;
        }
      }
    });

    return issues;
  }

  private setupDataProcessingMonitoring() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    // Monitor form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        this.logDataProcessing({
          dataType: 'form_submission',
          purpose: 'user_interaction',
          legalBasis: 'consent',
          retention: 365
        });
      });
    });

    // Monitor local storage usage
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      this.logDataProcessing({
        dataType: 'local_storage',
        purpose: 'user_preferences',
        legalBasis: 'legitimate_interest',
        retention: 30
      });
      originalSetItem.apply(this, arguments as any);
    }.bind(this);
  }

  private checkConsentMechanisms() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return { hasConsentBanner: false, hasOptOut: false };
    }

    // Look for common consent banner patterns
    const consentElements = document.querySelectorAll(
      '.cookie-banner, .consent-banner, [data-consent], #cookie-consent'
    );

    if (consentElements.length === 0) {
      this.createIssue({
        type: 'gdpr',
        severity: 'critical',
        description: 'No consent mechanism detected',
        remedy: 'Implement GDPR-compliant cookie consent banner'
      });
    }
  }

  private logDataProcessing(record: Omit<DataProcessingRecord, 'id' | 'timestamp'>) {
    const dataRecord: DataProcessingRecord = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      ...record
    };

    this.dataProcessingRecords.push(dataRecord);

    // Clean up old records (data retention)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 2555); // 7 years
    
    this.dataProcessingRecords = this.dataProcessingRecords.filter(
      record => record.timestamp > cutoffDate
    );
  }

  private createIssue(issue: Omit<ComplianceIssue, 'id' | 'timestamp' | 'resolved'>) {
    // Check if similar issue already exists
    const existingIssue = this.issues.find(i => 
      i.type === issue.type && 
      i.description === issue.description && 
      !i.resolved
    );

    if (existingIssue) {
      return; // Don't create duplicate issues
    }

    const newIssue: ComplianceIssue = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      resolved: false,
      ...issue
    };

    // Set deadline based on severity
    if (issue.severity === 'critical') {
      newIssue.deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    } else if (issue.severity === 'high') {
      newIssue.deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    }

    this.issues.push(newIssue);
    console.warn(`⚖️ Compliance issue: ${issue.description}`);
  }

  public getComplianceStatus(): ComplianceStatus {
    return { ...this.complianceStatus };
  }

  public getIssues(): ComplianceIssue[] {
    return [...this.issues];
  }

  public getDataProcessingRecords(): DataProcessingRecord[] {
    return [...this.dataProcessingRecords];
  }

  public resolveIssue(issueId: string): void {
    const issue = this.issues.find(i => i.id === issueId);
    if (issue) {
      issue.resolved = true;
    }
  }

  public forceAudit(): void {
    this.auditGDPRCompliance();
    this.auditCCPACompliance();
    this.auditCOPPACompliance();
    this.auditADACompliance();
    this.auditDMCACompliance();
  }

  public getOverallComplianceScore(): number {
    const scores = Object.values(this.complianceStatus).map(status => status.score);
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  public destroy() {
    this.intervalHandles.forEach(handle => clearInterval(handle));
    this.intervalHandles = [];
    this.isMonitoring = false;
    console.log('🛑 Legal Compliance System stopped');
  }
}

// React Component
export default function LegalComplianceSystem() {
  const [compliance] = useState(() => new LegalComplianceEngine());
  const [status, setStatus] = useState<ComplianceStatus | null>(null);
  const [issues, setIssues] = useState<ComplianceIssue[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateData = () => {
      setStatus(compliance.getComplianceStatus());
      setIssues(compliance.getIssues().slice(-5)); // Last 5 issues
      setOverallScore(compliance.getOverallComplianceScore());
    };

    // Update every 10 seconds
    const interval = setInterval(updateData, 10000);
    updateData(); // Initial update

    return () => {
      clearInterval(interval);
      compliance.destroy();
    };
  }, [compliance]);

  const toggleVisibility = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const handleForceAudit = useCallback(() => {
    compliance.forceAudit();
    setTimeout(() => {
      setStatus(compliance.getComplianceStatus());
      setIssues(compliance.getIssues().slice(-5));
      setOverallScore(compliance.getOverallComplianceScore());
    }, 1000);
  }, [compliance]);

  const handleResolveIssue = useCallback((issueId: string) => {
    compliance.resolveIssue(issueId);
    setIssues(compliance.getIssues().slice(-5));
  }, [compliance]);

  if (!status) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-400 bg-blue-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'critical': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleVisibility}
        className="fixed bottom-36 left-4 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
        title="Legal Compliance"
      >
        ⚖️
      </button>

      {/* Compliance Panel */}
      {isVisible && (
        <div className="fixed bottom-52 left-4 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-gray-700 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">⚖️ Legal Compliance</h3>
            <button
              onClick={toggleVisibility}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Overall Score */}
          <div className="mb-4 text-center">
            <div className="text-2xl font-bold mb-1">
              <span className={getScoreColor(overallScore)}>
                {Math.round(overallScore)}%
              </span>
            </div>
            <div className="text-sm text-gray-400">Overall Compliance Score</div>
          </div>

          {/* Compliance Areas */}
          <div className="grid grid-cols-1 gap-2 mb-4">
            <div className="bg-gray-800 p-2 rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm">GDPR</span>
                <span className={`text-sm font-bold ${getScoreColor(status.gdpr.score)}`}>
                  {status.gdpr.score}%
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {status.gdpr.consentCollected ? '✓' : '✗'} Consent • 
                {status.gdpr.dataProcessingLogged ? '✓' : '✗'} Logging • 
                {status.gdpr.rightToBeRespected ? '✓' : '✗'} Rights
              </div>
            </div>

            <div className="bg-gray-800 p-2 rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm">CCPA</span>
                <span className={`text-sm font-bold ${getScoreColor(status.ccpa.score)}`}>
                  {status.ccpa.score}%
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {status.ccpa.doNotSellRespected ? '✓' : '✗'} Do Not Sell • 
                {status.ccpa.dataTransparency ? '✓' : '✗'} Transparency
              </div>
            </div>

            <div className="bg-gray-800 p-2 rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm">ADA</span>
                <span className={`text-sm font-bold ${getScoreColor(status.ada.score)}`}>
                  {status.ada.score}%
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {status.ada.keyboardNavigation ? '✓' : '✗'} Keyboard • 
                {status.ada.colorContrast ? '✓' : '✗'} Contrast
              </div>
            </div>
          </div>

          {/* Recent Issues */}
          {issues.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Compliance Issues</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {issues.filter(issue => !issue.resolved).map((issue) => (
                  <div key={issue.id} className="text-xs bg-gray-800 p-2 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleResolveIssue(issue.id)}
                        className="text-green-400 hover:text-green-300"
                        title="Mark as resolved"
                      >
                        ✓
                      </button>
                    </div>
                    <div className="text-gray-300 mb-1">
                      {issue.description}
                    </div>
                    <div className="text-xs text-blue-400">
                      Remedy: {issue.remedy}
                    </div>
                    {issue.deadline && (
                      <div className="text-xs text-orange-400 mt-1">
                        Deadline: {issue.deadline.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleForceAudit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-xs transition-colors"
            >
              Force Audit
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-400">
            Last audit: {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}
    </>
  );
}