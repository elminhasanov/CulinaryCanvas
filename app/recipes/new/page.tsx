'use client';

import { RecipeForm } from '@/components/recipes/forms/recipe-form';
import { SupabaseConnectionError } from '@/components/supabase/connection-error';
import { env } from '@/lib/config/env';

export default function NewRecipePage() {
  if (!env.supabase.url || !env.supabase.anonKey) {
    return <SupabaseConnectionError />;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Share Your Recipe</h1>
      <RecipeForm />
    </div>
  );
}