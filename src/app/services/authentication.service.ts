import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { LoginModel } from "../models/login.model";
import "rxjs/add/operator/toPromise";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class AuthenticationService {

    activityTimer : any;
    isLoggedIn = false;
    isAdmin = false;
    isPermitted = {};
    timer: any;

    redirectUrl: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private message: SetMessageService,
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

        this.timer = setInterval(() => {
            this.activityTimer ++;

            if (this.activityTimer == 600) {
                this.message.set({ status: 408, message: 'Logging out in 10 secs. Press cancel to continue.', forceLogout: true })
            }

        }, 1000)
    }

    public logout(): void {
        localStorage.removeItem('token');
        clearInterval(this.timer);
        this.activityTimer = 0;
        this.isAdmin = false;
        this.isLoggedIn = false;
        this.isPermitted = {};
        this.router.navigate(["/home"]);
    }
}