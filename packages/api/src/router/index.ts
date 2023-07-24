// Imports
// ========================================================
import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { redisRouter } from "./redis";

// Exports
// ========================================================
export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  redis: redisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
