import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Recipe } from '../interfaces/Recipe.interface';
import { Step } from '../interfaces/Step.interface';
import { Ingredient } from '../interfaces/Ingredient.interface';
import { RecipeService } from '../services/RecipeService.service';
import formatTimerDuration from '../utils/timeUtils'

const CookingModePage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeId = id ? parseInt(id, 10) : 0;
        const response = await RecipeService.getRecipeById(recipeId);
        setRecipe(response);
      } catch (error) {
        console.log('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe && recipe.steps.every((step) => completedSteps.includes(step.id))) {
      alert('Congratulations! You have completed all steps!');
    }
  }, [recipe, completedSteps]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleStepCheckboxClick = (stepId: number) => {
    const stepIndex = completedSteps.indexOf(stepId);
    const step = recipe.steps.find((step) => step.id === stepId);
  
    if (stepIndex === -1) {
      const blockedStep = recipe.steps.find(
        (step) => step.id !== stepId && step.previous_step_id === stepId
      );
  
      if (!blockedStep) {
        setCompletedSteps((prevCompletedSteps) => [...prevCompletedSteps, stepId]);
      } else {
        const blockedStepIds = recipe.steps
          .filter((step) => step.previous_step_id === blockedStep.id)
          .map((step) => step.id);
  
        const allBlockedStepsCompleted = blockedStepIds.every((id) =>
          completedSteps.includes(id)
        );
  
        if (allBlockedStepsCompleted) {
          setCompletedSteps((prevCompletedSteps) => [
            ...prevCompletedSteps,
            stepId,
            ...blockedStepIds,
          ]);
        } else {
          const unblockedSteps = recipe.steps
            .filter((step) => step.previous_step_id === stepId && completedSteps.includes(step.previous_step_id))
            .map((step) => step.id);
  
          setCompletedSteps((prevCompletedSteps) => [
            ...prevCompletedSteps,
            stepId,
            ...unblockedSteps,
          ]);
        }
      }
    } else {
      setCompletedSteps((prevCompletedSteps) =>
        prevCompletedSteps.filter((id) => id !== stepId)
      );
    }
  };

  return (
    <div>
      <h2>{recipe.title}</h2>

      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient: Ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.amount}
          </li>
        ))}
      </ul>

      <h3>Steps:</h3>
        <ul>
        {recipe.steps.map((step: Step) => {
            const isBlocked =
            step.previous_step_id !== null &&
            step.previous_step_id !== undefined &&
            !completedSteps.includes(step.previous_step_id);

            return (
            <li key={step.id}>
                <input
                type="checkbox"
                onClick={() => handleStepCheckboxClick(step.id)}
                disabled={isBlocked}
                />
                <span style={{ fontWeight: isBlocked ? 'normal' : 'bold' }}>
                {step.description}
                {formatTimerDuration(step.timer_duration) &&
                    ` (Timer: ${formatTimerDuration(step.timer_duration)})`}
                </span>
            </li>
            );
        })}
        </ul>
      <Link to="/">Back to View All Recipes</Link>
    </div>
  );
};

export default CookingModePage;
