// Webhook handlers for Stripe and Gumroad subscription updates
// Handles subscription lifecycle events and user tier updates

import { z } from 'zod'
import { SubscriptionTier } from './subscription-system'

// Stripe webhook event types
const stripeWebhookSchema = z.object({
  id: z.string(),
  object: z.literal('event'),
  type: z.string(),
  data: z.object({
    object: z.any()
  }),
  created: z.number(),
  livemode: z.boolean(),
  pending_webhooks: z.number(),
  request: z.object({
    id: z.string().nullable(),
    idempotency_key: z.string().nullable()
  }).nullable()
})

// Gumroad webhook event types
const gumroadWebhookSchema = z.object({
  seller_id: z.string(),
  product_id: z.string(),
  product_name: z.string(),
  permalink: z.string(),
  product_permalink: z.string(),
  email: z.string(),
  price: z.number(),
  gumroad_fee: z.number(),
  currency: z.string(),
  quantity: z.number(),
  discover_fee_charged: z.boolean(),
  can_contact: z.boolean(),
  referrer: z.string(),
  order_number: z.string(),
  sale_id: z.string(),
  sale_timestamp: z.string(),
  purchaser_id: z.string(),
  subscription_id: z.string().optional(),
  subscription_cancelled_at: z.string().optional(),
  subscription_failed_at: z.string().optional(),
  custom_fields: z.array(z.any()).optional(),
  variants: z.string().optional(),
  product_rating: z.number().optional(),
  product_rating_count: z.number().optional(),
  variants_and_quantity: z.string().optional(),
  affiliate: z.string().optional(),
  test: z.boolean().optional()
})

// Price to tier mapping
const priceToTierMap = {
  // Stripe price IDs (replace with your actual Stripe price IDs)
  'price_supporter_monthly': SubscriptionTier.SUPPORTER,
  'price_founding_creator_monthly': SubscriptionTier.FOUNDING_CREATOR,
  'price_inner_circle_monthly': SubscriptionTier.INNER_CIRCLE,
  'price_lifetime_onetime': SubscriptionTier.LIFETIME,
  
  // Gumroad product IDs (replace with your actual Gumroad product IDs)
  'supporter-monthly': SubscriptionTier.SUPPORTER,
  'founding-creator-monthly': SubscriptionTier.FOUNDING_CREATOR,
  'inner-circle-monthly': SubscriptionTier.INNER_CIRCLE,
  'lifetime-access': SubscriptionTier.LIFETIME
}

// Mock database functions (replace with your actual database)
interface MockUser {
  id: string
  email: string
  subscriptionTier: SubscriptionTier
  isActive: boolean
  planStartDate?: Date
  planEndDate?: Date
  trialEndDate?: Date
  hasLifetimeAccess: boolean
}

const mockDb = {
  user: {
    findUnique: async (params: any): Promise<MockUser | null> => {
      console.log('Finding user:', params)
      return null
    },
    update: async (params: any): Promise<MockUser | null> => {
      console.log('Updating user:', params)
      return null
    },
    create: async (params: any): Promise<MockUser | null> => {
      console.log('Creating user:', params)
      return null
    }
  }
}

export class WebhookHandlers {
  
  // Stripe webhook handler
  static async handleStripeWebhook(event: z.infer<typeof stripeWebhookSchema>) {
    console.log('Processing Stripe webhook:', event.type)
    
    try {
      switch (event.type) {
        case 'customer.subscription.created':
          return await this.handleSubscriptionCreated(event.data.object, 'stripe')
        
        case 'customer.subscription.updated':
          return await this.handleSubscriptionUpdated(event.data.object, 'stripe')
        
        case 'customer.subscription.deleted':
          return await this.handleSubscriptionCancelled(event.data.object, 'stripe')
        
        case 'invoice.payment_succeeded':
          return await this.handlePaymentSucceeded(event.data.object, 'stripe')
        
        case 'invoice.payment_failed':
          return await this.handlePaymentFailed(event.data.object, 'stripe')
        
        case 'customer.subscription.trial_will_end':
          return await this.handleTrialWillEnd(event.data.object, 'stripe')
        
        default:
          console.log('Unhandled Stripe webhook event:', event.type)
          return { success: true, message: 'Event type not handled' }
      }
    } catch (error) {
      console.error('Error processing Stripe webhook:', error)
      return { success: false, error: error.message }
    }
  }

