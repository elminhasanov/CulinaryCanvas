'use client';

import { useState, useEffect } from 'react';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { saveRecipe, unsaveRecipe, checkIfSaved } from '@/lib/recipes/actions';

interface SaveButtonProps {
  recipeId: string;
}

export function SaveButton({ recipeId }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkIfSaved(user.id, recipeId)
        .then(setIsSaved)
        .catch(console.error);
    }
  }, [user, recipeId]);

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save recipes',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await unsaveRecipe(user.id, recipeId);
      } else {
        await saveRecipe(user.id, recipeId);
      }
      
      setIsSaved(!isSaved);
      toast({
        title: isSaved ? 'Recipe unsaved' : 'Recipe saved',
        description: isSaved 
          ? 'Recipe removed from your saved collection' 
          : 'Recipe added to your saved collection',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save recipe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSave}
      disabled={isLoading}
      className="gap-2"
    >
      {isSaved ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <BookmarkPlus className="h-4 w-4" />
      )}
      {isSaved ? 'Saved' : 'Save Recipe'}
    </Button>
  );
}