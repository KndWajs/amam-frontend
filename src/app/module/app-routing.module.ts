import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './sub-pages/welcome-page/welcome-page.component';
import { InfoPageComponent } from './sub-pages/info-page/info-page.component';
import { MealsComponent } from './sub-pages/meals/meals.component';
import { AddMealComponent } from './sub-pages/add-meal/add-meal.component';
import { CreateMenuComponent } from './sub-pages/create-menu/create-menu.component';
import { MenuViewComponent } from './sub-pages/menu-view/menu-view.component';
import { ShoppingListsComponent } from './sub-pages/shopping-lists/shopping-lists.component';
import { PipeDataComponent } from './sub-pages/info-page/admin/pipe-data/pipe-data.component';
import { AdminComponent } from './sub-pages/info-page/admin/admin.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'info', component: InfoPageComponent },
  { path: 'add-meal', component: AddMealComponent },
  { path: 'add-meal/:id', component: AddMealComponent },
  { path: 'all-meals', component: MealsComponent },
  { path: 'create-menu', component: CreateMenuComponent },
  { path: 'show-menu', component: MenuViewComponent },
  { path: 'shopping-lists', component: ShoppingListsComponent },
  {
    path: 'admin',
    children: [
      {
        path: 'assign-ingredient-categories',
        component: PipeDataComponent
      },
      {
        path: '',
        component: AdminComponent
      }
    ]
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
