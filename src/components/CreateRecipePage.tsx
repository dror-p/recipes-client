import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Recipe } from '../interfaces/Recipe.interface';
import { RecipeService } from '../services/RecipeService.service';
import { Ingredient } from '../interfaces/Ingredient.interface';
import { Step } from '../interfaces/Step.interface';

const CreateRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => [...prevIngredients, { id: 0, recipe_id: 0, name: '', amount: 0}]);
  };

  const handleAddStep = () => {
    setSteps((prevSteps) => [...prevSteps, { id: 0, recipe_id: 0, description: '', timer_duration: { seconds: 0, minutes: 0, hours: 0 }, identifier: '',previous_step: '', previous_step_id: 0, temp_id: `temp_${prevSteps.length}` }]);
  };

  const handleIngredientChange = (index: number, property: keyof Ingredient, value: string) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [property]: value,
      };
      return updatedIngredients;
    });
  };

  const handleStepChange = (index: number, property: keyof Step, value: string | { seconds: number }) => {
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps];
      updatedSteps[index] = {
        ...updatedSteps[index],
        [property]: value,
      };
      return updatedSteps;
    });
  };

  const handleSubmit = async () => {
    try {
      const recipe: Recipe = {
        id: 0,
        created_at: new Date(),
        updated_at: new Date(),
        title,
        ingredients,
        steps,
      };

      const createdRecipe = await RecipeService.createRecipe(recipe);

      setTitle('');
      setIngredients([]);
      setSteps([]);

      navigate('/');

    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  const handleStepSelectChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTempId = event.target.value;
  
    setSteps((prevSteps) => {
      const updatedSteps = [...prevSteps];
      updatedSteps[index] = {
        ...updatedSteps[index],
        previous_step: selectedTempId,
      };
      return updatedSteps;
    });
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="Ingredient name"
              />
              <input
                type="text"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                placeholder="Amount"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
        <div>
          <label>Steps:</label>
          {steps.map((step, index) => (
            <div key={index}>
              <input
                type="text"
                value={step.description}
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                placeholder="Step description"
              />
            <input
            type="number"
            value={step.timer_duration.seconds}
            onChange={(e) => handleStepChange(index, 'timer_duration', { seconds: parseInt(e.target.value) })}
            placeholder="Timer duration (seconds)"
            />
            <select
            value={step.previous_step !== '' ? step.previous_step : ""}
            onChange={(e) => handleStepSelectChange(index, e)}
            >
            <option value="">No Blocking Step</option>
            {steps.map((s, idx) => (
                idx < index && (
                <option key={s.temp_id} value={s.temp_id}>
                    {s.description}
                </option>
                )
            ))}
            </select>
            </div>
          ))}
          <button type="button" onClick={handleAddStep}>
            Add Step
          </button>
        </div>
        <button type="button" onClick={handleSubmit}>
          Create Recipe
        </button>
      </form>
      <Link to="/">Back to View All Recipes</Link>
    </div>
  );
};

export default CreateRecipePage;
