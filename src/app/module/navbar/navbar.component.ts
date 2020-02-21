import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Globals } from 'src/app/configs/globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signedIn: boolean;
  user: any;
  greeting: string;
  usernameAttributes: 'My user name';
  authState: AuthState;

  constructor(private amplifyService: AmplifyService, public globals: Globals) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn';
        this.authState = authState;
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
          this.greeting = "Hello " + this.user.username;
          globals.IS_GUEST = this.checkIfGuestIsSignIn(this.authState.user);
        }        
      });
  }

  ngOnInit() {
   
  }

  checkIfGuestIsSignIn(user: any): boolean {
    const groups: any[] = user.signInUserSession.accessToken.payload['cognito:groups'];
    if(groups != null && groups.find(group => group === "guest")){
      return true;
    }
    return false;
  }

  signOut(): void {
    this.globals.signedIn = false;
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
}
