import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginModel } from "../models/login.model";
import "rxjs/add/operator/toPromise";

@Injectable()

export class AuthenticationService {

    isLoggedIn = false;
    isAdmin = false;
    isPermitted = {};

    redirectUrl: string;

    constructor(private http: HttpClient, private router: Router ) {}

    login(form: LoginModel) {

        this.redirectUrl = "/private/user-domain"

        return this.http.post<any>('/login', form)
            .map(activeUser => {

                if(activeUser && activeUser.token){
                    localStorage.setItem('token', activeUser.token);
                    this.isLoggedIn = true;
                    this.isAdmin = activeUser.userParameters.administrator ? true : false;
                }

                return activeUser;
            })

    }


    public logout(): void {
        localStorage.removeItem('token');
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.isPermitted = {};
        this.redirectUrl = "/home";
        this.router.navigate([this.redirectUrl]);
    }
}