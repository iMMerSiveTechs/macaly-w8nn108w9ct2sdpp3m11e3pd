// Main tRPC Router for Nemurium
// Combines all sub-routers and exports the main AppRouter

import { createTRPCRouter } from './trpc'
import { searchRouter } from './search'

/**
 * This is the primary router for the Nemurium tRPC server.
 * All routers added here should be manually added to the imports above.
 */
export const appRouter = createTRPCRouter({
  search: searchRouter,
})

// Export type definition for client
export type AppRouter = typeof appRouter