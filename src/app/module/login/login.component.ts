import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { NgForm } from '@angular/forms';
import { Globals } from '../../configs/globals';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    loginAttempt: boolean;

    constructor(
        private readonly auth: AuthorizationService,
        public globals: Globals,
        private readonly alertService: AlertService
    ) {
        this.loginAttempt = false;
    }

    onSubmit(form: NgForm) {
        this.loginAttempt = true;
        const email = form.value.email;
        const password = form.value.password;
        this.auth
            .signIn(email, password)
            .then(user => {
                this.loginAttempt = false;
            })
            .catch(error => {
                this.alertService.error(error.message, {
                    autoClose: true,
                });
                this.loginAttempt = false;
            });
    }

    logInToDemo(): void {
        this.globals.signedIn = true;
        this.globals.IS_GUEST = true;
    }
}
