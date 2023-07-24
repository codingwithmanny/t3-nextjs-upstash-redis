// Imports
// ========================================================
import { appRouter, createContext } from "@acme/api";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cors from 'cors';

// Config
// ========================================================
/**
 * 
 */
const corsMiddleware = cors();

/**
 * 
 * @param req 
 * @param res 
 * @param fn 
 * @returns 
 */
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: typeof corsMiddleware) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

/**
 * 
 * @param handler 
 * @returns 
 */
const withCors = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, corsMiddleware);

    return await handler(req, res);
  };
};

// Exports
// ========================================================
// export API handler
export default withCors(createNextApiHandler({
  router: appRouter,
  createContext,
}));

// If you need to enable cors, you can do so like this:
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Enable cors
//   await cors(req, res);

//   // Let the tRPC handler do its magic
//   return createNextApiHandler({
//     router: appRouter,
//     createContext,
//   })(req, res);
// };

// export default handler;
