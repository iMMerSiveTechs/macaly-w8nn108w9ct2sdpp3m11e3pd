"use client"

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log to analytics or error reporting service
    // Example: logErrorToService(error, errorInfo)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback component
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />
      }

      // Default fallback UI
      return (
        <div className="flex items-center justify-center min-h-[200px] p-8">
          <div className="glass-panel p-8 rounded-xl border border-red-500/30 bg-red-500/10 max-w-md text-center">
            <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
            <p className="text-cosmic-white/80 text-sm mb-4">
              A component failed to load properly. This has been logged for our team.
            </p>
            
            {this.state.error && (
              <details className="text-left mb-4">
                <summary className="text-cosmic-white/60 text-xs cursor-pointer hover:text-cosmic-white">
                  Technical Details
                </summary>
                <pre className="text-cosmic-white/60 text-xs mt-2 bg-cosmic-space/50 p-2 rounded overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            
            <div className="flex gap-2 justify-center">
              <Button
                onClick={this.resetError}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
                className="border-cosmic-white/20 text-cosmic-white hover:bg-cosmic-white/10"
              >
                <Home className="h-4 w-4 mr-2" />
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Skeleton Loader Component
export function SkeletonLoader({ 
  className = "",
  lines = 3,
  variant = "default"
}: {
  className?: string
  lines?: number
  variant?: "default" | "card" | "avatar" | "button"
}) {
  if (variant === "card") {
    return (
      <div className={`glass-panel p-6 rounded-xl border border-cosmic-white/20 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cosmic-white/10 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-cosmic-white/10 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-cosmic-white/10 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <div key={i} className="h-3 bg-cosmic-white/10 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === "avatar") {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="w-12 h-12 bg-cosmic-white/10 rounded-full"></div>
      </div>
    )
  }

  if (variant === "button") {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-10 bg-cosmic-white/10 rounded-lg w-24"></div>
      </div>
    )
  }

  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 bg-cosmic-white/10 rounded w-full"></div>
        ))}
      </div>
    </div>
  )
}