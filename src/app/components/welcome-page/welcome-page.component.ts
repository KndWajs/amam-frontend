import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';
import { Service, Employee, State } from '../../app.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
  providers: [Service]
})
export class WelcomePageComponent {
    dataSource: Employee[];
    states: State[];
    events: Array<string> = [];

    constructor(service: Service) {
        this.dataSource = service.getEmployees();
        this.states = service.getStates();
    }
    
    logEvent(eventName) {
        this.events.unshift(eventName);
    }
  
    clearEvents() {
        this.events = [];
    }
}
