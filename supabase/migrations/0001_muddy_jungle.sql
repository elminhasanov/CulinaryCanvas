/*
  # Initial Schema for CulinaryCanvas

  1. New Tables
    - users (managed by Supabase Auth)
    - recipes
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - instructions (text[])
      - ingredients (jsonb)
      - cooking_time (int)
      - difficulty (text)
      - user_id (uuid, foreign key)
      - image_url (text)
      - created_at (timestamp)
    - likes
      - id (uuid, primary key)
      - recipe_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
*/

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructions text[] NOT NULL,
  ingredients jsonb NOT NULL,
  cooking_time integer NOT NULL,
  difficulty text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES recipes(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(recipe_id, user_id)
);

-- Enable RLS
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Policies for recipes
CREATE POLICY "Anyone can read recipes"
  ON recipes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create recipes"
  ON recipes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes"
  ON recipes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes"
  ON recipes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for likes
CREATE POLICY "Anyone can read likes"
  ON likes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create likes"
  ON likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);