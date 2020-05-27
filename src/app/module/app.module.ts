import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxButtonModule, DxTabPanelModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Globals } from '../configs/globals';

import { NavbarComponent } from './navbar/navbar.component';
import { WelcomePageComponent } from './sub-pages/welcome-page/welcome-page.component';
import { InfoPageComponent } from './sub-pages/info-page/info-page.component';
import { MealsComponent } from './sub-pages/meals/meals.component';
import { AddMealComponent } from './sub-pages/add-meal/add-meal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QuickSearchComponent } from './sub-pages/add-meal/quick-search/quick-search.component';
import { CreateMenuComponent } from './sub-pages/create-menu/create-menu.component';
import { CreateMenuParametersComponent } from './sub-pages/create-menu/create-menu-parameters/create-menu-parameters.component';
import { MenusComponent } from './sub-pages/menus/menus.component';
import { ShoppingListsComponent } from './sub-pages/shopping-lists/shopping-lists.component';
import { AdminComponent } from './sub-pages/info-page/admin/admin.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { PipeDataComponent } from './sub-pages/info-page/admin/pipe-data/pipe-data.component';
import { QuickSearchMealComponent } from './sub-pages/meals/quick-search-meal/quick-search-meal.component';
import { QuickSearchShoppingElementComponent } from './sub-pages/shopping-lists/quick-search-shopping-element/quick-search-shopping-element.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AmplifyService, AmplifyModules } from 'aws-amplify-angular/dist/src/providers';
import Auth from '@aws-amplify/auth';
import Interactions from '@aws-amplify/interactions';
import Storage from '@aws-amplify/storage';

import { SpinnerComponent } from './common/spinner/spinner.component';
import { MenuListComponent } from './common/menu-list/menu-list.component';
import { AlertComponent } from './common/alert/alert.component';


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
    MenusComponent,
    ShoppingListsComponent,
    PipeDataComponent,
    AdminComponent,
    PageNotFoundComponent,
    QuickSearchMealComponent,
    SpinnerComponent,
    QuickSearchShoppingElementComponent,
    MenuListComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent
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
