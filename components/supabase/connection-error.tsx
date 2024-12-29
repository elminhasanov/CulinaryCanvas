'use client';

import { Button } from '@/components/ui/button';
import { env } from '@/lib/config/env';

export function SupabaseConnectionError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h2 className="text-2xl font-bold mb-4">Connect to Supabase</h2>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        Please click the &quot;Connect to Supabase&quot; button in the top right corner to set up your database connection.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry Connection
        </Button>
      </div>
    </div>
  );
}