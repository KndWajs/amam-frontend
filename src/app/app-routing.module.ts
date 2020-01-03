import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { InfoPageComponent } from './components/info-page/info-page.component';
import { MealsComponent } from './components/meals/meals.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';


const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'info', component: InfoPageComponent },
  { path: 'add-meal', component: AddMealComponent },
  { path: 'all-meals', component: MealsComponent },
  { path: 'create-menu', component: CreateMenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
