import { MenuMeal } from './menu-meals';
import { AbstractModelBase } from './abstract-model-base';

export class Menu extends AbstractModelBase {
  numberOfPeople: number;
  name: string;
  meals: Array<MenuMeal>;
  archival: boolean;

  constructor(obj: any) {
    if (obj != null) {
      super(obj);
      this.numberOfPeople = obj.numberOfPeople;
      this.name = obj.name;
      this.meals = (obj.meals as Array<MenuMeal>).map(
        value => new MenuMeal(value)
      );
      this.archival = obj.archival;
    }
  }
}
