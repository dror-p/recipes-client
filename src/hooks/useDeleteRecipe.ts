import { useState } from 'react';
import { RecipeService } from '../services/RecipeService.service';

export function useDeleteRecipe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRecipe = async (recipeId: number) => {
    setLoading(true);
    setError(null);

    try {
      await RecipeService.deleteRecipe(recipeId);
    } catch (error) {
      setError('Failed to delete recipe');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecipe, loading, error };
}
