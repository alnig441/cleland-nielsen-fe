import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { LoginModel } from "../models/login.model";

@Injectable()

export class AuthService {

    isLoggedIn = false;
    isAdmin = false;

    redirectUrl: string;

    login(form: LoginModel): Observable<boolean> {

        this.redirectUrl = '/private';
        return of(true).delay(1000).do(val => {
            this.isLoggedIn = true;

            /* add jwt token AND accounttype to local storage */
            // localStorage.setItem('token', 'bogus_jwt');
            // localStorage.setItem('accounttype', 'admin');

            if(form.username === 'admin' || localStorage.getItem('accounttype') == 'administrator') {
                // ADD DB CALL HERE TO DETERMINE ACCT_TYPE
                this.isAdmin = true;

            }
        });
    }

    logout(): void {
        localStorage.clear();
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.redirectUrl = '/home';
    }

}