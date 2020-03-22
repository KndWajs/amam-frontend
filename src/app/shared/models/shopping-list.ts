import { ShoppingElement } from './shopping-element';

export class ShoppingList {
    id: number;
    name: string;
    numberOfPeople: number;
    shoppingElements: Array<ShoppingElement>;
    archival: boolean;

    constructor(obj: any) {
        this.id = obj.id;
        this.name = obj.name;
        this.numberOfPeople = obj.numberOfPeople;
        this.shoppingElements = (obj.shoppingElements as Array<
            ShoppingElement
        >).map(value => new ShoppingElement(value));
        this.archival = obj.archival;
    }
}
