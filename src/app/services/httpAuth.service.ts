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
        this.redirectUrl = "/home";
    }
}