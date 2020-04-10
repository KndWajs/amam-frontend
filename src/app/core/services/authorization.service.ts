import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';
import { AmplifyService } from 'aws-amplify-angular';

import { Auth } from 'aws-amplify';

const poolData = {
  UserPoolId: 'eu-central-1_ZnNlhQRCx', // Your user pool id here
  ClientId: '1kn1voj12qrg51aktf87s049r2' // Your client id here  
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  cognitoUser: any;

  constructor(private amplifyService: AmplifyService) { }

  register(email, password) {

    const attributeList = [];

    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log("signUp success", result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  confirmAuthCode(code) {
    const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password) { 

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    
    this.cognitoUser = cognitoUser;


  Auth.signIn(email, password)
  .then(user => { 
    console.log(user);
  })
  .catch(err => console.log(err));
  }

  isLoggedIn() {    
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    console.log(this.cognitoUser);

    this.cognitoUser.globalSignOut(
      {
        onFailure: e =>   console.log(e), 
        onSuccess: r =>   
console.log('Logout success: ' + r)  
    }

    );
    this.cognitoUser = null;
  }
}
