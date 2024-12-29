'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema } from '@/lib/validations/recipe';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { BasicDetails } from './sections/basic-details';
import { IngredientsSection } from './sections/ingredients';
import { InstructionsSection } from './sections/instructions';
import { FormActions } from './sections/form-actions';
import { createRecipe } from '@/lib/actions/recipes';

export function RecipeForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      cooking_time: 30,
      difficulty: 'medium',
      ingredients: [{ item: '', amount: '', unit: 'g' }],
      instructions: [''],
      image_url: '',
    },
  });

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      await createRecipe(data);
      toast({ title: 'Recipe created successfully!' });
      router.push('/recipes');
    } catch (error) {
      toast({
        title: 'Error creating recipe',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicDetails control={form.control} />
        <IngredientsSection control={form.control} />
        <InstructionsSection control={form.control} />
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
}