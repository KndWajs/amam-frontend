import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { MealsComponent } from './components/meals/meals.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { MenuViewComponent } from './components/menu-view/menu-view.component';
import { ShoppingListsComponent } from './components/shopping-lists/shopping-lists.component';
import { PipeDataComponent } from './components/admin/pipe-data/pipe-data.component';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'info', component: InfoPageComponent },
  { path: 'add-meal', component: AddMealComponent },
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
