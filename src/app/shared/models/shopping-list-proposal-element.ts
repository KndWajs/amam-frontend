import { Ingredient } from './ingredient';
import { Menu } from './menu';

export class ShoppingListProposalElement {
    ingredient: Ingredient;
    amount: number;
    menu: Menu;

    constructor(obj: any) {
        this.ingredient = obj.ingredient;
        this.amount = obj.amount;
        this.menu = obj.menu;
    }    
}