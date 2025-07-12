// Next.js App Router API Handler for tRPC
// Handles all tRPC requests under /api/trpc/

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest } from 'next/server'
import { appRouter } from '@/src/server/trpc/root'
import { createTRPCContext } from '@/src/server/trpc/trpc'

// Initialize services on server start
import { serviceManager } from '@/src/server/init-services'

// Ensure services are initialized
serviceManager.initialize().catch(console.error)

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            )
          }
        : undefined,
  })

export { handler as GET, handler as POST }