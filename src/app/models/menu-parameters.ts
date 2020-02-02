import { MealType } from '../enums/meal-type';

export class MenuParameters {
    name: string;
    numberOfDays: number;
    numberOfPersons: number;
    isDinnerForTwoDays: boolean;
    mealTypes: Array<MealType>;

    constructor(obj: any) {
        this.name = obj.name;
        this.numberOfDays = obj.numberOfDays;
        this.numberOfPersons = obj.numberOfPersons;
        this.isDinnerForTwoDays = obj.isDinnerForTwoDays;
        this.mealTypes = (obj.mealTypes as Array<MealType>).map(value => value as MealType);
    }   
}