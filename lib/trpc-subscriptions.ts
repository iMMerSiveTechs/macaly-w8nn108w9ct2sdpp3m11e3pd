// tRPC Subscription Procedures for Nemurium
// Handles subscription management, upgrades, and content creation

import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { SubscriptionTier, SubscriptionManager, tierConfig } from './subscription-system'

// Input validation schemas
const upgradeSubscriptionSchema = z.object({
  newTier: z.nativeEnum(SubscriptionTier),
  paymentMethod: z.enum(['stripe', 'gumroad']).optional(),
  stripePaymentIntentId: z.string().optional(),
  gumroadOrderId: z.string().optional(),
})

const createContentSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  contentType: z.enum(['text', 'image', 'audio', 'video', 'vr', 'ar', 'nft']),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().positive().optional(),
  tags: z.array(z.string()).max(10).optional(),
  isPublic: z.boolean().default(true),
})

const cancelSubscriptionSchema = z.object({
  reason: z.string().max(500).optional(),
  cancelImmediately: z.boolean().default(false),
})

// Mock database functions (replace with your actual database)
interface MockUser {
  id: string
  subscriptionTier: SubscriptionTier
  isActive: boolean
  planStartDate?: Date
  planEndDate?: Date
  trialEndDate?: Date
  hasLifetimeAccess: boolean
  contentLimit: number
  usedContentSlots: number
  email?: string
}

const mockDb = {
  user: {
    findUnique: async (params: any): Promise<MockUser | null> => {
      // Replace with actual database query
      console.log('Finding user:', params)
      return null
    },
    update: async (params: any): Promise<MockUser | null> => {
      // Replace with actual database update
      console.log('Updating user:', params)
      return null
    }
  },
  content: {
    create: async (params: any) => {
      // Replace with actual content creation
      console.log('Creating content:', params)
      return { id: 'content-123', ...params.data }
    },
    count: async (params: any) => {
      // Replace with actual count query
      console.log('Counting content:', params)
      return 0
    }
  }
}

// tRPC Procedures
export const subscriptionProcedures = {
  
  // Get current subscription status
  getCurrentSubscription: async (ctx: any) => {
    const userId = ctx.session?.user?.id
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Must be logged in to view subscription'
      })
    }

    const user = await mockDb.user.findUnique({
      where: { id: userId },
      select: {
        subscriptionTier: true,
        isActive: true,
        planStartDate: true,
        planEndDate: true,
        trialEndDate: true,
        hasLifetimeAccess: true,
        contentLimit: true,
        usedContentSlots: true,
      }
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found'
      })
    }

    const config = tierConfig[user.subscriptionTier]
    const remainingSlots = SubscriptionManager.getRemainingSlots(user)
    const isTrialActive = SubscriptionManager.isTrialActive(user)
    const daysUntilBilling = SubscriptionManager.getDaysUntilBilling(user)

    return {
      ...user,
      tierConfig: config,
      remainingSlots,
      isTrialActive,
      daysUntilBilling,
      canUpgrade: user.subscriptionTier !== SubscriptionTier.LIFETIME,
    }
  },

  // Upgrade subscription
  upgradeSubscription: async (ctx: any, input: z.infer<typeof upgradeSubscriptionSchema>) => {
    const userId = ctx.session?.user?.id
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Must be logged in to upgrade subscription'
      })
    }

    const user = await mockDb.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found'
      })
    }

    // Validate upgrade
    if (!SubscriptionManager.upgradeTier(user.subscriptionTier, input.newTier)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Cannot downgrade or invalid tier change'
      })
    }

    // Calculate prorated amount
    const daysRemaining = SubscriptionManager.getDaysUntilBilling(user)
    const prorationAmount = SubscriptionManager.calculateProration(
      user.subscriptionTier, 
      input.newTier, 
      daysRemaining
    )

    // Update user subscription
    const newConfig = tierConfig[input.newTier]
    const updatedUser = await mockDb.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: input.newTier,
        contentLimit: newConfig.contentLimit,
        planEndDate: input.newTier === SubscriptionTier.LIFETIME ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        hasLifetimeAccess: input.newTier === SubscriptionTier.LIFETIME,
        ...(input.stripePaymentIntentId && { stripePaymentIntentId: input.stripePaymentIntentId }),
        ...(input.gumroadOrderId && { gumroadOrderId: input.gumroadOrderId }),
        updatedAt: new Date()
      }
    })

    return {
      success: true,
      newTier: input.newTier,
      prorationAmount,
      user: updatedUser
    }
  },

  // Create content with tier restrictions
  createContent: async (ctx: any, input: z.infer<typeof createContentSchema>) => {
    const userId = ctx.session?.user?.id
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Must be logged in to create content'
      })
    }

    const user = await mockDb.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found'
      })
    }

    // Check if user can create this content type
    if (!SubscriptionManager.canCreateContent(user, input.contentType)) {
      const config = tierConfig[user.subscriptionTier]
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Content type '${input.contentType}' not allowed for ${config.name} tier. Please upgrade your subscription.`
      })
    }

    // Check file size limits
    if (input.fileSize) {
      const maxSize = tierConfig[user.subscriptionTier].maxFileSize
      if (input.fileSize > maxSize) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `File size exceeds ${maxSize / 1024 / 1024}MB limit for your tier`
        })
      }
    }

    // Create content
    const content = await mockDb.content.create({
      data: {
        ...input,
        userId,
        createdAt: new Date()
      }
    })

    // Update user's used content slots
    await mockDb.user.update({
      where: { id: userId },
      data: {
        usedContentSlots: user.usedContentSlots + 1
      }
    })

    return {
      success: true,
      content,
      remainingSlots: SubscriptionManager.getRemainingSlots(user) - 1
    }
  },

  // Cancel subscription
  cancelSubscription: async (ctx: any, input: z.infer<typeof cancelSubscriptionSchema>) => {
    const userId = ctx.session?.user?.id
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Must be logged in to cancel subscription'
      })
    }

    const user = await mockDb.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found'
      })
    }

    const updatedUser = await mockDb.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        subscriptionTier: input.cancelImmediately ? SubscriptionTier.FREE : user.subscriptionTier,
        planEndDate: input.cancelImmediately ? new Date() : user.planEndDate,
        contentLimit: input.cancelImmediately ? tierConfig[SubscriptionTier.FREE].contentLimit : user.contentLimit,
        cancellationReason: input.reason,
        cancelledAt: new Date()
      }
    })

    return {
      success: true,
      cancelledImmediately: input.cancelImmediately,
      user: updatedUser
    }
  },

  // Get user's content stats
  getContentStats: async (ctx: any) => {
    const userId = ctx.session?.user?.id
    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Must be logged in to view content stats'
      })
    }

    const user = await mockDb.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found'
      })
    }

    const totalContent = await mockDb.content.count({
      where: { userId }
    })

    const config = tierConfig[user.subscriptionTier]
    const remainingSlots = SubscriptionManager.getRemainingSlots(user)

    return {
      totalContent,
      usedSlots: user.usedContentSlots,
      remainingSlots,
      contentLimit: config.contentLimit,
      allowedContentTypes: config.allowedContentTypes,
      maxFileSize: config.maxFileSize,
      tierName: config.name
    }
  }
}

// Export types for frontend
export type UpgradeSubscriptionInput = z.infer<typeof upgradeSubscriptionSchema>
export type CreateContentInput = z.infer<typeof createContentSchema>
export type CancelSubscriptionInput = z.infer<typeof cancelSubscriptionSchema>