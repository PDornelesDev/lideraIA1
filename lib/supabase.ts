
import { createClient } from '@supabase/supabase-js';

// Casting para any para evitar erros de tipagem no acesso às variáveis do Vite
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
