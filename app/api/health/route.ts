// API Route to initialize backend services
// GET /api/health - Health check and service initialization

import { NextRequest } from 'next/server'
import { serviceManager } from '@/src/server/init-services'

export async function GET(request: NextRequest) {
  try {
    // Initialize services if not already done
    await serviceManager.initialize()
    
    // Get health status
    const health = await serviceManager.healthCheck()
    
    return Response.json({
      status: 'ok',
      services: health,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return Response.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}