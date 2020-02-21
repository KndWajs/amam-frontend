import { MealIngredient } from './meal-ingredient';

import { Ingredient } from './ingredient';

export class ShoppingElement {
    id: number;
    ingredient: Ingredient;
    amount: number;
    alreadyBought: boolean;

    constructor(obj: any) {
        this.id = obj.id;
        this.ingredient = obj.ingredient;
        this.amount = obj.amount;
        this.alreadyBought = obj.alreadyBought;
    }    
}