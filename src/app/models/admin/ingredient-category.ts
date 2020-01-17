import { map } from 'rxjs/operators';

export class IngredientCategory {
    id: number;
    category: string;

    constructor(obj: any) {
        this.id = obj.id;
        this.category = obj.category;
    }    
}