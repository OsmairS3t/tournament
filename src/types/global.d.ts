declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      SUPABASE_ANON_KEY: string;
    }
  }
}
export {}