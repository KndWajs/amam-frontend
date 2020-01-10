import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DxDataGridModule, DxButtonModule, DxTabPanelModule } from 'devextreme-angular';
import { InfoPageComponent } from './components/info-page/info-page.component';

import { Globals } from './globals';
import { HttpClientModule } from '@angular/common/http';
import { MealsComponent } from './components/meals/meals.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuickSearchComponent } from './components/ingredients/quick-search/quick-search.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { AddIngredientComponent } from './ingredients/add-ingredient/add-ingredient.component';
import { CreateMenuParametersComponent } from './components/create-menu/create-menu-parameters/create-menu-parameters.component';
import { MenuViewComponent } from './components/menu-view/menu-view.component';
import { ShoppingListsComponent } from './components/shopping-lists/shopping-lists.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    InfoPageComponent,
    MealsComponent,
    AddMealComponent,
    QuickSearchComponent,
    CreateMenuComponent,
    AddIngredientComponent,
    CreateMenuParametersComponent,
    MenuViewComponent,
    ShoppingListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    DxTabPanelModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
