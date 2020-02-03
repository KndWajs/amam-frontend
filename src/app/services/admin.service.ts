import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { IngredientCategory } from '../models/admin/ingredient-category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private readonly httpClientService: HttpClientService) {
  }

  addIngredientCategory(ingredientCategory: IngredientCategory): Observable<IngredientCategory> {
    if (this.httpClientService.isGuestLogIn) {
      return new Observable();
    }
    return this.httpClientService.getHttpClient().post<IngredientCategory>(this.httpClientService.endpoint + 'ingredients/categories/', ingredientCategory, this.httpClientService.httpOptions)
      .pipe(map(value => new IngredientCategory(value)));
  }

  getIngredientCategories(): Observable<Array<IngredientCategory>> {
    return this.httpClientService.getHttpClient().get<Array<IngredientCategory>>(this.httpClientService.endpoint + 'ingredients/categories/', this.httpClientService.httpOptions)
      .pipe(map(values => values.map(value => new IngredientCategory(value))));
  }
}
