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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    NavbarComponent,
    InfoPageComponent,
    MealsComponent,
    AddMealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    DxTabPanelModule,
    ReactiveFormsModule
    
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
