import { NgModule, Component, enableProdMode } from '@angular/core';
import { Service } from '../core/services/app.service';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Auth } from 'aws-amplify';
import { Globals } from '../configs/globals';

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
          this.greeting = "Hello " + this.user.username;
        }
      });
  }

  onLoginClick() {
    Auth.federatedSignIn();
  }


  logInToDemo(): void {
    this.globals.signedIn = true;
    this.globals.IS_GUEST = true;
  }


  signUpConfig = {
    header: 'My Customized Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'My user name',
        key: 'username',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password'
      }
    ]
  }


}
