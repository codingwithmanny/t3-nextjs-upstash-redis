// Imports
// ========================================================
import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Nav from "../components/Nav";

// App Wrapper
// ========================================================
const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <UserProvider>
      <Nav />
      <Component {...pageProps} />
    </UserProvider>
  );
};

// Exports
// ========================================================
export default trpc.withTRPC(MyApp);
