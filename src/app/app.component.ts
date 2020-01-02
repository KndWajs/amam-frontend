import { NgModule, Component, enableProdMode } from '@angular/core';
import { Service } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent  {

  constructor(service: Service) {

  }

  
  }