  // Gumroad webhook handler
  static async handleGumroadWebhook(event: z.infer<typeof gumroadWebhookSchema>) {
    console.log('Processing Gumroad webhook:', event.sale_id)
    
    try {
      // Handle different Gumroad events
      if (event.subscription_cancelled_at) {
        return await this.handleGumroadCancellation(event)
      } else if (event.subscription_failed_at) {
        return await this.handleGumroadPaymentFailed(event)
      } else {
        return await this.handleGumroadPurchase(event)
      }
    } catch (error) {
      console.error('Error processing Gumroad webhook:', error)
      return { success: false, error: error.message }
    }
  }

  // Subscription created
  private static async handleSubscriptionCreated(subscription: any, platform: 'stripe' | 'gumroad') {
    console.log('Subscription created:', subscription.id)
    
    const email = platform === 'stripe' ? subscription.customer.email : subscription.email
    const tier = this.getPlatformTier(subscription, platform)
    
    if (!tier) {
      throw new Error('Could not determine subscription tier')
    }

    // Find or create user
    let user = await mockDb.user.findUnique({
      where: { email }
    })

    if (!user) {
      user = await mockDb.user.create({
        data: {
          email,
          name: email.split('@')[0],
          subscriptionTier: tier,
          isActive: true,
          planStartDate: new Date(),
          planEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          ...(platform === 'stripe' && { stripeCustomerId: subscription.customer.id, stripeSubscriptionId: subscription.id }),
          ...(platform === 'gumroad' && { gumroadSubscriptionId: subscription.subscription_id })
        }
      })
    } else {
      // Update existing user
      user = await mockDb.user.update({
        where: { email },
        data: {
          subscriptionTier: tier,
          isActive: true,
          planStartDate: new Date(),
          planEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          ...(platform === 'stripe' && { stripeCustomerId: subscription.customer.id, stripeSubscriptionId: subscription.id }),
          ...(platform === 'gumroad' && { gumroadSubscriptionId: subscription.subscription_id })
        }
      })
    }

    return { success: true, user }
  }

  // Subscription updated
  private static async handleSubscriptionUpdated(subscription: any, platform: 'stripe' | 'gumroad') {
    console.log('Subscription updated:', subscription.id)
    
    const identifierField = platform === 'stripe' ? 'stripeSubscriptionId' : 'gumroadSubscriptionId'
    const tier = this.getPlatformTier(subscription, platform)
    
    if (!tier) {
      throw new Error('Could not determine subscription tier')
    }

    const user = await mockDb.user.update({
      where: { [identifierField]: subscription.id },
      data: {
        subscriptionTier: tier,
        isActive: subscription.status === 'active',
        planEndDate: new Date(subscription.current_period_end * 1000)
      }
    })

    return { success: true, user }
  }

  // Subscription cancelled
  private static async handleSubscriptionCancelled(subscription: any, platform: 'stripe' | 'gumroad') {
    console.log('Subscription cancelled:', subscription.id)
    
    const identifierField = platform === 'stripe' ? 'stripeSubscriptionId' : 'gumroadSubscriptionId'
    
    const user = await mockDb.user.update({
      where: { [identifierField]: subscription.id },
      data: {
        isActive: false,
        subscriptionTier: SubscriptionTier.FREE,
        planEndDate: new Date()
      }
    })

    return { success: true, user }
  }

  // Payment succeeded
  private static async handlePaymentSucceeded(invoice: any, platform: 'stripe' | 'gumroad') {
    console.log('Payment succeeded:', invoice.id)
    
    const identifierField = platform === 'stripe' ? 'stripeSubscriptionId' : 'gumroadSubscriptionId'
    
    const user = await mockDb.user.update({
      where: { [identifierField]: invoice.subscription },
      data: {
        isActive: true,
        lastPaymentDate: new Date(),
        planEndDate: new Date(invoice.period_end * 1000)
      }
    })

    return { success: true, user }
  }

  // Payment failed
  private static async handlePaymentFailed(invoice: any, platform: 'stripe' | 'gumroad') {
    console.log('Payment failed:', invoice.id)
    
    const identifierField = platform === 'stripe' ? 'stripeSubscriptionId' : 'gumroadSubscriptionId'
    
    // Don't immediately deactivate - give grace period
    const user = await mockDb.user.update({
      where: { [identifierField]: invoice.subscription },
      data: {
        lastPaymentFailedDate: new Date(),
        paymentFailureCount: { increment: 1 }
      }
    })

    return { success: true, user }
  }

