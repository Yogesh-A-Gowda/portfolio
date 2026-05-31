import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn("Failed to initialize Supabase client:", error);
  }
} else {
  console.warn(
    "Supabase credentials not found. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file or hosting provider settings. App is running with static fallbacks."
  );
}

export { supabase };
