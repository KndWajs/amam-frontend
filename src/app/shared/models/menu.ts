import { MealIngredient } from './meal-ingredient';
import { PreparingType } from '../enums/preparing-type';
import { MealType } from '../enums/meal-type';
import { map } from 'rxjs/operators';
import { MenuMeal } from './menu-meals';

export class Menu {
    id: number;
    numberOfPeople: number;
    name: string;
    meals: Array<MenuMeal>;
    archival: boolean;

    constructor(obj: any) {
        if(obj == null){
        } else {
            this.id = obj.id;
            this.numberOfPeople = obj.numberOfPeople;
            this.name = obj.name;
            this.meals = (obj.meals as Array<MenuMeal>).map(value => new MenuMeal(value));
            this.archival = obj.archival;
        }
    }    
}