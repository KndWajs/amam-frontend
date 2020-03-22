import { Meal } from './meal';

export class MenuMeal {
  id: number;
  meal: Meal;
  dayNumber: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.meal = new Meal(obj.meal);
    this.dayNumber = obj.dayNumber;
  }
}
