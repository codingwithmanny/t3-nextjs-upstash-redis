// Imports
// ========================================================
import { protectedProcedure, publicProcedure, router } from "../trpc";

// Exports
// ========================================================
export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx?.auth?.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
});
