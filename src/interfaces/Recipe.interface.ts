import { Ingredient } from './Ingredient.interface';
import { Step } from './Step.interface';

export interface Recipe {
    id: number;
    title: string;
    ingredients: Ingredient[];
    steps: Step[];
    created_at: Date;
    updated_at: Date;
  }
  