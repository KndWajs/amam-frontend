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

    rowInserting(e) {
        //     delete e.data.id;
        //     delete e.data.Head_ID;
        //     delete e.data.localization;

        //     this.currentData = e.data;
        //     e.cancel = new Promise((resolve, reject) => {
        //       this.beaconRest.addBeacon(this.currentData).subscribe(
        //         (beacon) => {
        //           e.data = beacon;
        //           resolve();
        //         },
        //         error => {
        //           console.log(error);
        //           let errorDetails = '';
        //           if (typeof error.error === 'string' || error.error instanceof String) {
        //             errorDetails = ' --- ' + error.error;
        //           }
        //           reject(`${error.message} ${errorDetails}`);
        //         });
        //     });
    }
}
