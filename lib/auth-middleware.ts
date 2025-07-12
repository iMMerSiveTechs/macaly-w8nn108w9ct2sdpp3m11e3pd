// Authentication middleware and route protection for Nemurium
// Handles JWT authentication and subscription tier access control

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify, SignJWT } from 'jose'
import { SubscriptionTier, SubscriptionManager } from './subscription-system'

// JWT payload interface
interface JWTPayload {
  userId: string
  email: string
  subscriptionTier: SubscriptionTier
  isActive: boolean
  iat: number
  exp: number
}

// Configuration for which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/premium/:path*',
    '/inner-circle/:path*',
    '/api/protected/:path*'
  ]
}

// Type exports
export type AuthenticatedUser = JWTPayload