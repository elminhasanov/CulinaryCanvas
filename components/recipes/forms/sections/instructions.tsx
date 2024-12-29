'use client';

import { Control, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

export function InstructionsSection({ control }: { control: Control<any> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructions',
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel className="text-lg">Instructions</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append('')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Step
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <span className="mt-2 text-sm text-muted-foreground">
            {index + 1}.
          </span>
          <FormField
            control={control}
            name={`instructions.${index}`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder={`Step ${index + 1}`}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}