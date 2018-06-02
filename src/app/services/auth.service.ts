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
            if(form.userId === 'admin') {
                this.isAdmin = true
            }
        });
    }

    logout(): void {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.redirectUrl = '/home';
    }

}