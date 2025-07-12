// tRPC Client Setup for Nemurium Frontend
// Provides typed client for making API calls

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../server/trpc/root'

export const trpc = createTRPCReact<AppRouter>()