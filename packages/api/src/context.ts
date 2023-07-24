// Imports
// ========================================================
import { prisma } from "@acme/db";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession, type Session } from "@auth0/nextjs-auth0";
import jwtVerifier from "./utils/jwtVerifier";
import getToken from "./utils/getToken";

// Types
// ========================================================
/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type AuthContextProps = {
  auth: Session | null | undefined;
};

// Exports
// ========================================================
/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async ({ auth }: AuthContextProps) => {
  return {
    auth,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  let auth = null;
  if (req.headers.authorization) {
    const verifyJwt = jwtVerifier({
      audience: `${process.env.AUTH0_AUDIENCE}`,
      issuerBaseURL: `${process.env.AUTH0_ISSUER_BASE_URL}`,
    });

    const jwt = getToken(
      req.headers,
      req.query,
      req.body,
      !!(req.headers['content-type'] !== "urlencoded")
    );
    const decoded = await verifyJwt(`${jwt}`);

    auth = {
      user: {
        sub: decoded?.payload.sub,
      }
    } as Session['claims'];
  } else {
    auth = await getSession(req, res);
  }
  return await createContextInner({ auth });
};

/**
 * The context type that you'll use in your router
 */
export type Context = inferAsyncReturnType<typeof createContext>;
