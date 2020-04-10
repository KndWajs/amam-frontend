import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from 'src/app/core/services/authorization.service';
import {NgForm} from '@angular/forms';
import { Globals } from '../../configs/globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private readonly auth: AuthorizationService,
    public globals: Globals
  ) {}


  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    this.auth.signIn(email, password);
  }

  logInToDemo(): void {
    this.globals.signedIn = true;
    this.globals.IS_GUEST = true;
  }
}
