// Imports
// ========================================================
import { PrismaClient } from "@prisma/client";

// Types
// ========================================================
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Exports
// ========================================================
export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

export * from "@prisma/client";

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
