import { MealType } from '../enums/meal-type';

export class MenuParameters {
    name: string;
    numberOfDays: number;
    numberOfPersons: number;
    mealTypes: Array<MealType>;

    constructor(obj: any) {
        this.name = obj.name;
        this.numberOfDays = obj.numberOfDays;
        this.numberOfPersons = obj.numberOfPersons;
        this.mealTypes = (obj.mealTypes as Array<MealType>).map(value => value as MealType);
    }   
}