import { Injectable } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { Menu } from '../../shared/models/menu';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuParameters } from '../../shared/models/menu-parameters';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private readonly httpClientService: HttpClientService) {
  }

  addMenu(menu: Menu): Observable<Menu> {
    return this.httpClientService.getHttpClient()
    .post<Menu>(this.httpClientService.endpoint + 'menu/', menu, this.httpClientService.httpOptions)
     .pipe(map(value => new Menu(value)));
  }

  updateMenu(menu: Menu): Observable<Menu> {
    return this.httpClientService.getHttpClient()
    .put<Menu>(this.httpClientService.endpoint + 'menu/', menu, this.httpClientService.httpOptions)
     .pipe(map(value => new Menu(value)));
  }

  getMenusFromHttp(archival: boolean): Observable<Array<Menu>> {
    return this.httpClientService.getHttpClient()
    .get<Array<Menu>>(this.httpClientService.endpoint + `menus?archival=${archival}`, this.httpClientService.httpOptions)
     .pipe(map(values => values.map(value => new Menu(value))));
  }

  deleteMenu(id: number): Observable<Menu> {
    return this.httpClientService.getHttpClient()
    .delete<Menu>(`${this.httpClientService.endpoint}menu/${id}`, this.httpClientService.httpOptions)
     .pipe(map(value => new Menu(value)));
  }

  createMenu(menuParameters: MenuParameters): Observable<Menu> {
    return this.httpClientService.getHttpClient()
    .post<Menu>(this.httpClientService.endpoint + 'menu/parameters', menuParameters, this.httpClientService.httpOptions)
     .pipe(map(value => new Menu(value)));
  }
}
