import { Clock, ChefHat } from 'lucide-react';
import { Database } from '@/lib/types/supabase';
import Link from 'next/link';

type Recipe = Database['public']['Tables']['recipes']['Row'];

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        {recipe.image_url && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
          <p className="text-muted-foreground line-clamp-2 mb-4">
            {recipe.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cooking_time} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-4 h-4" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}