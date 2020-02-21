import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './sub-pages/welcome-page/welcome-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DxDataGridModule, DxButtonModule, DxTabPanelModule } from 'devextreme-angular';
import { InfoPageComponent } from './sub-pages/info-page/info-page.component';

import { Globals } from '../configs/globals';
import { HttpClientModule } from '@angular/common/http';
import { MealsComponent } from './sub-pages/meals/meals.component';
import { AddMealComponent } from './sub-pages/add-meal/add-meal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuickSearchComponent } from './sub-pages/add-meal/ingredients/quick-search/quick-search.component';
import { CreateMenuComponent } from './sub-pages/create-menu/create-menu.component';
import { CreateMenuParametersComponent } from './sub-pages/create-menu/create-menu-parameters/create-menu-parameters.component';
import { MenuViewComponent } from './sub-pages/menu-view/menu-view.component';
import { ShoppingListsComponent } from './sub-pages/shopping-lists/shopping-lists.component';
import { AdminComponent } from './sub-pages/info-page/admin/admin.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { PipeDataComponent } from './sub-pages/info-page/admin/pipe-data/pipe-data.component';


import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
import Auth from '@aws-amplify/auth';
import Interactions from '@aws-amplify/interactions';
import Storage from '@aws-amplify/storage';
import { QuickSearchMealComponent } from './sub-pages/meals/quick-search-meal/quick-search-meal.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { QuickSearchShoppingElementComponent } from './sub-pages/shopping-lists/quick-search-shopping-element/quick-search-shopping-element.component';


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
    CreateMenuParametersComponent,
    MenuViewComponent,
    ShoppingListsComponent,
    PipeDataComponent,
    AdminComponent,
    PageNotFoundComponent,
    QuickSearchMealComponent,
    SpinnerComponent,
    QuickSearchShoppingElementComponent
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
    FormsModule,
    AmplifyAngularModule
    
  ],
  providers: [Globals,
    {
      provide: AmplifyService,
      useFactory:  () => {
        return AmplifyModules({
          Auth,
          Storage,
          Interactions
        });
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
