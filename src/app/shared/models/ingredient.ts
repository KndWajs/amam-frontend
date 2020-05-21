import { IngredientUnit } from '../enums/ingredient-unit';
import { AbstractModelBase } from './abstract-model-base';

export class Ingredient extends AbstractModelBase {
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
