import { Ingredient } from './ingredient';
import { AbstractModelBase } from './abstract-model-base';

export class ShoppingElement extends AbstractModelBase {
  ingredient: Ingredient;
  amount: number;
  alreadyBought: boolean;

  constructor(obj: any) {
    super(obj);
    this.ingredient = obj.ingredient;
    this.amount = obj.amount;
    this.alreadyBought = obj.alreadyBought;
  }
}
