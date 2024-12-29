'use client';

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';
import { env } from '@/lib/config/env';

if (!env.supabase.url || !env.supabase.anonKey) {
  console.warn(
    'Supabase credentials not found. Please click "Connect to Supabase" button to configure your project.'
  );
}

export const supabase = createClient<Database>(
  env.supabase.url || 'https://placeholder.supabase.co',
  env.supabase.anonKey || 'placeholder'
);