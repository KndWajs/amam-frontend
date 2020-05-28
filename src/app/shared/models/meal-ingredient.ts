import { Ingredient } from './ingredient';

export class MealIngredient {
  id: number;
  ingredient: Ingredient;
  amount: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.ingredient = new Ingredient(obj.ingredient);
    this.amount = obj.amount;
  }
}
