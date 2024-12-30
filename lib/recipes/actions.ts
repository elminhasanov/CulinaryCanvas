'use client';

import { supabase } from '@/lib/supabase/client';

export async function saveRecipe(userId: string, recipeId: string) {
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, recipe_id: recipeId });
  
  if (error) throw error;
}

export async function unsaveRecipe(userId: string, recipeId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ user_id: userId, recipe_id: recipeId });
  
  if (error) throw error;
}

export async function checkIfSaved(userId: string, recipeId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select()
    .match({ user_id: userId, recipe_id: recipeId })
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return !!data;
}