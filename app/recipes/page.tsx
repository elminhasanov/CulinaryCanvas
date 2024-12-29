'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { RecipeGrid } from '@/components/recipes/recipe-grid';
import { Database } from '@/lib/types/supabase';
import { SupabaseConnectionError } from '@/components/supabase/connection-error';
import { env } from '@/lib/config/env';

type Recipe = Database['public']['Tables']['recipes']['Row'];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if Supabase is configured
  if (!env.supabase.url || !env.supabase.anonKey) {
    return <SupabaseConnectionError />;
  }

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching recipes:', error);
          return;
        }

        setRecipes(data || []);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Discover Recipes</h1>
      <RecipeGrid>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </RecipeGrid>
    </div>
  );
}