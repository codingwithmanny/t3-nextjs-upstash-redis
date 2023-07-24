/// <reference types="vite/client" />

interface ImportMetaEnv {
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  AUTH0_DOMAIN: any;
  AUTH0_CLIENT_ID: any;
}
