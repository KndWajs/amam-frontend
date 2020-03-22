import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { Observable } from 'rxjs';
import { ShoppingListProposalElement } from '../../shared/models/shopping-list-proposal-element';
import { map } from 'rxjs/operators';
import { ShoppingList } from '../../shared/models/shopping-list';
import { Menu } from 'src/app/shared/models/menu';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListsService {
  constructor(private readonly httpClientService: HttpClientService) {
  }

  addShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    if (this.httpClientService.isGuestLogIn) {
      return new Observable();
    }
    return this.httpClientService.getHttpClient()
    .post<ShoppingList>(this.httpClientService.endpoint + 'shopping-list/', shoppingList, this.httpClientService.httpOptions)
     .pipe(map(value => new ShoppingList(value)));
  }

  createShoppingList(menu: Menu): Observable<ShoppingList> {
    if (this.httpClientService.isGuestLogIn) {
      return new Observable();
    }
    return this.httpClientService.getHttpClient()
    .post<ShoppingList>(this.httpClientService.endpoint + 'shopping-list/create-from-menu', menu, this.httpClientService.httpOptions)
     .pipe(map(value => new ShoppingList(value)));
  }

  updateShoppingList(shoppingList: ShoppingList): Observable<ShoppingList> {
    if (this.httpClientService.isGuestLogIn) {
      return new Observable();
    }
    return this.httpClientService.getHttpClient()
    .put<ShoppingList>(this.httpClientService.endpoint + 'shopping-list/', shoppingList, this.httpClientService.httpOptions)
     .pipe(map(value => new ShoppingList(value)));
  }

  deleteShoppingList(id: number): Observable<ShoppingList> {
    if (this.httpClientService.isGuestLogIn) {
      return new Observable();
    }
    return this.httpClientService.getHttpClient()
    .delete<ShoppingList>(`${this.httpClientService.endpoint}shopping-list/${id}`, this.httpClientService.httpOptions)
     .pipe(map(value => new ShoppingList(value)));
  }

  getShoppingListsFromHttp(archival: boolean): Observable<Array<ShoppingList>> {
    return this.httpClientService.getHttpClient()
    .get<Array<ShoppingList>>(this.httpClientService.endpoint + `shopping-list?archival=${archival}`, this.httpClientService.httpOptions)
     .pipe(map(values => values.map(value => new ShoppingList(value))));
  }
}
