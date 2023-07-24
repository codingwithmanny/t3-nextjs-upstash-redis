// Imports
// ========================================================
// import { httpBatchLink } from '@trpc/client';
import trpc from '../../utils/trpc';
import { httpBatchLink } from "@trpc/client";
import { transformer } from "@acme/api/transformer";
import { queryClient } from '../query';

// Config
// ========================================================
let token: string;

/**
 * 
 * @param newToken 
 */
const setToken = (newToken: string) => {
  token = newToken;
};

/**
 * 
 * @returns 
 */
const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */
  const localhost = window.location.host.split(":")[0];
  if (!localhost)
    throw new Error("failed to get localhost, configure it manually");
  return `http://${localhost}:3000`;
};


/**
 * 
 */
const trpcClient = trpc.createClient({
  transformer,
  links: [
    httpBatchLink({
      // async headers() {
      //   const authToken = await getToken();
      //   return {
      //     Authorization: authToken ?? undefined,
      //   };
      // },
      url: `${getBaseUrl()}/api/trpc`,
      headers() {
        return {
          Authorization: token ? `Bearer ${token}` : ''
        }
      },
      // fetch(url, options) {
      //   return fetch(url, {
      //     ...options,
      //     credentials: 'include'
      //   });
      // }
    }),
  ],
});
// const trpcClient = undefined;
// trpc.createClient({
//   links: [
//     httpBatchLink({
//       url: `${import.meta.env.VITE_TRPC_SERVER_URL}`,
//       headers() {
//         return {
//           Authorization: token ? `Bearer ${token}`: ''
//         }
//       },
//       fetch(url, options) {
//         return fetch(url, {
//           ...options,
//           credentials: 'include'
//         });
//       }
//     })
//   ]
// });

// Provider
// ========================================================
const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  return <trpc.Provider client={trpcClient} queryClient={queryClient}>{children}</trpc.Provider>
};

// Exports
// ========================================================
export default TRPCProvider;
export {
  setToken
};