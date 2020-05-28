import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { Observable, of } from 'rxjs';
import { Meal } from '../../shared/models/meal';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MealsService {


  constructor(private readonly httpClientService: HttpClientService) {
  }

  addMeal(meal: Meal): Observable<Meal> {
    return this.httpClientService.getHttpClient().post<Meal>
    (this.httpClientService.endpoint + 'meal/', meal, this.httpClientService.httpOptions)
     .pipe(map(value => new Meal(value)));
  }

  updateMeal(meal: Meal): Observable<Meal> {
    return this.httpClientService.getHttpClient()
    .put<Meal>(this.httpClientService.endpoint + 'meal/', meal, this.httpClientService.httpOptions)
     .pipe(map(value => new Meal(value)));
  }

  getMealsFromHttp(): Observable<Array<Meal>> {
    return this.httpClientService.getHttpClient().get<Array<Meal>>
    (this.httpClientService.endpoint + 'meals/', this.httpClientService.httpOptions)
     .pipe(map(values => values.map(value => new Meal(value))));
  }

  getMealFromHttp(id: number): Observable<Meal> {
    return this.httpClientService.getHttpClient().get<Meal>
    (this.httpClientService.endpoint + `meal?id=${id}`, this.httpClientService.httpOptions)
     .pipe(map(value => new Meal(value)));
  }

  deleteMeal(id: number): Observable<Meal> {
    return this.httpClientService.getHttpClient().delete<Meal>
    (`${this.httpClientService.endpoint}meal/${id}`, this.httpClientService.httpOptions)
     .pipe(map(value => new Meal(value)));
  }

  getMealsByPartialName(name: string, numberOfResults: number): Observable<Array<Meal>> {
    if (!name.trim()) {
      return of([]);
    }

    return this.httpClientService.getHttpClient().get<Array<Meal>>
    (this.httpClientService.endpoint + 'meals/' + name + '/' + numberOfResults, this.httpClientService.httpOptions)
    .pipe(map(values => values.map(value => new Meal(value))));
  }
}

