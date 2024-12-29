import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function FormActions({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="flex justify-end gap-4">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Create Recipe
      </Button>
    </div>
  );
}