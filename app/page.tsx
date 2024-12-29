'use client';

import { ChefHat, TrendingUp, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ChefHat className="w-16 h-16 mx-auto mb-6 text-white" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover & Share Culinary Masterpieces
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Join our community of food enthusiasts and share your favorite recipes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push('/recipes')}
            >
              Start Cooking
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white hover:bg-white/20"
              onClick={() => router.push('/recipes/new')}
            >
              Share Recipe
            </Button>
          </div>
        </div>
      </section>

      {/* Rest of the component remains the same */}
    </main>
  );
}