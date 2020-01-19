import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
    signedIn: boolean;
    user: any;
    greeting: string;

    constructor( private amplifyService: AmplifyService ) {
        this.amplifyService.authStateChange$
            .subscribe(authState => {
                this.signedIn = authState.state === 'signedIn';
                if (!authState.user) {
                    this.user = null;
                } else {
                    this.user = authState.user;
                    console.log(authState.user);
                    this.greeting = "Hello " + this.user.username;
                }
        });
    }

    usernameAttributes: 'My user name';
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
