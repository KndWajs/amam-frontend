import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Globals } from '../configs/globals';
import { Service } from '../core/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service]
})
export class AppComponent {
  signedIn: boolean;
  user: any;
  greeting: string;
  usernameAttributes: 'My user name';
  authState: AuthState;

  constructor(service: Service, private amplifyService: AmplifyService, public globals: Globals) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.globals.signedIn = authState.state === 'signedIn';
        this.authState = authState;
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
          this.greeting = 'Hello ' + this.user.username;
        }
      });
  }

  logInToDemo(): void {
    this.globals.signedIn = true;
    this.globals.IS_GUEST = true;
  }
}
