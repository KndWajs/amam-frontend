import { IngredientUnit } from '../enums/ingredient-unit';

export class Ingredient {
  id: number;
  name: string;
  ingredientUnit: IngredientUnit;
  category: string;

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.ingredientUnit = IngredientUnit[obj.ingredientUnit] as IngredientUnit;
    this.category = obj.category;

    if (obj instanceof Ingredient) {
      this.ingredientUnit = obj.ingredientUnit;
    }
  }
}
