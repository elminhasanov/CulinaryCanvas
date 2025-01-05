import { z } from 'zod';

export const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  cooking_time: z.number().min(1, 'Cooking time must be at least 1 minute'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  categories: z.array(z.string()).optional(),
  ingredients: z.array(
    z.object({
      item: z.string().min(1, 'Ingredient name is required'),
      amount: z.string().min(1, 'Amount is required'),
      unit: z.string().min(1, 'Unit is required'),
    })
  ),
  instructions: z.array(z.string().min(1, 'Instruction is required')),
  image_url: z.string().url().optional(),
});