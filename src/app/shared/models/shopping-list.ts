import { ShoppingElement } from './shopping-element';
import { AbstractModelBase } from './abstract-model-base';

export class ShoppingList  extends AbstractModelBase {
    name: string;
    numberOfPeople: number;
    shoppingElements: Array<ShoppingElement>;
    archival: boolean;

    constructor(obj: any) {
        super(obj);
        this.name = obj.name;
        this.numberOfPeople = obj.numberOfPeople;
        this.shoppingElements = (obj.shoppingElements as Array<
            ShoppingElement
        >).map(value => new ShoppingElement(value));
        this.archival = obj.archival;
    }
}
