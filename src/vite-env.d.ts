// Fix: Manually declare ImportMeta and ImportMetaEnv interfaces as a fallback when vite/client type definitions are unavailable
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
