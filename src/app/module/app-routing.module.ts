import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './sub-pages/welcome-page/welcome-page.component';
import { InfoPageComponent } from './sub-pages/info-page/info-page.component';
import { MealsComponent } from './sub-pages/meals/meals.component';
import { AddMealComponent } from './sub-pages/add-meal/add-meal.component';
import { CreateMenuComponent } from './sub-pages/create-menu/create-menu.component';
import { MenusComponent } from './sub-pages/menus/menus.component';
import { ShoppingListsComponent } from './sub-pages/shopping-lists/shopping-lists.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'add-meal', component: AddMealComponent },
  { path: 'add-meal/:id', component: AddMealComponent },
  { path: 'all-meals', component: MealsComponent },
  { path: 'create-menu', component: CreateMenuComponent },
  { path: 'menus', component: MenusComponent },
  { path: 'shopping-lists', component: ShoppingListsComponent },
  { path: 'info-page', component: InfoPageComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  { path: '', component: WelcomePageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
