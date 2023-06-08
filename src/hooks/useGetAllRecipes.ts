import { useEffect, useState } from 'react';
import { Recipe } from '../interfaces/Recipe.interface';
import { RecipeService } from '../services/RecipeService.service';

export function useGetAllRecipes() {
    
    const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await RecipeService.getAllRecipes();
        setRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return recipes;
}