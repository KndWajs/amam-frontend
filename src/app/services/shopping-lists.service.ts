import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { ShoppingElement } from '../models/shopping-element';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {
  constructor(private readonly httpClientService: HttpClientService) {
  }

  getShoppingListForAllMenus(): Observable<Array<Array<ShoppingElement>>> {
    return this.httpClientService.getHttpClient().get<Array<Array<ShoppingElement>>>(this.httpClientService.endpoint + 'shopping-lists/', this.httpClientService.httpOptions)
     .pipe(map(values => values.map(values => values.map(value => new ShoppingElement(value)))));
  }

}
