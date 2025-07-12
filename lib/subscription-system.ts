// Nemurium Subscription System
// Core backend logic for managing creator subscriptions

import { z } from 'zod'

// Subscription Tier Types
export enum SubscriptionTier {
  FREE = 'FREE',
  SUPPORTER = 'SUPPORTER',
  FOUNDING_CREATOR = 'FOUNDING_CREATOR',
  INNER_CIRCLE = 'INNER_CIRCLE',
  LIFETIME = 'LIFETIME'
}

// Subscription Schema
export const subscriptionSchema = z.object({
  tier: z.nativeEnum(SubscriptionTier),
  isActive: z.boolean(),
  planStartDate: z.date(),
  planEndDate: z.date().optional(),
  stripeSubscriptionId: z.string().optional(),
  gumroadSubscriptionId: z.string().optional(),
  trialEndDate: z.date().optional(),
  hasLifetimeAccess: z.boolean().default(false),
  contentLimit: z.number().default(0),
  usedContentSlots: z.number().default(0),
})

// Tier Configuration
export const tierConfig = {
  [SubscriptionTier.FREE]: {
    name: 'Free',
    price: 0,
    contentLimit: 5,
    features: ['Basic world creation', 'Community access', 'Public gallery'],
    allowedContentTypes: ['text', 'image'],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    priority: 0
  },
  [SubscriptionTier.SUPPORTER]: {
    name: 'Supporter',
    price: 5,
    contentLimit: 25,
    features: ['Enhanced world creation', 'Audio support', 'Early access'],
    allowedContentTypes: ['text', 'image', 'audio'],
    maxFileSize: 25 * 1024 * 1024, // 25MB
    priority: 1
  },
  [SubscriptionTier.FOUNDING_CREATOR]: {
    name: 'Founding Creator',
    price: 25,
    contentLimit: 100,
    features: ['Video support', 'Beta access', 'Creator badge', 'Priority support'],
    allowedContentTypes: ['text', 'image', 'audio', 'video'],
    maxFileSize: 100 * 1024 * 1024, // 100MB
    priority: 2
  },
  [SubscriptionTier.INNER_CIRCLE]: {
    name: 'Inner Circle',
    price: 75,
    contentLimit: 1000,
    features: ['VR/AR/NFT support', 'Unlimited uploads', 'Direct founder access', 'Revenue sharing'],
    allowedContentTypes: ['text', 'image', 'audio', 'video', 'vr', 'ar', 'nft'],
    maxFileSize: 500 * 1024 * 1024, // 500MB
    priority: 3
  },
  [SubscriptionTier.LIFETIME]: {
    name: 'Lifetime',
    price: 999,
    contentLimit: 1000,
    features: ['All Inner Circle features', 'Lifetime access', 'Special NFT badge'],
    allowedContentTypes: ['text', 'image', 'audio', 'video', 'vr', 'ar', 'nft'],
    maxFileSize: 500 * 1024 * 1024, // 500MB
    priority: 4
  }
}

// User Schema Extension
export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string().min(1),
  avatar: z.string().optional(),
  subscriptionTier: z.nativeEnum(SubscriptionTier).default(SubscriptionTier.FREE),
  isActive: z.boolean().default(true),
  planStartDate: z.date().optional(),
  planEndDate: z.date().optional(),
  stripeCustomerId: z.string().optional(),
  gumroadCustomerId: z.string().optional(),
  trialEndDate: z.date().optional(),
  hasLifetimeAccess: z.boolean().default(false),
  contentLimit: z.number().default(5),
  usedContentSlots: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Subscription Management Functions
export class SubscriptionManager {
  
  static hasAccess(userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
    const userPriority = tierConfig[userTier].priority
    const requiredPriority = tierConfig[requiredTier].priority
    return userPriority >= requiredPriority
  }

  static canCreateContent(user: any, contentType: string): boolean {
    const config = tierConfig[user.subscriptionTier]
    
    // Check if content type is allowed
    if (!config.allowedContentTypes.includes(contentType)) {
      return false
    }
    
    // Check content limit
    if (user.usedContentSlots >= config.contentLimit) {
      return false
    }
    
    // Check if subscription is active
    if (!user.isActive && user.subscriptionTier !== SubscriptionTier.FREE) {
      return false
    }
    
    return true
  }

  static getRemainingSlots(user: any): number {
    const config = tierConfig[user.subscriptionTier]
    return Math.max(0, config.contentLimit - user.usedContentSlots)
  }

  static resetMonthlyUsage(user: any): any {
    return {
      ...user,
      usedContentSlots: 0
    }
  }

  static upgradeTier(currentTier: SubscriptionTier, newTier: SubscriptionTier): boolean {
    const currentPriority = tierConfig[currentTier].priority
    const newPriority = tierConfig[newTier].priority
    return newPriority > currentPriority
  }

  static calculateProration(currentTier: SubscriptionTier, newTier: SubscriptionTier, daysRemaining: number): number {
    const currentPrice = tierConfig[currentTier].price
    const newPrice = tierConfig[newTier].price
    const dailyDifference = (newPrice - currentPrice) / 30
    return Math.max(0, dailyDifference * daysRemaining)
  }

  static isTrialActive(user: any): boolean {
    if (!user.trialEndDate) return false
    return new Date() < user.trialEndDate
  }

  static getDaysUntilBilling(user: any): number {
    if (!user.planEndDate) return 0
    const now = new Date()
    const endDate = new Date(user.planEndDate)
    return Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }
}

// Content Creation Limits
export const contentLimits = {
  maxFileSizeByTier: (tier: SubscriptionTier) => tierConfig[tier].maxFileSize,
  allowedContentTypes: (tier: SubscriptionTier) => tierConfig[tier].allowedContentTypes,
  monthlyLimit: (tier: SubscriptionTier) => tierConfig[tier].contentLimit
}

export type User = z.infer<typeof userSchema>
export type Subscription = z.infer<typeof subscriptionSchema>