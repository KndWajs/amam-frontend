import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "src/app/core/services/authorization.service";
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailVerificationMessage: boolean = false;

  constructor(
    private readonly auth: AuthorizationService,
    private readonly _router: Router
  ) {}

  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    
    this.auth.signIn(email, password).subscribe((data) => {
      this._router.navigateByUrl('/add-meal');
    }, (err)=> {
      this.emailVerificationMessage = true;
    });   
  }

  
  logOut(): void {
    this.auth.logOut();
  }
}
