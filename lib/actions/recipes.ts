'use client';

import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';

export async function createRecipe(data: any) {
  const { user } = useAuth();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase.from('recipes').insert({
    ...data,
    user_id: user.id,
  });

  if (error) throw error;
}