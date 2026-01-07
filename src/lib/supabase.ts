import { createClient } from '@supabase/supabase-js';

// Fix: Cast import.meta to any to resolve property 'env' access errors when vite/client types are missing
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);