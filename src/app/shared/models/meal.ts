import { MealIngredient } from './meal-ingredient';
import { PreparingType } from '../enums/preparing-type';
import { MealType } from '../enums/meal-type';
import { AbstractModelBase } from './abstract-model-base';

export class Meal extends AbstractModelBase {
  name: string;
  typeOfMeal: MealType;
  typeOfPreparing: PreparingType;
  recipe: string;
  minutesToPrepare: number;
  ingredients: Array<MealIngredient>;

  constructor(obj: any) {
    super(obj);
    this.name = obj.name;
    this.typeOfMeal = MealType[obj.typeOfMeal] as MealType;
    this.typeOfPreparing = PreparingType[obj.typeOfPreparing] as PreparingType;
    this.recipe = obj.recipe;
    this.minutesToPrepare = obj.minutesToPrepare;
    this.ingredients = (obj.ingredients as Array<MealIngredient>).map(
      value => new MealIngredient(value)
    );

    if (obj instanceof Meal) {
      this.typeOfMeal = obj.typeOfMeal;
      this.typeOfPreparing = obj.typeOfPreparing;
    }
  }
}
