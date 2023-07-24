// Imports
// ========================================================
import QueryProvider from "./query";
import TRPCProvider from "./trpc";
import RouterProvider from "./router";
import AuthProvider from "./auth";
import MiddlewareProvider from "./middleware";
import { Toaster } from "react-hot-toast";
import MobileProvider from "./mobile";

// Root Provider
// ========================================================
const RootProvider = () => {
  return <>
    <Toaster />
    <MobileProvider>
      <AuthProvider>
        <QueryProvider>
          <TRPCProvider>
            <MiddlewareProvider>
              <RouterProvider />
            </MiddlewareProvider>
          </TRPCProvider>
        </QueryProvider>
      </AuthProvider>
    </MobileProvider>
  </>
};

// Exports
// ========================================================
export default RootProvider;