  // Trial will end
  private static async handleTrialWillEnd(subscription: any, platform: 'stripe' | 'gumroad') {
    console.log('Trial will end:', subscription.id)
    
    const identifierField = platform === 'stripe' ? 'stripeSubscriptionId' : 'gumroadSubscriptionId'
    
    const user = await mockDb.user.update({
      where: { [identifierField]: subscription.id },
      data: {
        trialEndDate: new Date(subscription.trial_end * 1000)
      }
    })

    // Send email notification about trial ending
    if (user?.email) {
      console.log('Should send trial ending email to:', user.email)
    }

    return { success: true, user }
  }

  // Handle Gumroad purchase
  private static async handleGumroadPurchase(event: z.infer<typeof gumroadWebhookSchema>) {
    console.log('Gumroad purchase:', event.sale_id)
    
    const tier = this.getGumroadTier(event.product_permalink)
    if (!tier) {
      throw new Error('Could not determine tier from Gumroad product')
    }

    let user = await mockDb.user.findUnique({
      where: { email: event.email }
    })

    if (!user) {
      user = await mockDb.user.create({
        data: {
          email: event.email,
          name: event.email.split('@')[0],
          subscriptionTier: tier,
          isActive: true,
          planStartDate: new Date(),
          planEndDate: tier === SubscriptionTier.LIFETIME ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          hasLifetimeAccess: tier === SubscriptionTier.LIFETIME,
          gumroadSubscriptionId: event.subscription_id
        }
      })
    } else {
      user = await mockDb.user.update({
        where: { email: event.email },
        data: {
          subscriptionTier: tier,
          isActive: true,
          planStartDate: new Date(),
          planEndDate: tier === SubscriptionTier.LIFETIME ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          hasLifetimeAccess: tier === SubscriptionTier.LIFETIME,
          gumroadSubscriptionId: event.subscription_id
        }
      })
    }

    return { success: true, user }
  }

  // Handle Gumroad cancellation
  private static async handleGumroadCancellation(event: z.infer<typeof gumroadWebhookSchema>) {
    console.log('Gumroad cancellation:', event.sale_id)
    
    const user = await mockDb.user.update({
      where: { email: event.email },
      data: {
        isActive: false,
        subscriptionTier: SubscriptionTier.FREE,
        planEndDate: new Date()
      }
    })

    return { success: true, user }
  }

  // Handle Gumroad payment failed
  private static async handleGumroadPaymentFailed(event: z.infer<typeof gumroadWebhookSchema>) {
    console.log('Gumroad payment failed:', event.sale_id)
    
    const user = await mockDb.user.update({
      where: { email: event.email },
      data: {
        lastPaymentFailedDate: new Date(),
        paymentFailureCount: { increment: 1 }
      }
    })

    return { success: true, user }
  }

  // Get tier from platform subscription
  private static getPlatformTier(subscription: any, platform: 'stripe' | 'gumroad'): SubscriptionTier | null {
    if (platform === 'stripe') {
      const priceId = subscription.items.data[0]?.price?.id
      return priceToTierMap[priceId] || null
    } else {
      return this.getGumroadTier(subscription.product_permalink)
    }
  }

  // Get tier from Gumroad product
  private static getGumroadTier(permalink: string): SubscriptionTier | null {
    if (!permalink) return null
    const productId = permalink.split('/').pop()
    if (!productId) return null
    return priceToTierMap[productId as keyof typeof priceToTierMap] || null
  }
}

// Express.js route handlers
export const webhookRoutes = {
  
  // Stripe webhook endpoint
  stripeWebhook: async (req: any, res: any) => {
    try {
      const event = stripeWebhookSchema.parse(req.body)
      const result = await WebhookHandlers.handleStripeWebhook(event)
      res.json(result)
    } catch (error) {
      console.error('Stripe webhook error:', error)
      res.status(400).json({ error: error.message })
    }
  },

  // Gumroad webhook endpoint
  gumroadWebhook: async (req: any, res: any) => {
    try {
      const event = gumroadWebhookSchema.parse(req.body)
      const result = await WebhookHandlers.handleGumroadWebhook(event)
      res.json(result)
    } catch (error) {
      console.error('Gumroad webhook error:', error)
      res.status(400).json({ error: error.message })
    }
  }
}

export type StripeWebhookEvent = z.infer<typeof stripeWebhookSchema>
export type GumroadWebhookEvent = z.infer<typeof gumroadWebhookSchema>