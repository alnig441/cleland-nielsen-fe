import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginModel } from "../models/login.model";
import "rxjs/add/operator/toPromise";
import {SetMessageService} from "./set-message.service";

@Injectable()

export class AuthenticationService {

    activityTimer : any;
    isLoggedIn = false;
    isAdmin = false;
    isPermitted = {};

    redirectUrl: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private message: SetMessageService
    ) {}

    login(form: LoginModel) {

        this.redirectUrl = "/private/user-domain"

        return this.http.post<any>('/login', form)
            .map(activeUser => {

                if(activeUser && activeUser.token){
                    localStorage.setItem('token', activeUser.token);
                    this.isLoggedIn = true;
                    this.isAdmin = activeUser.userParameters.administrator ? true : false;
                }
                this.setActivityTimer();
                return activeUser;
            })

    }

    setActivityTimer(): void {
        this.activityTimer = 0;

        var timer = setInterval(() => {
            this.activityTimer ++;

            if (this.activityTimer == 10) {
                this.message.set({ status: 300, message: 'logging out in 10 secs', forceLogout: true })
            }

            if (this.activityTimer == 600) {
                this.logout();
                this.activityTimer = 0;
                clearInterval(timer);
            }

        }, 1000)
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