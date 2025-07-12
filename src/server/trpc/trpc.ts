// tRPC Core Setup for Nemurium
// Defines the basic tRPC configuration, context, and procedures

import { TRPCError, initTRPC } from '@trpc/server'
import { type NextRequest } from 'next/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

// Create context for tRPC
export interface Context {
  session?: {
    user?: {
      id: string
      email: string
      name: string
      subscriptionTier?: string
    }
  }
  req?: NextRequest
}

export const createTRPCContext = async (opts: {
  req?: NextRequest
}): Promise<Context> => {
  const { req } = opts

  // Mock session - replace with actual session logic
  const mockSession = {
    user: {
      id: 'user_123',
      email: 'user@example.com',
      name: 'Test User',
      subscriptionTier: 'FREE'
    }
  }

  return {
    session: mockSession,
    req
  }
}

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// Create a server-side caller
export const createCallerFactory = t.createCallerFactory

// Basic middleware to ensure user is authenticated
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

// Export router and procedure helpers
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)