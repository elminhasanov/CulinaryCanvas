'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { RecipeCard } from '@/components/recipes/recipe-card';
import { RecipeGrid } from '@/components/recipes/recipe-grid';
import { SearchBar } from '@/components/recipes/search-bar';
import { CategoryFilter } from '@/components/recipes/category-filter';
import { Database } from '@/lib/types/supabase';
import { SupabaseConnectionError } from '@/components/supabase/connection-error';
import { env } from '@/lib/config/env';
import type { RecipeCategory } from '@/lib/types/recipe';

type Recipe = Database['public']['Tables']['recipes']['Row'];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('All');

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
        setFilteredRecipes(data || []);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        recipe.categories?.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    setFilteredRecipes(filtered);
  }, [searchQuery, selectedCategory, recipes]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Discover Recipes</h1>
            <SearchBar onSearch={handleSearch} />
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <RecipeGrid>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </RecipeGrid>
        {filteredRecipes.length === 0 && (
          <p className="text-center text-muted-foreground">
            No recipes found. Try different search terms or categories.
          </p>
        )}
      </div>
    </div>
  );
}