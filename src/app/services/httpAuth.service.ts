import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginModel } from "../models/login.model";

@Injectable()

export class HttpAuthService {

    isLoggedIn = false;
    isAdmin = false;

    redirectUrl: string;

    constructor(private http: HttpClient) {}

    login(form: LoginModel) {

        this.redirectUrl = "/private";

        return this.http.post<any>('/login', form)
            .map(user => {
                if(user && user.token){
                    localStorage.setItem('accounttype', user.accounttype);
                    localStorage.setItem('token', user.token);
                    this.isLoggedIn = true;
                }
                return user;
            })
    }

    logout(): void {
        localStorage.removeItem('user');
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.redirectUrl = "/home";
    }
}