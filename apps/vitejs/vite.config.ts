// Imports
// ========================================================
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Exports
// ========================================================
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'AUTH0_');

  return ({
    plugins: [react()],
    define: {
      AUTH0_DOMAIN: `"${env.AUTH0_DOMAIN}"`,
      AUTH0_CLIENT_ID: `"${env.AUTH0_CLIENT_ID}"`,
    }
  })
});
