import { MealIngredient } from './meal-ingredient';
import { PreparingType } from '../enums/preparing-type';
import { MealType } from '../enums/meal-type';
import { map } from 'rxjs/operators';
import { MenuMeal } from './menu-meals';
import { Ingredient } from './ingredient';
import { Menu } from './menu';

export class ShoppingElement {
    ingredient: Ingredient;
    amount: number;
    menu: Menu;

    constructor(obj: any) {
        this.ingredient = obj.ingredient;
        this.amount = obj.amount;
        this.menu = obj.menu;
    }    
}