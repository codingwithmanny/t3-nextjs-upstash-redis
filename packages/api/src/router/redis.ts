// Imports
// ========================================================
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import Redis, { RedisOptions } from "ioredis";

// Config
// ========================================================
const createRedisIntance = async () => {
  try {
    // Alternative option
    // const options: RedisOptions = {
    //   port: parseInt(process.env.REDIS_PORT || '6379'),
    //   password: process.env.REDIS_PASSWORD,
    //   host: process.env.REDIS_HOST,
    //   lazyConnect: true,
    //   showFriendlyErrorStack: true,
    //   enableAutoPipelining: true,
    //   maxLoadingRetryTime: 0,
    //   retryStrategy: (times) => {
    //     if (times > 3) {
    //       throw new Error(`[Redis] Could not connect after ${times} attempts.`);
    //     }

    //     return Math.min(times * 200, 1000);
    //   }
    // };

    const redis = new Redis(`${process.env.REDIS_CONNECTION}`);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting", error);
    });

    return redis;
  } catch (error) {
    console.log(error);
    throw new Error("[Redis] Could not create a Redis instance");
  }
};

// Exports
// ========================================================
export const redisRouter = router({
  get: publicProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      const redis = await createRedisIntance();
      const value = await redis.get(input.key);
      return value;
    }),
  set: publicProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      const redis = await createRedisIntance();
      const value = await redis.set(input.key, input.value);
      return value;
    }),
});
