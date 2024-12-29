'use client';

import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import { AuthButton } from '@/components/auth/auth-button';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="w-6 h-6" />
            <span className="font-bold text-xl">CulinaryCanvas</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/recipes/new">
                  <Button>Create Recipe</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
              </>
            ) : (
              <AuthButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}