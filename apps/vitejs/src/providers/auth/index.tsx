// Imports
// ========================================================
import { Auth0Provider } from "@auth0/auth0-react";

// Root Provider
// ========================================================
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <Auth0Provider
    domain={window.AUTH0_DOMAIN}
    clientId={window.AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://vitejs/api"
    }}
  >
    {children}
  </Auth0Provider>
};

// Exports
// ========================================================
export default AuthProvider;