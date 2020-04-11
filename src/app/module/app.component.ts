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

      if (authState.state === 'signedIn') {
        this.globals.signedIn = true;
        this.authState = authState;
        this.globals.IS_GUEST = this.checkIfGuestIsSignIn(this.authState.user);

      } else {
        this.globals.signedIn = false;
        this.globals.IS_GUEST = false;
      }
    });
  }

  checkIfGuestIsSignIn(user: any): boolean {
    const groups: any[] =
      user.signInUserSession.accessToken.payload['cognito:groups'];
    if (groups != null && groups.find(group => group === 'guest')) {
      return true;
    }
    return false;
  }
}
