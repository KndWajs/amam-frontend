import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { Observable, of } from 'rxjs';
import { Ingredient } from '../../shared/models/ingredient';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private readonly httpClientService: HttpClientService) {
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClientService.getHttpClient().post<Ingredient>
    (this.httpClientService.endpoint + 'ingredient/', ingredient, this.httpClientService.httpOptions)
     .pipe(map(value => new Ingredient(value)));
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClientService.getHttpClient().put<Ingredient>
    (this.httpClientService.endpoint + 'ingredient/' + ingredient.id, ingredient, this.httpClientService.httpOptions)
     .pipe(map(value => new Ingredient(value)));
  }

  getIngredientsFromHttp(): Observable<Array<Ingredient>> {
    return this.httpClientService.getHttpClient().get<Array<Ingredient>>
    (this.httpClientService.endpoint + 'ingredients/', this.httpClientService.httpOptions)
     .pipe(map(values => values.map(value => new Ingredient(value))));
  }

  getIngredientsByPartialName(name: string, numberOfResults: number): Observable<Array<Ingredient>> {
    if (!name.trim()) {
      return of([]);
    }

    return this.httpClientService.getHttpClient().get<Array<Ingredient>>
    (this.httpClientService.endpoint + 'ingredients/' + name + '/' + numberOfResults, this.httpClientService.httpOptions)
    .pipe(map(values => values.map(value => new Ingredient(value))));
  }
}
