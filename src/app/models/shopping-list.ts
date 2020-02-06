import { Ingredient } from './ingredient';
import { Menu } from './menu';
import { ShoppingElement } from './shopping-element';

export class ShoppingList {
    id: number;
    name: String;
    numberOfPeople: number;
    menu: Menu;
    shoppingElements: Array<ShoppingElement>;

    constructor(obj: any) {
        this.id = obj.id;
        this.name = obj.name;
        this.numberOfPeople = obj.numberOfPeople;
        this.menu = new Menu(obj.menu);
        this.shoppingElements = (obj.shoppingElements as Array<ShoppingElement>).map(value => new ShoppingElement(value));
    }
}