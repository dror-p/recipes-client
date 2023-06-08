import { useGetAllRecipes } from '../hooks/useGetAllRecipes';
import { useDeleteRecipe } from '../hooks/useDeleteRecipe';
import { useEffect, useState } from 'react';
import { Recipe } from '../interfaces/Recipe.interface';
import { useNavigate } from 'react-router-dom';
import { Ingredient } from '../interfaces/Ingredient.interface';
import formatTimerDuration from '../utils/timeUtils'

const ViewAllRecipesPage: React.FC = () => {
  const recipes = useGetAllRecipes();
  const { deleteRecipe } = useDeleteRecipe();
  const [updatedRecipes, setUpdatedRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUpdatedRecipes(recipes);
  }, [recipes]);

  if (!recipes || recipes.length === 0) {
    return <div>Loading...</div>;
  }

  const handleViewCookingMode = (recipeId: number) => {
    navigate(`/recipes/cooking/${recipeId}`);
  };

  const handleCreateRecipe = () => {
    navigate('/create');
  };

  const handleDeleteRecipe = async (recipeId: number) => {
    try {
      await deleteRecipe(recipeId);
      setUpdatedRecipes(updatedRecipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div>
      <h1>View All Recipes</h1>
      <button onClick={handleCreateRecipe}>+</button>
      {updatedRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
          <button onClick={() => handleViewCookingMode(recipe.id)}>Cooking Mode</button>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ingredient: Ingredient) => (
            <li key={ingredient.id}>
                {ingredient.name} - {ingredient.amount}
            </li>
            ))}
          </ul>

          <h3>Steps:</h3>
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.id}>
                {step.description}
                {formatTimerDuration(step.timer_duration) && ` (Timer: ${formatTimerDuration(step.timer_duration)})`}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default ViewAllRecipesPage;
