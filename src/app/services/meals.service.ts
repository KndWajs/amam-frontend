import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal';
import { map } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient';


@Injectable({
  providedIn: 'root'
})
export class MealsService {


  constructor(private readonly httpClientService: HttpClientService) {
  }

  getMealsFromHttp(): Observable<Array<Meal>> {
    return this.httpClientService.getSimpleHttpClient().get<Array<Meal>>(this.httpClientService.endpoint + 'meals/')
     .pipe(map(values => values.map(value => new Meal(value))));
  }
}

