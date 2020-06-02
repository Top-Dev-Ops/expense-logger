import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    private loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    navigateToRegister(): void {
        this.router.navigateByUrl('auth/register');
    }

    navigateToForgotPassword(): void {
        this.router.navigateByUrl('auth/forgotpassword');
    }

    doLogin(): void {
        console.log(this.loginForm.value);
    }
}
