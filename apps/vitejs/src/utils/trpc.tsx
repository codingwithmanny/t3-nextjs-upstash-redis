// Imports
// ========================================================
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@acme/api/src/router';

// Config
// ========================================================
const trpc = createTRPCReact<AppRouter>();

// Exports
// ========================================================
export default trpc;