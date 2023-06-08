import axios from 'axios';
import { Recipe } from '../interfaces/Recipe.interface';
import { API_URL } from '../constants';

export const RecipeService = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    try {
      const response = await axios.get<Recipe[]>(`${API_URL}/recipes`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch recipes');
    }
  },

  getRecipeById: async (id: number): Promise<Recipe> => {
    try {
      const response = await axios.get<Recipe>(`${API_URL}/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch recipe');
    }
  },

  createRecipe: async (recipe: Omit<Recipe, 'id'>): Promise<Recipe> => {
    try {
      const response = await axios.post<Recipe>(`${API_URL}/recipes`, recipe);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create recipe');
    }
  },

  deleteRecipe: async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(`${API_URL}/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete recipe');
    }
  }
};
