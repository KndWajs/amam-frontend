import { MealIngredient } from './meal-ingredient';
import { PreparingType } from '../enums/preparing-type';
import { MealType } from '../enums/meal-type';
import { map } from 'rxjs/operators';

export class Meal {
    id: number;
    name: string;
    typeOfMeal: MealType;
    typeOfPreparing: PreparingType;
    recipe: string;
    minutesToPrepare: number;
    ingredients: Array<MealIngredient>;

    constructor(obj: any) {
        this.id = obj.id;
        this.name = obj.name;
        this.typeOfMeal = MealType[obj.typeOfMeal] as MealType;
        this.typeOfPreparing = PreparingType[obj.typeOfPreparing] as PreparingType;
        this.recipe = obj.recipe;
        this.minutesToPrepare = obj.minutesToPrepare;
        this.ingredients = (obj.ingredients as Array<MealIngredient>).map(value => new MealIngredient(value));

        if (obj instanceof Meal) {
            this.typeOfMeal = obj.typeOfMeal;
            this.typeOfPreparing = obj.typeOfPreparing;
        }
    }    
}