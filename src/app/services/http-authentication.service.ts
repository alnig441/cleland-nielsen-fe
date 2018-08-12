import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import "rxjs/add/operator/toPromise";

@Injectable()

export class HttpAuthService {

    isLoggedIn = false;
    isAdmin = false;
    isPermitted = {};

    redirectUrl: string;

    constructor(private http: HttpClient) {}

    login(form: LoginModel) {

        this.redirectUrl = "/private"

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
    }
}