import { IngredientUnit } from '../enums/ingredient-unit';
import { AbstractBase } from './abstract-base';

export class Ingredient extends AbstractBase {
  name: string;
  ingredientUnit: IngredientUnit;
  category: string;

  constructor(obj: any) {
    super(obj);
    this.name = obj.name;
    this.ingredientUnit = IngredientUnit[obj.ingredientUnit] as IngredientUnit;
    this.category = obj.category;

    if (obj instanceof Ingredient) {
      this.ingredientUnit = obj.ingredientUnit;
    }
  }
}
